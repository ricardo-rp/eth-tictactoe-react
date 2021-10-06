export const ConnectMenu: React.FC = () => {

  return <>
    <h5 className="formLabel">Connect by GameId</h5>
    <form className="form">
      <label htmlFor="gameId">Game Id </label>
      <input type="text" id="gameId" />

      <button type="button" >Submit</button>
    </form>
  </>
}