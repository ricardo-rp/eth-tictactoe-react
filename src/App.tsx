import './App.css';
import Board from './lib/components/Board'
import useInput from './lib/hooks/useInput';
import { createGame, signGame } from './lib/utils/createGame';
import { injected } from './components/connector';
import { useWeb3React } from '@web3-react/core';

const board = false;

function Game() {
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  const bindAddrB = useInput('')
  const nonce = useInput('') // Should be a nonce
  const sigA = useInput('') // Should be completed depending on the signature
  const sigB = useInput('')

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }


  function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex)
    }
  }

  const onClickCreateGame = async () => {
    try {
      // Send to blockchain
      if (account && bindAddrB.value && nonce.value && sigA.value && sigB.value) {
        console.log("SEND TO BLOCKCHAIN")
        const gameId = await createGame(chainId, account, account, bindAddrB.value, parseInt(nonce.value), sigA.value, sigB.value)
        console.log({ gameId })
      } else {
        if (!account) return
        const { match, pAsig } = await signGame(account, account, bindAddrB.value, parseInt(nonce.value))
        console.log({ match })
        console.log({ pAsig })
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
      {!board && <div>
        <h5 className="formLabel">New Game</h5>
        <form className="form" id="addressForm">
          <label>Player A Address</label>
          <label>{active ? account : "Not Connected"}</label>
          <input id="addressA" value={account || ''} style={{ display: 'none' }} />  {/* Should auto-complete */}

          <label htmlFor="addressB">Player B Address</label>
          <input id="addressB" {...bindAddrB} />

          <label htmlFor="nonce">Nonce</label>
          <input id="nonce" {...nonce} />

          <label htmlFor="sigA">Player A Signature</label>
          <input id="sigA" {...sigA} />

          <label htmlFor="sigB">Player B Signature</label>
          <input id="sigB" {...sigB} />

          <button type="button" onClick={onClickCreateGame}>Submit</button>
        </form>

        <h5 className="formLabel">Connect by GameId</h5>
        <form className="form">
          <label htmlFor="gameId">Game Id </label>
          <input type="text" id="gameId" />

          <button type="button" >Submit</button>
        </form>
      </div>}

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

export default App;
