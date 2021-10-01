import { getContractInstance } from "../contract/abi";
import { Coords, Match } from "../types"
import { web3 } from "./web3"
const util = require('ethereumjs-util')

export type MatchSignedByA = {
    match: Match;
    pAsig: string;
}

// DEFINE GLOBALLY CHAIN_ ID, CURRENT ACCOUNT AND GAME ID

// TODO Create an EIP712 compatible contract and frontend
export async function signGame(signer: string | null | undefined, addressA: string, addressB: string, nonce: number): Promise<MatchSignedByA> {
    const match: Match = {
        playerA: addressA,
        playerB: addressB,
        nonce: nonce //Math.floor(new Date().getTime() / 1000)
    };
    if (addressA !== signer && addressB !== signer)
        throw Error("You must be part of the game")
    const pAsig = await web3.eth.personal.sign(hashMatch(match), signer, "")
    return { match, pAsig }
}

export async function createGame(chainId: number | undefined, sender: string | null | undefined, addressA: string, addressB: string, nonce: number, sigA: string, sigB: string): Promise<string> {
    const match: Match = {
        playerA: addressA,
        playerB: addressB,
        nonce: nonce //Math.floor(new Date().getTime() / 1000)
    };
    const resA = util.fromRpcSig(sigA);
    const resB = util.fromRpcSig(sigB);
    const gameId = await getContractInstance(chainId).methods.newGame(match, resA, resB).call();
    await getContractInstance(chainId).methods.newGame(match, resA, resB).send({ from: sender });
    return gameId
}

export async function getBoard(chainId: number | undefined, gameId: string) {
    const game = await getContractInstance(chainId).methods.games(gameId).call();
    console.log(game);
    console.log(game.board);
    return game.board;
}

// export async function makeMove(coords: Coords) {
//     const makeMove = getContractInstance(chainId).methods.makeMove(gameId, coords.x, coords.y);
//     const response = await makeMove.call();
//     await makeMove.send({ from: sender });

//     return response;
// }

export const hashMatch = (match: Match): string =>
    web3.utils.soliditySha3(match.playerA, match.playerB, match.nonce) as string