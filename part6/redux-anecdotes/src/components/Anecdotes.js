import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

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
const Anecdotes = (props) => {
    const anecdotes = props.anecdotes.filter(n => n.content.toUpperCase().includes(props.filterString.toUpperCase()))

    const handleVote = async (anecdote) => {
        props.addVote(anecdote)
        props.setNotification(`You voted ${anecdote.content}`, 5000)
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
const mapStateToProps = (state) => {
    return { filterString: state.filterString, anecdotes: state.anecdotes }
}
const mapDispatchToProps = {
    addVote,
    setNotification
}
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes