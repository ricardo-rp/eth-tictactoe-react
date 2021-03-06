import { IHash } from '../types'
import { ContractInterface } from 'ethers'

export const TIC_TAC_TOE: IHash = {
  4: '0x8060dF01CB62C5F4ae511b28F1B185aF69AaF1cf',
  80001: '0xDAA9af827182BbEd966613Aa3C293361884ec952',
}

export const ELO_RATING: IHash = {
  4: '0x74e7072cE539Efd7eDd80C297B1127DD29C5e3c6',
  80001: '0x4B0a43025C518e08DbB0AfdE40d7484e0698FddB',
}

export const TTT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'enum TicTacToe.Winners',
        name: 'winner',
        type: 'uint8',
      },
    ],
    name: 'GameOver',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'playerNumber',
        type: 'uint8',
      },
    ],
    name: 'PlayerJoinedGame',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'xCoordinate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'yCoordinate',
        type: 'uint256',
      },
    ],
    name: 'PlayerMadeMove',
    type: 'event',
  },
  {
    inputs: [],
    name: '_system',
    outputs: [
      {
        internalType: 'contract RatingSystem',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'games',
    outputs: [
      {
        internalType: 'address',
        name: 'playerA',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'playerB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'enum TicTacToe.Winners',
        name: 'winner',
        type: 'uint8',
      },
      {
        internalType: 'enum TicTacToe.Players',
        name: 'playerTurn',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract RatingSystem',
        name: 'system',
        type: 'address',
      },
    ],
    name: 'updateRatingSystem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'playerA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'playerB',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
        ],
        internalType: 'struct GameLibrary.Match',
        name: 'm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct GameLibrary.Sig',
        name: 'pAsig',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct GameLibrary.Sig',
        name: 'pBsig',
        type: 'tuple',
      },
    ],
    name: 'newGame',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_xCoordinate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_yCoordinate',
        type: 'uint256',
      },
    ],
    name: 'makeMove',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32',
      },
    ],
    name: 'getGameBoard',
    outputs: [
      {
        internalType: 'enum TicTacToe.Players[3][3]',
        name: 'board',
        type: 'uint8[3][3]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
] as ContractInterface
