import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>Vote</button>
            </div>
        </div>
    )
}
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const handleVote = async (anecdote) => {
        dispatch(addVote(anecdote.id))
        await dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000);
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => handleVote(anecdote)} >
                </Anecdote>)
            }
        </div >
    )
}
export default Anecdotes