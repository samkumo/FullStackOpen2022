import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'></input><br />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
export default NewAnecdote