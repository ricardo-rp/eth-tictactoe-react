import { injected } from '../connector'
import { useWeb3React } from '@web3-react/core'
import { NewGameForm } from './NewGameForm'
import { ConnectByIdForm } from './ConnectByIdForm'
import { Board } from './Board'
import { FormTitle } from './styles'
import { AcceptGameForm } from './AcceptGameForm'

export function Game(): React.ReactElement {
  const { active, activate, deactivate } = useWeb3React()
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.error(ex)
    }
  }

  function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.error(ex)
    }
  }

  if (!active) {
    return (
      <button type="button" onClick={connect}>
        Connect to Metamask
      </button>
    )
  } else {
    // TODO: Add logical assertion that `account` is not null or undefined after this condition
  }

  // TODO: Add tabs for user to select a menu
  return (
    <>
      <button type="button" onClick={disconnect}>
        Disconnect
      </button>

      <FormTitle>New Game</FormTitle>
      <NewGameForm />

      <FormTitle>Accept Match</FormTitle>
      <AcceptGameForm />

      <FormTitle>Connect by GameId</FormTitle>
      <ConnectByIdForm />

      <Board />
    </>
  )
}
