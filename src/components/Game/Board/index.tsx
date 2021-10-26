import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import {
  PlayerMadeMoveEvent,
  useGameContext,
} from '../../../lib/context/gameContext'
import { getContractInstance } from '../../../lib/contract/abi'
// import { GameBoard } from '../../../lib/types'
import { Cell } from './Cell'
import { StyledBoard } from './styles'

// export const defBoard: GameBoard = [
//   ['x', '', ''],
//   ['', 'o', ''],
//   ['', '', 'x'],
// ]

interface EventResult {
  event: string
  signature: string | null
  returnValues: PlayerMadeMoveEvent
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  raw: { data: string; topics: string[] }
}

export function Board(): JSX.Element | null {
  const { gameId, board, updateMove } = useGameContext()
  const { chainId } = useWeb3React()

  useEffect(() => {
    getContractInstance(chainId)
      .events.PlayerMadeMove({
        filter: {
          gameId: gameId,
        },
      })
      .on('data', function (event: EventResult) {
        updateMove(event.returnValues)
        console.log() // same results as the optional callback above
      })
  })

  if (!gameId) return null

  return (
    <StyledBoard>
      {board.map((row, rowIndex) =>
        row.map((value, cellIndex) => (
          <Cell
            key={`${rowIndex}${cellIndex}`}
            value={value}
            x={rowIndex}
            y={cellIndex}
          />
        ))
      )}
    </StyledBoard>
  )
}
