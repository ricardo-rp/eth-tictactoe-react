import React from 'react';
import './Menu.css'

type MenuProps = {
    hasGame: boolean,
    setHasGame: (val: boolean) => void
}

const Menu: React.FC<MenuProps> = ({ hasGame, setHasGame }) => {
    if (hasGame) return null

    const onClick = () => setHasGame(!hasGame)

    const signature = 'asdf'

    return (
        <div>
            <h5 className="formLabel">New Game</h5>
            <form className="form">
                <label>Player A Signature</label>
                <input value={signature} style={{ display: 'none' }} />
                <span
                    style={{
                        fontSize: 16,
                        color: 'lightblue',
                        border: '1px solid lightblue',
                        borderRadius: '2px'
                    }}
                >
                    {signature}
                </span>

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