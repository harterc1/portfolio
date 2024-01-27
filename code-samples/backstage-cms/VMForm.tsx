import { Form } from 'react-final-form'

import { noop } from 'utils/misc'

import { VMFormContextProvider } from './VMForm.context'

import type { VMFormProps } from './VMForm.types'

const VMForm = <FormValues, InitialFormValues = Partial<FormValues>>({
  isDisabled,
  onSave,
  onSubmit,
  render,
  validate,
  ...props
}: VMFormProps<FormValues, InitialFormValues>) => {
  return (
    <Form
      {...props}
      onSubmit={onSubmit || noop}
      validate={validate}
      render={(formRenderProps) => {
        return (
          <VMFormContextProvider onSave={onSave} isDisabled={isDisabled} validate={validate}>
            {render && render(formRenderProps)}
          </VMFormContextProvider>
        )
      }}
    />
  )
}

export default VMForm