import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        type,
        value,
        onChange
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
