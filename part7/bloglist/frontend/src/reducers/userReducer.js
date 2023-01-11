import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import loginService from '../services/loginService'

const initialState = {
    user: {
        username: '',
        password: '',
        token: '',
        name: '',

    }
}

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setItem(state, action) {
            return action.payload
        },
        clearItem(state, action) {
            return initialState
        }
    }
})
export const { setItem, clearItem } = userSlicer.actions

export const login = (content) => {
    return async dispatch => {
        const user = await loginService.login({ username: content.username, password: content.password })
        dispatch(setItem(user))
        window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
    }
}
export const logout = (content) => {
    return async dispatch => {
        dispatch(clearItem(content))
    }
}
export const restoreSession = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
        const obj = JSON.parse(loggedUserJSON)
        if (obj) {
            const user = dispatch(setItem(JSON.parse(loggedUserJSON)))
            blogService.setToken(user.token)
        }
    }
}
export default userSlicer.reducer