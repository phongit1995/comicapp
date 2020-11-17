const { configureStore } = require("@reduxjs/toolkit");

import PlayListComicReducer from '../ReduxSlice/PlayListComicSlice'

const rootReducer = {
    playListComic: PlayListComicReducer
}
const store = configureStore({
    reducer: rootReducer
})
export default store;