import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    generalLoading: true,
    loading: false,
    error: null
}

const generalSlice = createSlice({
    name: 'general',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.loading = true
        },
        finishLoading(state) {
            state.loading = false
        },
        setError(state, action) {
            state.error = action.payload;
        },
        removeError(state) {
            state.error = null;
        },
        setGeneralLoading(state, action) {
            state.generalLoading = action.payload
        }
    }
})

export const { startLoading, finishLoading, setError, removeError, setGeneralLoading } = generalSlice.actions
export default generalSlice.reducer