import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

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
    const filter = useSelector(state => state.filterString).toUpperCase()
    const anecdotes = useSelector(state => state.anecdotes).filter(n => n.content.toUpperCase().includes(filter))

    const handleVote = async (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted ${anecdote.content}`, 5000))
        /*         dispatch(setNotification(`You voted '${anecdote.content}'`))
                setTimeout(() => {
                    dispatch(setNotification(''))
                }, 5000); */
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter></Filter>
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