const { configureStore } = require("@reduxjs/toolkit");

import PlayListComicReducer from '../ReduxSlice/PlayListComicSlice'

import DetailComicSlice from '../ReduxSlice/DetailComicSlice'
const rootReducer = {
    playListComic: PlayListComicReducer,
    DetailComic: DetailComicSlice,
}
const store = configureStore({
    reducer: rootReducer
})
export default store;