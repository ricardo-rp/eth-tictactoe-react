import './App.css'
import Board from './components/Board'
import { createGame, signGame } from './lib/utils/createGame'
import { injected } from './components/connector'
import { useWeb3React } from '@web3-react/core'
import { ConnectByIdForm } from './components/ConnectByIdForm'
import NewGameForm from './components/NewGameForm'

/* TODO Change this patter to use layouts. Similar to this nextjs pattern:
* https://www.youtube.com/watch?v=WOeLxL2DF3E&t=4s
* https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
*/

import { GlobalStyle } from "./styles/global"

function Game() {
  const { active, account, chainId, activate, deactivate } = useWeb3React()

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


const App: React.FC = () => (
  <div className="App">
    <GlobalStyle />
    <header className="App-header">
      Eth tic-tac-toe
    </header>

    <Game />
  </div>
)

export default App
