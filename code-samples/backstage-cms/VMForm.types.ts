import type { FormApi, SubmissionErrors, ValidationErrors } from 'final-form'
import type { FormProps } from 'react-final-form'

export type VMFormValidate<FormValues> = (values: FormValues) => Promise<ValidationErrors>

export type VMFormOnSaveParameters<FormValues, InitialFormValues = Partial<FormValues>> = {
  form: FormApi<FormValues, InitialFormValues>
  mergedValues: FormValues
  newValues: Partial<FormValues>
}

export type VMFormOnSave<FormValues, InitialFormValues> = (
  params: VMFormOnSaveParameters<FormValues, InitialFormValues>
) => Promise<InitialFormValues | undefined>

export type VMFormContextValue<FormValues = object> = {
  save: (newValues?: Partial<FormValues>) => Promise<void>
  submit: (newValues?: Partial<FormValues>) => Promise<void>
  saving: boolean
  dirtySinceLastSave: boolean
  isDisabled?: boolean
}

/**
 * `Form` has alternate ways of defining it's children, validation method, etc.
 *
 *  We've only implemented a subset of this functionality in `VMForm` (so far),
 *  so we omit some props and redefine some types to account for things that
 *  simply "aren't implemented yet".
 */
export interface VMFormProps<FormValues, InitialFormValues = Partial<FormValues>>
  extends Omit<FormProps<FormValues, InitialFormValues>, 'onSubmit' | 'component' | 'children'> {
  // onSave isn't optional because if you don't need it, you shouldn't be using VMForm
  onSave: VMFormOnSave<FormValues, InitialFormValues>

  // Make onSubmit optional
  onSubmit?: (
    values: FormValues,
    form: FormApi<FormValues, InitialFormValues>,
    callback?: (errors?: SubmissionErrors) => void
  ) => void | SubmissionErrors | Promise<SubmissionErrors>
}