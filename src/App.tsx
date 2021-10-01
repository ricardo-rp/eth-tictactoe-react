import './App.css';
import Board from './lib/components/Board'
import useInput from './lib/hooks/useInput';
import { createGame, getBoard, signGame } from './lib/utils/createGame';
import { injected } from './components/connector';
import { useWeb3React } from '@web3-react/core';
import { getContractInstance } from './lib/contract/abi';
import { EventData } from 'web3-eth-contract'
import { useEffect, useState } from 'react';
import { GameBoard } from './lib/types'
let board: any = false;

function App() {
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  const bindAddrA = useInput('') // Should bind automaticaly when login
  const bindAddrB = useInput('')
  const nonce = useInput('') // Should be a nonce
  const sigA = useInput('') // Should be completed depending on the signature
  const sigB = useInput('')
  const gameId = useInput('')
  const [game, setGame] = useState({ activeGameId: '' })
  const [board, updateBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }
  function updateGameId() {
    setGame({ activeGameId: gameId.value });
    console.log(game.activeGameId)
    updateBoard([['', '', ''], ['', '', ''], ['', '', '']])
    if (game.activeGameId) {
      console.log("as")
    }
  }


  function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex)
    }
  }
  useEffect(() => {
    // This will only happen on first render
    const contract = getContractInstance(chainId);
    contract.events.PlayerMadeMove({ filter: { gameId: game.activeGameId } }, playerMoveEvent);
    contract.events.PlayerMadeMove({ filter: { gameId: game.activeGameId } }, playerMoveEvent);
  }, []);

  function playerMoveEvent(error: Error, event: EventData) {
    console.log(event)
  }

  const onClickCreateGame = async () => {
    try {
      // Send to blockchain
      if (bindAddrA.value && bindAddrB.value && nonce.value && sigA.value && sigB.value) {
        console.log("SEND TO BLOCKCHAIN")
        const gameId = await createGame(chainId, account, bindAddrA.value, bindAddrB.value, parseInt(nonce.value), sigA.value, sigB.value)
        console.log({ gameId })
        game.activeGameId = gameId;
        updateBoard(await getBoard(chainId, gameId));
      } else {
        const { match, pAsig } = await signGame(account, bindAddrA.value, bindAddrB.value, parseInt(nonce.value))
        console.log({ match })
        console.log({ pAsig })
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
      {!game.activeGameId && <div>
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
          <input type="text" id="gameId"{...gameId} />

          <button type="button" onClick={updateGameId} >Submit</button>
        </form>
      </div>}

      {/* Board */}
      <Board board={board} />
    </div>
  )
}

export default App;
