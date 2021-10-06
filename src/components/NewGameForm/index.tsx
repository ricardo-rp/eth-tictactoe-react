type NewGameFormProps = {
    active: boolean,
    account: string,
    onSubmit: () => Promise<void>
}
const NewGameForm: React.FC<NewGameFormProps> = ({ active, account, onSubmit }) => {

    return <form className="form" id="addressForm">
        <label>Player A Address</label>
        <label>{active ? account : "Not Connected"}</label>
        <input id="addressA" value={account} style={{ display: 'none' }} /> 

        <label htmlFor="addressB">Player B Address</label>
        <input id="addressB" />

        <label htmlFor="nonce">Nonce</label>
        <input id="nonce" />

        <label htmlFor="sigA">Player A Signature</label>
        <input id="sigA" />

        <label htmlFor="sigB">Player B Signature</label>
        <input id="sigB" />

        <button type="button" onClick={onSubmit}>Submit</button>
    </form>
}

export default NewGameForm