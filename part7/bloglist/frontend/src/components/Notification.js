const Notification = (props) => {
    if (props.message === null) {
        return null
    }
    if (props.type === 'success') {
        return (
            <div className='success'>
                {props.message}
            </div>
        )
    } else if (props.type === 'error') {
        return (
            <div className='error'>
                {props.message}
            </div>
        )
    }

}

export default Notification