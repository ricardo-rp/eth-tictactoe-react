import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

import './App.css';
import Board from './lib/components/Board'
import Menu from './lib/components/Menu';

import { TTT_ABI, TTT_ADDRESS } from './lib/contract/abi';


function App() {
  const [asyncState, setAsyncState] = useState<{ account: string }>()
  const [hasGame, setHasGame] = useState(false)

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:9545")
    const accounts = await web3.eth.getAccounts()
    setAsyncState({ account: accounts[0] })

    const contract = new web3.eth.Contract(TTT_ABI as AbiItem[], TTT_ADDRESS)

    // const gameId = contract.methods.newGame()

    // console.log({ gameId })
  }

  // Load blockchain data on mount
  useEffect(() => { loadBlockchainData() }, [])

  return (
    <div className="App">
      <header className="App-header">
        Eth tic-tac-toe
      </header>

      <Menu hasGame={hasGame} setHasGame={setHasGame} />

      <p>Accounts[0]: {asyncState?.account}</p>

      <Board hasGame={hasGame} />
    </div>
  );
}

export default App;
