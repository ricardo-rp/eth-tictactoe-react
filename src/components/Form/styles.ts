import styled from 'styled-components'
import { Form } from '@unform/web'

export const StyledForm = styled(Form)`
  display: flex;
  border: solid 2px rgba(255, 255, 255, 0.2);
  flex-direction: column;
  padding: 2vw;
  border-radius: 10px;
  margin: 0.2em 1em 1em;

  transition: all 0.2s;

  &:hover {
    border: solid 2px rgba(255, 255, 255, 0.4);
  }

  & label {
    font-size: 0.6em;
  }

  & button {
    margin-top: 1em;
  }
`
