export const TTT_ADDRESS = '0x79386510ECC86f2b1e542aF503A66190b7DEc449'

export const TTT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "gameId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "GameCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "gameId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "enum TicTacToe.Winners",
                "name": "winner",
                "type": "uint8"
            }
        ],
        "name": "GameOver",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "gameId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "playerNumber",
                "type": "uint8"
            }
        ],
        "name": "PlayerJoinedGame",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "gameId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "xCoordinate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "yCoordinate",
                "type": "uint256"
            }
        ],
        "name": "PlayerMadeMove",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "_system",
        "outputs": [
            {
                "internalType": "contract RatingSystem",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract RatingSystem",
                "name": "system",
                "type": "address"
            }
        ],
        "name": "updateRatingSystem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addr",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nonce",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct GameLibrary.Player",
                        "name": "playerA",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addr",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nonce",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct GameLibrary.Player",
                        "name": "playerB",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GameLibrary.Match",
                "name": "m",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct GameLibrary.Sig",
                "name": "pAsig",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct GameLibrary.Sig",
                "name": "pBsig",
                "type": "tuple"
            }
        ],
        "name": "newGame",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "gameId",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addr",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nonce",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct GameLibrary.Player",
                        "name": "playerA",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addr",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nonce",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct GameLibrary.Player",
                        "name": "playerB",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GameLibrary.Match",
                "name": "m",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_gameId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_xCoordinate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_yCoordinate",
                "type": "uint256"
            }
        ],
        "name": "makeMove",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
