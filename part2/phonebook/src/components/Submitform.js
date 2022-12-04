const SubmitForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addName}>
                <div>
                    name:
                    <input
                        value={props.newName}
                        onChange={props.handleNameChange}
                    ></input>
                </div>
                <div>
                    number:
                    <input
                        value={props.newNumber}
                        onChange={props.handleNumberChange}
                    ></input>
                </div>
                <div>
                    <button type="submit" onSubmit={props.addName}>
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SubmitForm