import { createSlice } from '@reduxjs/toolkit'
import { fetchListComic } from '../api/ListComic'
const initialState = {
    loading: true,
    error: '',
    data: {}
}

const ListComicSlice = createSlice({
    name: 'listComic',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchListComic.pending]: (state, action) => {
            state.loading = true;
            state.data = action.payload;
        },
        [fetchListComic.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        },
        [fetchListComic.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        
    }
})

const { reducer: userReducer } = ListComicSlice;
export default userReducer