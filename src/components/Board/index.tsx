import Cell, { CellValue } from '../Cell';
import './Board.css'

type Row = [CellValue, CellValue, CellValue];
type GameBoard = [Row, Row, Row];

const board: GameBoard = [
    ['', 'x', 'x'],
    ['o', '', 'o'],
    ['x', '', 'o']
];

const components: React.FC = () => {

    return (
        <div className="board">
            {board.map(row => row.map(value => <Cell value={value} />))}
        </div>)
}

export default components;