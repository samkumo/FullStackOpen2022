import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log(action.payload);
            return action.payload
        }
    }
})
export const { setNotification } = notificationSlicer.actions
export default notificationSlicer.reducer
