import { Form } from '../../Form'

export const ConnectByIdForm: React.FC = () => {
  return (
    <Form>
      <label htmlFor="gameId">Game Id </label>
      <input type="text" id="gameId" />

      <button type="button">Submit</button>
    </Form>
  )
}
