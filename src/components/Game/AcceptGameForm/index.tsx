import { useWeb3React } from '@web3-react/core'
import { useGameContext } from '../../../lib/context/gameContext'
// import { useGameContext } from '../../../lib/context/gameContext'
import { useInput } from '../../../lib/hooks/useInput'
import { Form } from '../../Form'

export function AcceptGameForm(): JSX.Element | null {
  const { createGame, signGame } = useGameContext()
  const { account } = useWeb3React()
  const matchString = useInput('')

  // TODO: Install unform or formik to handle form data and onSubmit function
  async function tryCreateGame() {
    const { match, signature } = JSON.parse(matchString.value)
    const sign = await signGame(match.playerA, match.playerB, match.nonce)

    await createGame(
      match.playerA,
      match.playerB,
      match.nonce,
      signature,
      sign.signature
    )
  }

  if (account)
    return (
      <Form id="addressForm">
        <label htmlFor="matchString">MatchString</label>
        <input id="matchString" {...matchString} />

        <button type="button" onClick={tryCreateGame}>
          Sign and Accept
        </button>
      </Form>
    )

  return null
}
