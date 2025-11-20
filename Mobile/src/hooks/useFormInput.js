import { useState } from 'react'

export function useFormInput (initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange (newValue) {
    setValue(newValue)
  }

  const inputProps = {
    value,
    onChangeText: handleChange
  }

  return inputProps
}
