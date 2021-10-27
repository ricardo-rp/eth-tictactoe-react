import { arrayify, solidityKeccak256 } from 'ethers/lib/utils'
import { Match } from '../types'

export type MatchSignedByA = {
  match: Match
  signature: string
}

// TODO Create an EIP712 compatible contract and frontend
export const hashMatch = (match: Match): Uint8Array => {
  const hash = solidityKeccak256(
    ['address', 'address', 'uint256'],
    [match.playerA, match.playerB, match.nonce]
  ) as string
  // Needs to arrayify because signing a string results in different signature
  return arrayify(hash)
}
