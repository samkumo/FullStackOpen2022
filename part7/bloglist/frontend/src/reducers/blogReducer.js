import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlicer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setItem(state, action) {
            const newState = state.map(n => n.id !== action.payload.id ? n : action.payload)
            return newState
        },
        setItems(state, action) {
            return action.payload
        },
        appendItem(state, action) {
            state.push(action.payload)
        },
        deleteItem(state, action) {
            const newState = state.filter(n => n.id !== action.payload.id)
            return newState
        }
    }
})
export const { setItem, setItems, appendItem, deleteItem } = blogSlicer.actions
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setItems(blogs))
    }
}
export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendItem(newBlog))
    }
}
export const updateBlog = content => {
    return async dispatch => {
        const updatedBlog = await blogService.update(content.id, content)
        dispatch(setItem(updatedBlog))
    }
}
export const deleteBlog = content => {
    return async dispatch => {
        await blogService.deleteB(content.id)
        dispatch(deleteItem(content))
    }
}
export const likeBlog = content => {
    return async dispatch => {
        const updatedBlog = await blogService.addLike(content.id, content)
        dispatch(setItem(updatedBlog))
    }
}
export default blogSlicer.reducer