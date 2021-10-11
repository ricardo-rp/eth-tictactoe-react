import { getContractInstance } from '../contract/abi'
import { Match } from '../types'
import { web3 } from './web3'
import util from 'ethereumjs-util'

export type MatchSignedByA = {
  match: Match
  pAsig: string
}

// TODO Create an EIP712 compatible contract and frontend
export async function signGame(
  signer: string | null | undefined,
  addressA: string,
  addressB: string,
  nonce: number
): Promise<MatchSignedByA> {
  const match: Match = {
    playerA: addressA,
    playerB: addressB,
    nonce: nonce, //Math.floor(new Date().getTime() / 1000)
  }
  if (addressA !== signer && addressB !== signer)
    throw Error('You must be part of the game')
  const pAsig = await web3.eth.personal.sign(hashMatch(match), signer, '')
  return { match, pAsig }
}

export async function createGame(
  chainId: number | undefined,
  sender: string | null | undefined,
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
    .send({ from: sender })
  return gameId
}

const hashMatch = (match: Match): string =>
  web3.utils.soliditySha3(match.playerA, match.playerB, match.nonce) as string
