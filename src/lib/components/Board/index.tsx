import { GameBoard } from '../../types';
import Cell from '../Cell';
import './Board.css'

const Board: React.FC<{ board?: GameBoard }> = ({ board }) => {
    if (!board) return null

    return (
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((value, cellIndex) =>
                    <Cell key={`${rowIndex}${cellIndex}`} value={value} />
                )
            )}
        </div>)
}

export default Board;