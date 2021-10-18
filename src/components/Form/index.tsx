import { useRef } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Input } from '../UnformInput/index'
import { StyledForm } from './styles'

interface FormData {
  name: string
  email: string
}

export function Form(): JSX.Element {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef)
  }

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit}>
      <Input name="name" />
      <Input name="email" />
    </StyledForm>
  )
}
