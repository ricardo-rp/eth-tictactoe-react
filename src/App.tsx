import './App.css';
import Board from './lib/components/Board'
import useInput from './lib/hooks/useInput';
import { createGame, signGame } from './lib/utils/createGame';
import { injected } from './components/connector';
import { useWeb3React } from '@web3-react/core';
const board = false;

function App() {
  const { active, account, activate, deactivate } = useWeb3React();
  const bindAddrA = useInput('') // Should bind automaticaly when login
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
      if (bindAddrA.value && bindAddrB.value && nonce.value && sigA.value && sigB.value  ) {
        console.log("SEND TO BLOCKCHAIN")
        const gameId = await createGame(account, bindAddrA.value, bindAddrB.value, parseInt(nonce.value) , sigA.value, sigB.value)
        console.log({ gameId })
      } else {
        const game = await signGame(account, bindAddrA.value, bindAddrB.value, parseInt(nonce.value))
        console.log({ game })
        // Sign
      }
      
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Eth tic-tac-toe
      </header>

      {active ? <button type="button" onClick={disconnect}>Disconnect</button> : <button type="button" onClick={connect}>Connect to Metamask</button>}
      {active ? account : "Not Connected"}
      {/* Menu */}
      {!board && <div>
        <h5 className="formLabel">New Game</h5>
        <form className="form" id="addressForm">
          <label>Player A Address</label>
          <input id="addressA" {...bindAddrA} />  {/* Should auto-complete */}

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

      {/* Board */}
      <Board />
    </div>
  )
}

export default App;
