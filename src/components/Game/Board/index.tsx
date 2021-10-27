import { useEffect } from 'react'
import { useGameContext } from '../../../lib/context/gameContext'
import { Cell } from './Cell'
import { StyledBoard } from './styles'

// export const defBoard: GameBoard = [
//   ['x', '', ''],
//   ['', 'o', ''],
//   ['', '', 'x'],
// ]

export function Board(): JSX.Element | null {
  const { contract, gameId, board, updateMove } = useGameContext()

  useEffect(() => {
    if (contract == null) return
    if (gameId === '') return
    const filter = contract.filters.PlayerMadeMove(gameId)
    contract.on(filter, updateMove)
    return () => {
      contract.off(filter, updateMove)
    }
  }, [contract, gameId, updateMove])

  if (!gameId) return null

  return (
    <>
      <label htmlFor="gameId">{gameId}</label>
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
    </>
  )
}
