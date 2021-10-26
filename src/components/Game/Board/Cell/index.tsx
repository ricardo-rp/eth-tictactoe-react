import { useGameContext } from '../../../../lib/context/gameContext'
import { CellValue } from '../../../../lib/types'
import { StyledCell } from './styles'

export type CellProps = {
  x: number
  y: number
  value: CellValue
}

export type StyleProps = {
  value: CellValue
}
export function Cell({ x, y, value }: CellProps): React.ReactElement {
  const { canMakeMove, makeMove } = useGameContext()

  function tryMakeMove() {
    makeMove(x, y)
  }
  if (value === '' && canMakeMove()) {
    return (
      <StyledCell value={value} onClick={tryMakeMove}>
        {value}
      </StyledCell>
    )
  } else {
    return <StyledCell value={value}>{value}</StyledCell>
  }
}
