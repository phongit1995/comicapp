import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
    error: '',
}

const VersionSlice = createSlice({
    name: 'versionslice',
    initialState,
    reducers: {
        "checkversion": (state, action) => {
            state.loading = action.payload
        }
    },
})

const { reducer, actions } = VersionSlice;
export const { checkversion } = actions
export default reducer