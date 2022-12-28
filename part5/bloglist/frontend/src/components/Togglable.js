import { useState, forwardRef, useImperativeHandle } from 'react'


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
                <button onClick={toggleVis}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVis}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable