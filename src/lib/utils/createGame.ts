import { Match } from "../types"
import { web3 } from "./web3"


export type MatchSignedByA = {
    match: Match;
    pAsig: string;
}

export async function createGame(addressA: string, addressB: string): Promise<MatchSignedByA> {
    const match: Match = {
        playerA: addressA,
        playerB: addressB,
        nonce: new Date().getTime()
    };

    const pAsig = await web3.eth.sign(hashMatch(match), addressA)

    return { match, pAsig }
}

const hashMatch = (match: Match): string =>
    web3.utils.soliditySha3(match.playerA, match.playerB, match.nonce) as string