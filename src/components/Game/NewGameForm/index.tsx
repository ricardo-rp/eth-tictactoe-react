import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useGameContext } from '../../../lib/context/gameContext'
import { Form } from '../../Form'

export function NewGameForm(): JSX.Element | null {
  const { addrB, signGame } = useGameContext()
  const { account } = useWeb3React()
  const [value, setValue] = useState('')
  // TODO: Install unform or formik to handle form data and onSubmit function
  async function tryCreateGame() {
    console.log('tryCreateGame')
    try {
      if (!account) return
      const { match, signature } = await signGame(account, addrB.value)
      console.log({ match, signature })
      setValue(JSON.stringify({ match, signature }))
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
        <input id="addressA" value={account} style={{ display: 'none' }} />

        <label htmlFor="addressB">Player B Address</label>
        <input id="addressB" {...addrB} />

        {/* <label htmlFor="nonce">Nonce</label>
        <input id="nonce" {...nonce} />

        <label htmlFor="sigA">Player A Signature</label>
        <input id="sigA" {...sigA} />

        <label htmlFor="sigB">Player B Signature</label>
        <input id="sigB" {...sigB} /> */}

        {value ? (
          <label htmlFor="matchString" style={{ wordWrap: 'normal' }}>
            {value}
          </label>
        ) : null}
        <button type="button" onClick={tryCreateGame}>
          Submit
        </button>
      </Form>
    )

  return null
}
