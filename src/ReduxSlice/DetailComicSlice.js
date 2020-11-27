import { createSlice } from '@reduxjs/toolkit'
import { getDetialComic } from '../api/comic'

const initialState = {
    loading: true,
    error: '',
    data: {}
};

const DetailComic = createSlice({
    name: 'DetailComic',
    initialState,
    reducers: {},
    extraReducers: {
        [getDetialComic.pending]: (state, action) => {
            state.loading = true;
            state.data = action.payload;
        },
        [getDetialComic.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        },
        [getDetialComic.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    }
})


const { reducer: userReducer }  = DetailComic
export default userReducer