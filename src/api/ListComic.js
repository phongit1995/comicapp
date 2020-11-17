import axios from './axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const fetchListComic = createAsyncThunk(
    'listComic/fetchlistComic',
    async (params, thunkAPI) => {
        const response = await axios.post('/manga/get-list', {
            "page": params.page,
            "numberItem": params.numberItem,
            "type": params.type
        })
        return response.data
    }
)
