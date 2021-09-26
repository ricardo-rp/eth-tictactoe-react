import './style.css'

export type CellValue = '' | 'x' | 'o'

const Cell: React.FC<{ value: CellValue }> = ({ value }) => {
    const className = `cell ${!value && 'empty'}`

    return <div className={className}>{value}</div>
}

export default Cell