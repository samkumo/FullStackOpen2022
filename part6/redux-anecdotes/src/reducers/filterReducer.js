import { createSlice } from '@reduxjs/toolkit'

const filterSlicer = createSlice({
    name: 'filterString',
    initialState: String(''),
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})
export const { setFilter } = filterSlicer.actions
export default filterSlicer.reducer