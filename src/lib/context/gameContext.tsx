import { createContext, useContext, useEffect, useState } from 'react'
import { GameBoard, Match } from '../types'
import { hashMatch, MatchSignedByA } from '../utils/hash_util'
import { TIC_TAC_TOE, TTT_ABI } from '../contract/abi'
import { useWeb3React } from '@web3-react/core'
import { fromRpcSig } from 'ethereumjs-util'
import { ethers } from 'ethers'

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
  contract: ethers.Contract | null
  gameId: string
  board: GameBoard
  canMakeMove: () => boolean
  makeMove: (x: number, y: number) => Promise<void>
  updateMove: PlayerMadeMoveEvent
  signGame: SignGame
  createGame: CreateGame
  connectGame: (gameId: string) => Promise<boolean>
  account: string | null | undefined
}

type PlayerMadeMoveEvent = (
  gameId: string,
  player: string,
  xCoordinate: number,
  yCoordinate: number
) => Promise<void>

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
  playerTurn: number
  winner: number
}

const newGame = {
  playerA: '',
  playerB: '',
  nonce: 0,
  playerTurn: 0,
  winner: 0,
}

export const GameProvider: React.FC = ({ children }) => {
  const { account, chainId, library } = useWeb3React()
  const [gameId, setGameId] = useState<string>('')
  const [board, loadBoard] = useState<GameBoard>(newBoard)
  const [game, setGame] = useState<Game>(newGame)
  const [contract, setContract] = useState<ethers.Contract | null>(null)

  useEffect(() => {
    if (chainId === undefined) return
    const signer = library.getSigner()
    const c = new ethers.Contract(TIC_TAC_TOE[chainId], TTT_ABI, signer)
    setContract(c)
  }, [chainId, library, account])

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
    const hash = hashMatch(match)
    const signature = await library.getSigner().signMessage(hash)
    return { match, signature }
  }
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
    const gameId = await contract?.callStatic.newGame(match, resA, resB)
    await (await contract?.newGame(match, resA, resB)).wait()

    await connectGame(gameId)
    return gameId
  }
  const connectGame = async function (gameId: string): Promise<boolean> {
    console.log(gameId)
    const game = await contract?.games(gameId)
    if (game.playerA !== account && game.playerB !== account)
      throw Error('You must be part of the game')
    const currentBoard = await contract?.getGameBoard(gameId)
    const fixedBoard = currentBoard.map((row: []) => {
      return row.map((cell: number) => {
        if (cell === 1) return 'x'
        if (cell === 2) return 'o'
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
    await contract?.makeMove(gameId, x, y)
  }

  const updateMove = async function (
    gameId: string,
    player: string,
    xCoordinate: number,
    yCoordinate: number
  ): Promise<void> {
    const b = board
    b[xCoordinate][yCoordinate] = player === game.playerA ? 'x' : 'o'
    loadBoard(b)
    if (gameId) {
      const game = await contract?.games(gameId)
      setGame(game)
    }
  }

  const canMakeMove = function (): boolean {
    return (
      game?.winner === 0 &&
      ((game.playerA === account && game.playerTurn === 1) ||
        (game.playerB === account && game.playerTurn === 2))
    )
  }
  return (
    <GameContext.Provider
      value={{
        contract,
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
