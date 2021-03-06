import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useGameContext } from '../../../lib/context/gameContext'
import { useInput } from '../../../lib/hooks/useInput'
import { Form } from '../../Form'

export function NewGameForm(): JSX.Element | null {
  const { signGame } = useGameContext()
  const { account } = useWeb3React()
  const [matchString, setMatchString] = useState('')
  const addrB = useInput('')
  // TODO: Install unform or formik to handle form data and onSubmit function
  async function tryCreateGame() {
    try {
      if (!account) return
      const { match, signature } = await signGame(account, addrB.value)
      // console.log({ match, signature })
      setMatchString(JSON.stringify({ match, signature }))
      // Sign
    } catch (e) {
      console.error(e)
    }
  }

  if (account)
    return (
      <Form id="addressForm">
        <label>Player A Address</label>
        <label>{account}</label>
        <input
          id="addressA"
          value={account}
          readOnly
          style={{ display: 'none' }}
        />

        <label htmlFor="addressB">Player B Address</label>
        <input id="addressB" {...addrB} />

        {/* <label htmlFor="nonce">Nonce</label>
        <input id="nonce" {...nonce} />

        <label htmlFor="sigA">Player A Signature</label>
        <input id="sigA" {...sigA} />

        <label htmlFor="sigB">Player B Signature</label>
        <input id="sigB" {...sigB} /> */}

        {matchString ? (
          <label htmlFor="matchString" style={{ wordWrap: 'normal' }}>
            {matchString}
          </label>
        ) : null}
        <button type="button" onClick={tryCreateGame}>
          Submit
        </button>
      </Form>
    )

  return null
}
