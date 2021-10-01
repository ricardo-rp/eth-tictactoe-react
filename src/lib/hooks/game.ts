import { useWeb3React } from "@web3-react/core";
import { getContractInstance } from "../contract/abi";
import { Coords, Match } from "../types";
import { hashMatch, MatchSignedByA } from "../utils/createGame";
import { web3 } from "../utils/web3";
const util = require('ethereumjs-util')


function Game() {
    const { account, chainId } = useWeb3React();


    let gameId = "";

    function updateGameId(newGameId: string) {
        gameId = newGameId;
    }

    async function signGame(addressA: string, addressB: string, nonce: number): Promise<MatchSignedByA> {
        const match: Match = {
            playerA: addressA,
            playerB: addressB,
            nonce: nonce //Math.floor(new Date().getTime() / 1000)
        };
        if (addressA !== account && addressB !== account)
            throw Error("You must be part of the game")
        const pAsig = await web3.eth.personal.sign(hashMatch(match), account, "")
        return { match, pAsig }
    }

    
    const createGame = async function(chainId: number | undefined, sender: string | null | undefined, addressA: string, addressB: string, nonce: number, sigA: string, sigB: string): Promise<string> {
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

    const makeMove = async function (coords: Coords) {
        const makeMove = getContractInstance(chainId).methods.makeMove(gameId, coords.x, coords.y);
        const response = await makeMove.call();
        await makeMove.send({ from: account });

        return response;
    }

    async function getBoard(chainId: number | undefined, gameId: string) {
        const game = await getContractInstance(chainId).methods.games(gameId).call();
        console.log(game);
        console.log(game.board);
        return game.board;
    }
    return {
        createGame,
        makeMove
    }
}

export const game = Game()