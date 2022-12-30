import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVis = () => {
        setVisible(!visible)
    }
    useImperativeHandle(refs, () => {
        return { toggleVis }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVis}>{props.buttonLabel1}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVis}>{props.buttonLabel2}</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel1: PropTypes.string.isRequired,
    buttonLabel2: PropTypes.string.isRequired,
}

export default Togglable