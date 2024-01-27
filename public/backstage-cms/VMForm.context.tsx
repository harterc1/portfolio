import deepmerge from 'deepmerge'
import { getIn } from 'final-form'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useFormState } from 'react-final-form'

import { noop } from 'utils/misc'

import type { VMFormContextValue, VMFormOnSave, VMFormValidate } from './VMForm.types'

const defaultContextValue = {
  save: async () => noop(),
  submit: async () => noop(),
  saving: false,
  dirtySinceLastSave: false,
}

const VMFormContext = createContext<VMFormContextValue>(defaultContextValue)

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
  const [newFormValues, setNewFormValues] = useState<InitialFormValues | undefined>(undefined)

  const newValuesDuringLastSave = useRef<Partial<FormValues>>({})

  // Make sure to reset if the containing `Form` is reset
  useEffect(() => {
    if (pristine) {
      setValuesDuringLastSave(values)
    }
  }, [pristine, values])

  const dirtySinceLastSave = useMemo(() => {
    return !isEqual(values, valuesDuringLastSave)
  }, [values, valuesDuringLastSave])

  /**
   * If `newFormValues` is set, reset the form with these values.
   */
  useEffect(() => {
    if (newFormValues) {
      form.batch(() => {
        // Re-hydrate the form with the new values
        form.reset(newFormValues)

        // If form was dirtied while save was running, re-dirty it
        if (dirtySinceLastSave) {
          const keysChangedDuringSave = form
            .getRegisteredFields()
            .filter((key) => !isEqual(getIn(values as object, key), getIn(valuesDuringLastSave as object, key)))

          keysChangedDuringSave.forEach((key) => {
            form.change(key as keyof FormValues, getIn(values as object, key))
          })
        }

        // If the form was flagged as "submit failed", assume this re-hydration
        // is a result of a "save" (not a "submit") and put the form back into a "submit failed" state.
        // This will ensure that any validation errors or other "submission failed" state variables are
        // retained.
        if (submitFailed) {
          Object.keys(newValuesDuringLastSave.current).forEach((key) => {
            form.change(key as keyof FormValues, getIn(values as object, key))
          })

          form.submit()
        }
      })
      setNewFormValues(undefined)
      setSaving(false)
    }
  }, [newFormValues, form, dirtySinceLastSave, values, valuesDuringLastSave, submitFailed, errors])

  const save = async (newValues: Partial<FormValues> = {}) => {
    const mergedValues = deepmerge(values, newValues, {
      isMergeableObject: isPlainObject,
    })

    const invalid = validate ? await validate(mergedValues) : false
    if (invalid) {
      return
    }

    newValuesDuringLastSave.current = newValues

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
    // Insert `newValues` into form so that any validation `errors` are instantly updated
    // and so the `form.submit()` call further down sees the updated values.
    form.batch(() => {
      Object.keys(newValues).forEach((key) => {
        form.change(key as keyof FormValues, getIn(newValues as object, key))
      })
    })

    await save(newValues)

    form.submit()
  }

  return (
    <VMFormContext.Provider value={{ save, submit, saving, dirtySinceLastSave, isDisabled }}>
      {children}
    </VMFormContext.Provider>
  )
}

export default VMFormContext