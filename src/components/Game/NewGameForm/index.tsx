import { useWeb3React } from '@web3-react/core'
import { useGameContext } from '../../../lib/context/gameContext'
import { Form } from '../../Form'

export function NewGameForm(): JSX.Element | null {
  const { addrB, sigA, sigB, nonce, createGame, signGame } = useGameContext()
  const { account } = useWeb3React()
  // TODO: Install unform or formik to handle form data and onSubmit function
  async function tryCreateGame() {
    console.log('tryCreateGame')
    console.log('onClickCreateGame')

    try {
      if (account && addrB && nonce && sigA && sigB) {
        const gameId = await createGame(
          account,
          addrB.value,
          parseInt(nonce.value),
          sigA.value,
          sigB.value
        )
        console.log({ gameId })
      } else {
        if (!account) return
        const { match, pAsig } = await signGame(
          account,
          addrB.value,
          parseInt(nonce.value)
        )
        console.log({ match, pAsig })
        // Sign
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (account)
    return (
      <Form id="addressForm">
        <label>Player A Address</label>
        <label>{account}</label>
        <input id="addressA" value={account} style={{ display: 'none' }} />

        <label htmlFor="addressB">Player B Address</label>
        <input id="addressB" />

        <label htmlFor="nonce">Nonce</label>
        <input id="nonce" />

        <label htmlFor="sigA">Player A Signature</label>
        <input id="sigA" />

        <label htmlFor="sigB">Player B Signature</label>
        <input id="sigB" />

        <button type="button" onClick={tryCreateGame}>
          Submit
        </button>
      </Form>
    )

  return null
}
