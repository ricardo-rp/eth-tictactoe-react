import { GameBoard } from '../../../lib/types'
import { Cell } from './Cell'
import { StyledBoard } from './styles'

export const defBoard: GameBoard = [
  ['x', '', ''],
  ['', 'o', ''],
  ['', '', 'x'],
]

type BoardProps = { board?: GameBoard }
export function Board({ board = defBoard }: BoardProps): JSX.Element | null {
  if (!board) return null

  return (
    <StyledBoard>
      {board.map((row, rowIndex) =>
        row.map((value, cellIndex) => (
          <Cell key={`${rowIndex}${cellIndex}`} value={value} />
        ))
      )}
    </StyledBoard>
  )
}
