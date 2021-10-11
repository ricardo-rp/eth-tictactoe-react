import { CellValue } from '../../../../lib/types'
import { StyledCell } from './styles'

export type CellProps = { value: CellValue }
const Cell: React.FC<CellProps> = ({ value }) => {
  return <StyledCell value={value}>{value}</StyledCell>
}

export default Cell
