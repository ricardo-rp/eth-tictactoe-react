import { useGameContext } from '../../../lib/context/gameContext'
import { Form } from '../../Form'

export function NewGameForm(): JSX.Element | null {
  const { account } = useGameContext()

  // TODO: Install unform or formik to handle form data and onSubmit function
  async function tryCreateGame() {
    console.log('tryCreateGame')
    // try {
    //   if (account && addrB && nonce && sigA && sigB) {
    //     const gameId = await createGame(
    //       chainId,
    //       account,
    //       account,
    //       addrB,
    //       parseInt(nonce),
    //       sigA,
    //       sigB
    //     )
    //     console.log({ gameId })
    //   } else {
    //     if (!account) return
    //     const { match, pAsig } = await signGame(
    //       account,
    //       account,
    //       addrB,
    //       parseInt(nonce)
    //     )
    //     console.log({ match, pAsig })
    //     // Sign
    //   }
    // } catch (e) {
    //   console.error(e)
    // }
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
