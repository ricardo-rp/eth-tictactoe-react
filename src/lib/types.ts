export interface EthContextData {
  addresses: { addrA: string; addrB: string }
  board: GameBoard
}

export type CellValue = '' | 'x' | 'o'
export type Row = [CellValue, CellValue, CellValue]
export type GameBoard = [Row, Row, Row]

export type Match = {
  playerA: string
  playerB: string
  nonce: number
}

export type Sig = {
  v: string
  r: string
  s: string
}

export interface IHash {
  [details: string]: string
}
