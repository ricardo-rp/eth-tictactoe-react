import { injected } from '../connector'
import { useWeb3React } from '@web3-react/core'
import NewGameForm from './NewGameForm'
import { ConnectByIdForm } from './ConnectByIdForm'
import Board from './Board'


export function Game() {
    const { active, account, activate, deactivate } = useWeb3React()
  
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
  
    const onClickCreateGame = async () => {
      console.log('onClickCreateGame')
      // try {
      //   if (account && addrB && nonce && sigA && sigB) {
      //     const gameId = await createGame(chainId, account, account, addrB, parseInt(nonce), sigA, sigB)
      //     console.log({ gameId })
      //   } else {
      //     if (!account) return
      //     const { match, pAsig } = await signGame(account, account, addrB, parseInt(nonce))
      //     console.log({ match ,pAsig })
      //     // Sign
      //   }
  
      // } catch (e) {
      //   console.error(e)
      // }
    }
  
    if (!active) return <button type="button" onClick={connect}>Connect to Metamask</button>
  
    // TODO: Add tabs for user to select a menu
    // TODO: Install styled-jsx and scope styles correctly
    return (
      <>
        <button type="button" onClick={disconnect}>Disconnect</button>
  
        <h5 className="formLabel">New Game</h5>
        <NewGameForm
          active={active}
          // We already checked the connection is active. `account` is defined
          account={account as string}
          onSubmit={onClickCreateGame}
        />
  
        <h5 className="formLabel">Connect by GameId</h5>
        <ConnectByIdForm />
  
        <Board />
      </>
    )
  }
  
  