import { useContext } from 'react'

import VMFormContext from './VMForm.context'

const useVMForm = () => {
  return useContext(VMFormContext)
}

export default useVMForm