import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'

type InputProps = JSX.IntrinsicElements['input'] & {
  name: string
  label?: string
}

export function Input({
  name,
  label,
  required,
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && (
        <label htmlFor={fieldName}>
          {label}
          {required && <span style={{ color: '#f00' }}>*</span>}:
        </label>
      )}

      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  )
}
