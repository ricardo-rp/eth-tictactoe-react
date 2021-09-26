import { CellValue } from '../../types'
import './Cell.css'

const Cell: React.FC<{ value: CellValue }> = ({ value }) => {
    const className = `cell ${!value && 'empty'}`

    return <div className={className}>{value}</div>
}

export default Cell