import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : ''}</strong>
        </li>
    )
}
const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes.notes
        } else {
            return filter === 'IMPORTANT'
                ? notes.notes.filter(note => note.important)
                : notes.notes.filter(note => !note.important)
        }
    })

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch(toggleImportanceOf(note.id))}
                ></Note>
            )}
        </ul>
    )
}
export default Notes