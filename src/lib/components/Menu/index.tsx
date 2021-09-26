import React from 'react';
import './Menu.css'

type MenuProps = {
    hasGame: boolean,
    setHasGame: (val: boolean) => void
}

const Menu: React.FC<MenuProps> = ({ hasGame, setHasGame }) => {
    if (hasGame) return null

    const onClick = () => setHasGame(!hasGame)

    return (
        <div>
            <h5 className="formLabel">New Game</h5>
            <form className="form">
                <label htmlFor="playerASig">Player A Signature</label>
                <input type="text" id="playerASig" />

                <label htmlFor="playerBSig">Player B Signature</label>
                <input type="text" id="playerBSig" />

                <button type="button" onClick={onClick}>Submit</button>
            </form>

            <h5 className="formLabel">Connect by GameId</h5>
            <form className="form">
                <label htmlFor="gameId">Game Id </label>
                <input type="text" id="gameId" />

                <button type="button" onClick={onClick}>Submit</button>
            </form>
        </div>
    )
}

export default Menu;