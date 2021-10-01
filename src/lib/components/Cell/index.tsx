import { game } from '../../hooks/game'
import { CellValue, Coords } from '../../types'
import './Cell.css'

const Cell: React.FC<{ coords: Coords, value: string }> = ({ coords, value }) => {
    const className = `cell ${!value && 'empty'}`

    return <div className={className} onClick={() => game.makeMove(coords)}>{value}</div>
}

export default Cell