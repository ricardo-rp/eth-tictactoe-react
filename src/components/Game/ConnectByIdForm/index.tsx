import { useGameContext } from '../../../lib/context/gameContext'
import { useInput } from '../../../lib/hooks/useInput'
import { Form } from '../../Form'

export const ConnectByIdForm: React.FC = () => {
  const { connectGame } = useGameContext()
  const gameId = useInput('')

  async function tryConnectGame() {
    await connectGame(gameId.value)
  }

  return (
    <Form>
      <label htmlFor="gameId">Game Id </label>
      <input type="text" id="gameId" {...gameId} />

      <button type="button" onClick={tryConnectGame}>
        Submit
      </button>
    </Form>
  )
}
