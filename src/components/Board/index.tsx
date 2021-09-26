import Cell, { CellValue } from '../Cell';

type Row = [CellValue, CellValue, CellValue];
type GameBoard = [Row, Row, Row];


const board: GameBoard = [
    ['', 'x', 'x'],
    ['x', '', 'x'],
    ['x', '', 'x']
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