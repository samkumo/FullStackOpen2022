const Filter = (props) => {
    return (
        <form onSubmit={props.filterNames}>
            <div>
                filter shown with
                <input value={props.filter} onChange={props.handleFilterChange}></input>
            </div>
        </form>
    )
}
export default Filter