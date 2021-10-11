import { useState } from 'react'

type BindInput = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function useInput(initialValue: string): BindInput {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return { value, onChange }
}

export default useInput
