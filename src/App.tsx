import './App.css'
import Board from './components/Board'
import { createGame, signGame } from './lib/utils/createGame'
import { injected } from './components/connector'
import { useWeb3React } from '@web3-react/core'
import { ConnectByIdForm } from './components/ConnectByIdForm'
import NewGameForm from './components/NewGameForm'

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
    try {
      if (account && addrB && nonce && sigA && sigB) {
        const gameId = await createGame(chainId, account, account, addrB, parseInt(nonce), sigA, sigB)
        console.log({ gameId })
      } else {
        if (!account) return
        const { match, pAsig } = await signGame(account, account, addrB, parseInt(nonce))
        console.log({ match ,pAsig })
        // Sign
      }

    } catch (e) {
      console.error(e)
    }
  }

  if (!active) return <button type="button" onClick={connect}>Connect to Metamask</button>

  return (
    <>
      <button type="button" onClick={disconnect}>Disconnect</button>

      {/* Menu */}
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
    <header className="App-header">
      Eth tic-tac-toe
    </header>

    <Game />
  </div>
)

export default App
