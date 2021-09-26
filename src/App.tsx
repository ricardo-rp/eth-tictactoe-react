import { useEffect } from 'react';
import './App.css';
import Board from './lib/components/Board'
import useInput from './lib/hooks/useInput';
import { createGame } from './lib/utils/createGame';
import { web3 } from './lib/utils/web3';

const board = false;

function App() {
  const bindAddrA = useInput('')
  const bindAddrB = useInput('')

  async function loadBlockchainData() {

    const accounts = await web3.eth.getAccounts()
    console.log({ accounts })

    // const contract = new web3.eth.Contract(TTT_ABI as AbiItem[], TTT_ADDRESS)

    // const gameId = contract.methods.newGame()
  }

  // Load blockchain data on mount
  useEffect(() => { loadBlockchainData() }, [])

  const onClickCreateGame = async () => {
    try {
      console.log({ playerA: bindAddrA.value })
      const game = await createGame(bindAddrA.value, bindAddrB.value)
      console.log({ game })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Eth tic-tac-toe
      </header>

      {/* Menu */}
      {!board && <div>
        <h5 className="formLabel">New Game</h5>
        <form className="form" id="addressForm">
          <label>Player A Address</label>
          <input id="addressA" {...bindAddrA} />

          <label htmlFor="addressB">Player B Address</label>
          <input id="addressB" {...bindAddrB} />

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
