import React from 'react';
import './Menu.css'

const Menu: React.FC<{ hasGame: boolean }> = ({ hasGame }) => {
    if (hasGame) return null

    return (
        <div>
            <h5 className="formLabel">New Game</h5>
            <form className="form">
                <label htmlFor="playerASig">Player A Signature</label>
                <input type="text" id="playerASig" />
                
                <label htmlFor="playerBSig">Player B Signature</label>
                <input type="text" id="playerBSig" />

                <button type="button">Submit</button>
            </form>

            <h5 className="formLabel">Connect by GameId</h5>
            <form className="form">
                <label htmlFor="gameId">Game Id </label>
                <input type="text" id="gameId" />

                <button type="button">Submit</button>
            </form>
        </div>
    )
}

export default Menu;