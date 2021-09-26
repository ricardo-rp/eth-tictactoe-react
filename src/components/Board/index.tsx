import Cell, { CellValue } from '../Cell';
import './style.css'

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
            {board.map(row => {
                return row.map(value => {
                    return <Cell value={value} />
                })
            })}
        </div>)
}

export default components;