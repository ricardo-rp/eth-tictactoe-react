export const ConnectByIdForm: React.FC = () => {
  // TODO: Install unform/formik to handle form data and onSubmit function

  return (
    <form className="form">
      <label htmlFor="gameId">Game Id </label>
      <input type="text" id="gameId" />

      <button type="button">Submit</button>
    </form>
  )
}
