import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timer = null

const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationText(state, action) {
            return action.payload
        },
        clearNotificationText(state, action) {
            const clearState = ''
            return clearState
        }
    }
})
export const { setNotificationText, clearNotificationText } = notificationSlicer.actions
export const setNotification = (text, timeout) => {
    return async dispatch => {
        if (timer) {
            clearTimeout(timer)
        }
        dispatch(setNotificationText(text))
        timer = setTimeout(() => {
            dispatch(clearNotificationText())
        }, timeout)
    }
}

export default notificationSlicer.reducer
