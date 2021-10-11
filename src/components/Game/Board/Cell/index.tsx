import { CellValue } from '../../../../lib/types'
import { StyledCell } from './styles'

export type CellProps = { value: CellValue }
export function Cell({ value }: CellProps): React.ReactElement {
  return <StyledCell value={value}>{value}</StyledCell>
}
