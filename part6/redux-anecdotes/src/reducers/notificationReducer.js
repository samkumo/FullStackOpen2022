import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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
        dispatch(setNotificationText(text))
        await setTimeout(() => {
            dispatch(clearNotificationText())
        }, timeout)
    }
}

export default notificationSlicer.reducer
