import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdote(state, action) {
      const newState = state.map(n => n.id !== action.payload.id ? n : action.payload)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const addVote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(content.id, content)
    dispatch(setAnecdote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer