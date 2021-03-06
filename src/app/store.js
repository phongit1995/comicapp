const { configureStore } = require("@reduxjs/toolkit");

import PlayListComicReducer from '../ReduxSlice/PlayListComicSlice'

import DetailComicSlice from '../ReduxSlice/DetailComicSlice'

import CheckVersionSlice from '../ReduxSlice/CheckVersionSlice'
const rootReducer = {
    playListComic: PlayListComicReducer,
    DetailComic: DetailComicSlice,
    CheckVersionSlice: CheckVersionSlice
}
const store = configureStore({
    reducer: rootReducer
})
export default store;