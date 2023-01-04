import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notes: [
        {
            content: 'reducer defines how redux store works',
            important: true,
            id: 1,
        },
        {
            content: 'state of store can contain any data',
            important: false,
            id: 2,
        },
    ],
    filter: 'IMPORTANT'
}
const generateId = () => {
    return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId()
            })
        }
    },
    toggleImportanceOf(state, action) {
        const id = action.payload
        const noteToChange = state.find(n => n.id === id)
        const changedNote = {
            ...noteToChange,
            important: !noteToChange.important
        }
        return state.map(note => note.id !== id ? note : changedNote)
    }
})
const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.data]
        case 'TOGGLE_IMPORTANCE': {
            const id = action.data.id
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        }
        default:
            return state
    }
}

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer