import { GameBoard } from '../../../lib/types'
import Cell from './Cell'

export const defBoard: GameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

const Board: React.FC<{ board?: GameBoard }> = ({ board }) => {
  if (!board) return null

  return (
    <Board>
      {board.map((row, rowIndex) =>
        row.map((value, cellIndex) => (
          <Cell key={`${rowIndex}${cellIndex}`} value={value} />
        ))
      )}
    </Board>
  )
}

export default Board
