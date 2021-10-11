import { GlobalStyle } from '../styles/global'
import { Game } from '../components/Game'

import { Container, Header } from './styles'

export function App(): React.ReactElement {
  return (
    <Container>
      <GlobalStyle />
      <Header>Eth tic-tac-toe</Header>

      <Game />
    </Container>
  )
}
