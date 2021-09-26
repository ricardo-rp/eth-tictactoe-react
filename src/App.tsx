import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

import './App.css';
import Board from './lib/components/Board'

import { TTT_ABI, TTT_ADDRESS } from './lib/contract/abi';


function App() {
  const [state, setState] = useState<{ account: string }>()

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    setState({ account: accounts[0] })

    const contract = new web3.eth.Contract(TTT_ABI as AbiItem[], TTT_ADDRESS)

    console.log({ contract })
  }

  // Load blockchain data on mount
  useEffect(() => { loadBlockchainData() }, [])

  return (
    <div className="App">
      <header className="App-header">
        Eth tic-tac-toe
      </header>

      <p>Accounts[0]: {state?.account}</p>

      <Board />
    </div>
  );
}

export default App;
