import { createContext, useContext } from 'react'
import { Match } from '../types'
import { hashMatch, MatchSignedByA } from '../utils/createGame'
import { web3 } from '../utils/web3'
import util from 'ethereumjs-util'
import { getContractInstance } from '../contract/abi'
import { useWeb3React } from '@web3-react/core'
import { BindInput, useInput } from '../hooks/useInput'

type SignGame = (
  addressA: string,
  addressB: string,
  nonce: number
) => Promise<MatchSignedByA>

type CreateGame = (
  addressA: string,
  addressB: string,
  nonce: number,
  sigA: string,
  sigB: string
) => Promise<string>

type GameContextData = {
  addrA: BindInput
  addrB: BindInput
  sigA: BindInput
  sigB: BindInput
  nonce: BindInput
  signGame: SignGame
  createGame: CreateGame
  account: string | null | undefined
}

const GameContext = createContext({} as GameContextData)

export const GameProvider: React.FC = ({ children }) => {
  const { account, chainId } = useWeb3React()
  const addrA = useInput('')
  const addrB = useInput('')
  const sigA = useInput('')
  const sigB = useInput('')
  const nonce = useInput('')

  const signGame = async function (
    addressA: string,
    addressB: string,
    nonce: number
  ): Promise<MatchSignedByA> {
    const match: Match = {
      playerA: addressA,
      playerB: addressB,
      nonce: nonce, //Math.floor(new Date().getTime() / 1000)
    }
    if (addressA !== account && addressB !== account)
      throw Error('You must be part of the game')
    const pAsig = await web3.eth.personal.sign(hashMatch(match), account, '')
    return { match, pAsig }
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
    const resA = util.fromRpcSig(sigA)
    const resB = util.fromRpcSig(sigB)
    const gameId = await getContractInstance(chainId)
      .methods.newGame(match, resA, resB)
      .call()
    await getContractInstance(chainId)
      .methods.newGame(match, resA, resB)
      .send({ from: account })
    return gameId
  }
  return (
    <GameContext.Provider
      value={{
        addrA,
        addrB,
        sigA,
        sigB,
        nonce,
        signGame,
        createGame,
        account,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
export const useGameContext = (): GameContextData => useContext(GameContext)

export default GameContext
