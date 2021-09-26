import './App.css';
import Board from './components/Board'
import { Web3Provider } from '@ethersproject/providers'

import { Web3ReactProvider } from '@web3-react/core'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <header className="App-header">
          Eth tic-tac-toe
        </header>
        <Board />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
