import { GlobalStyle } from "../styles/global"
import { Game } from '../components/Game'

import { Container, Header } from './styles'

export const App: React.FC = () => (
  <Container>
    <GlobalStyle />
    <Header>Eth tic-tac-toe</Header>

    <Game />
  </Container>
)

