import { GameBoard } from '../../lib/types'
import Cell from './Cell'
import './Board.css'

export const defBoard: GameBoard = [
    ['', '', '',],
    ['', '', '',],
    ['', '', '',],
]

const Board: React.FC<{ board?: GameBoard }> = ({ board  }) => {
    if (!board) return null

    return (
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((value, cellIndex) =>
                    <Cell key={`${rowIndex}${cellIndex}`} value={value} />
                )
            )}
        </div>
    )
}

export default Board