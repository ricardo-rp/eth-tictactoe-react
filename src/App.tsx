import './App.css'
import { Game } from './components/Game'

/* TODO Change this patter to use layouts. Similar to this nextjs pattern:
* https://www.youtube.com/watch?v=WOeLxL2DF3E&t=4s
* https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
*/

import { GlobalStyle } from "./styles/global"

const App: React.FC = () => (
  <div className="App">
    <GlobalStyle />
    <header className="App-header">
      Eth tic-tac-toe
    </header>

    <Game />
  </div>
)

export default App
