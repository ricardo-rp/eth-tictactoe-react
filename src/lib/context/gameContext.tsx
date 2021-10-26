import { createContext, useContext, useState } from 'react'
import { GameBoard, Match } from '../types'
import { hashMatch, MatchSignedByA } from '../utils/createGame'
import { web3 } from '../utils/web3'
import { getContractInstance } from '../contract/abi'
import { useWeb3React } from '@web3-react/core'
import { fromRpcSig } from 'ethereumjs-util'

type SignGame = (
  addressA: string,
  addressB: string,
  nonce?: number
) => Promise<MatchSignedByA>

type CreateGame = (
  addressA: string,
  addressB: string,
  nonce: number,
  sigA: string,
  sigB: string
) => Promise<string>

type GameContextData = {
  gameId: string
  board: GameBoard
  canMakeMove: () => boolean
  makeMove: (x: number, y: number) => Promise<void>
  updateMove: (move: PlayerMadeMoveEvent) => void
  signGame: SignGame
  createGame: CreateGame
  connectGame: (gameId: string) => Promise<boolean>
  account: string | null | undefined
}

export interface PlayerMadeMoveEvent {
  gameId: string
  player: string
  xCoordinate: number
  yCoordinate: number
}

const GameContext = createContext({} as GameContextData)

const newBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
] as GameBoard

interface Game {
  playerA: string
  playerB: string
  nonce: number
  playerTurn: string
  winner: string
}

export const GameProvider: React.FC = ({ children }) => {
  const { account, chainId } = useWeb3React()
  const [gameId, setGameId] = useState<string>('')
  const [board, loadBoard] = useState<GameBoard>(newBoard)
  const [game, setGame] = useState<Game | null>(null)

  const signGame = async function (
    addressA: string,
    addressB: string,
    nonce = 0
  ): Promise<MatchSignedByA> {
    const match: Match = {
      playerA: addressA,
      playerB: addressB,
      nonce: nonce === 0 ? Math.floor(new Date().getTime() / 1000) : nonce,
    }
    if (addressA !== account && addressB !== account)
      throw Error('You must be part of the game')
    const signature = await web3.eth.personal.sign(
      hashMatch(match),
      account,
      ''
    )
    return { match, signature }
  }
  // 0xfd2fe4f41f823264fbb6a42a899686c31f0e76cfc23c83bda6e34e426a14bbad
  const createGame = async function (
    addressA: string,
    addressB: string,
    nonce: number,
    sigA: string,
    sigB: string
  ): Promise<string> {
    const match: Match = {
      playerA: addressA,
      playerB: addressB,
      nonce: nonce, //Math.floor(new Date().getTime() / 1000)
    }
    const resA = fromRpcSig(sigA)
    const resB = fromRpcSig(sigB)
    const gameId = await getContractInstance(chainId)
      .methods.newGame(match, resA, resB)
      .call()
    await getContractInstance(chainId)
      .methods.newGame(match, resA, resB)
      .send({ from: account })
    console.log(gameId)
    const game = await getContractInstance(chainId).methods.games(gameId).call()
    setGameId(gameId)
    setGame(game as Game)
    return gameId
  }
  const connectGame = async function (gameId: string): Promise<boolean> {
    const game = await getContractInstance(chainId).methods.games(gameId).call()
    if (game.playerA !== account && game.playerB !== account)
      throw Error('You must be part of the game')
    const currentBoard = await getContractInstance(chainId)
      .methods.getGameBoard(gameId)
      .call()
    const fixedBoard = currentBoard.map((row: []) => {
      return row.map((cell: string) => {
        if (cell === '1') return 'x'
        if (cell === '2') return 'o'
        return ''
      })
    })
    if (fixedBoard) {
      loadBoard(fixedBoard)
    } else {
      loadBoard(newBoard)
    }
    setGameId(gameId)
    setGame(game as Game)
    return true
  }

  const makeMove = async function (x: number, y: number): Promise<void> {
    await getContractInstance(chainId)
      .methods.makeMove(gameId, x, y)
      .send({ from: account })
  }

  const updateMove = async function (move: PlayerMadeMoveEvent): Promise<void> {
    await getContractInstance(chainId)
      .methods.makeMove(gameId, move.xCoordinate, move.yCoordinate)
      .send({ from: account })
    const b = board
    b[move.xCoordinate][move.yCoordinate] =
      move.player === game?.playerA ? 'x' : 'o'
    loadBoard(b)
  }

  const canMakeMove = function (): boolean {
    return (
      (game?.playerA === account && game?.playerTurn === '1') ||
      (game?.playerB === account && game?.playerTurn === '2')
    )
  }
  return (
    <GameContext.Provider
      value={{
        gameId,
        board,
        canMakeMove,
        makeMove,
        updateMove,
        signGame,
        createGame,
        connectGame,
        account,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
export const useGameContext = (): GameContextData => useContext(GameContext)

export default GameContext
