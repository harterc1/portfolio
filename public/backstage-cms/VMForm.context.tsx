import deepmerge from 'deepmerge'
import { getIn } from 'final-form'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useFormState } from 'react-final-form'

import { noop } from 'utils/misc'

import type { VMFormContextValue, VMFormOnSave, VMFormValidate } from './VMForm.types'
import type { ValidationErrors } from 'final-form'

const defaultContextValue = {
  save: async () => noop(),
  submit: async () => noop(),
  saving: false,
  dirtySinceLastSave: false,
  validationErrors: {},
}

const VMFormContext = createContext<VMFormContextValue>(defaultContextValue)

const mergeFormValues = <FormValues,>(values: FormValues, newValues: Partial<FormValues>) =>
  deepmerge(values, newValues, {
    isMergeableObject: isPlainObject,
  })

export const VMFormContextProvider = <FormValues, InitialFormValues = Partial<FormValues>>({
  children,
  isDisabled,
  onSave,
  validate,
}: {
  children: React.ReactNode
  isDisabled?: boolean
  onSave: VMFormOnSave<FormValues, InitialFormValues>
  validate?: VMFormValidate<FormValues>
}) => {
  const form = useForm<FormValues, InitialFormValues>()
  const { values, pristine, errors, submitFailed } = useFormState<FormValues, InitialFormValues>()
  const [saving, setSaving] = useState<boolean>(defaultContextValue.saving)
  const [valuesDuringLastSave, setValuesDuringLastSave] = useState<FormValues>(values)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>()
  const [newFormValues, setNewFormValues] = useState<InitialFormValues | undefined>(undefined)

  // Make sure to reset if the containing `Form` is reset
  useEffect(() => {
    if (pristine) {
      setValuesDuringLastSave(values)
    }
  }, [pristine, values])

  const checkForValidationErrors = useCallback(
    async (valuesToCheck: FormValues) => {
      setValidationErrors(validate ? await validate(valuesToCheck) : undefined)
    },
    [validate]
  )

  // Maintain the errors as they were during the last `submit`.
  // This is to retain the errors if the form is reset as a result of call to `save`.
  useEffect(() => {
    if (!saving && submitFailed && errors) {
      checkForValidationErrors(values)
    }
  }, [checkForValidationErrors, saving, errors, submitFailed, values])

  const dirtySinceLastSave = useMemo(() => {
    return !isEqual(values, valuesDuringLastSave)
  }, [values, valuesDuringLastSave])

  /**
   * If `newFormValues` is set, reset the form with these values.
   * If there are any form fields that were dirtied while the last save
   * was running, those fields will retain their values and remain
   * dirty (and so will the form).
   */
  useEffect(() => {
    if (newFormValues) {
      if (dirtySinceLastSave) {
        const keysChangedDuringSave = form
          .getRegisteredFields()
          .filter((key) => !isEqual(getIn(values as object, key), getIn(valuesDuringLastSave as object, key)))

        // User dirtied the form while save was running so we need
        // to re-initialize it and then re-dirty it
        form.batch(() => {
          form.reset(newFormValues)
          keysChangedDuringSave.forEach((key) => {
            form.change(key as keyof FormValues, getIn(values as object, key))
          })
        })
      } else {
        form.reset(newFormValues)
      }
      setNewFormValues(undefined)
      setSaving(false)
    }
  }, [newFormValues, form, dirtySinceLastSave, values, valuesDuringLastSave])

  const save = async (newValues: Partial<FormValues> = {}) => {
    const mergedValues = mergeFormValues(values, newValues)

    const invalid = validate ? await validate(mergedValues) : false
    if (invalid) {
      return
    }

    setValuesDuringLastSave(values)
    setSaving(true)

    const newInitialValues = await onSave({
      form,
      mergedValues,
      newValues,
    })

    if (newInitialValues) {
      setNewFormValues(newInitialValues)
    } else {
      setSaving(false)
    }
  }

  const submit = async (newValues: Partial<FormValues> = {}) => {
    setValidationErrors(undefined)

    await save(newValues)

    // Insert `newValues` into form so that submit validation sees them.
    form.batch(() => {
      Object.keys(newValues).forEach((key) => {
        form.change(key as keyof FormValues, getIn(newValues as object, key))
      })
    })

    form.submit()
  }

  return (
    <VMFormContext.Provider value={{ save, submit, saving, dirtySinceLastSave, isDisabled, validationErrors }}>
      {children}
    </VMFormContext.Provider>
  )
}

export default VMFormContext