import axios from './axios';
export const getListHotCommic = (page = 1, numberItem = 10) => {
    return axios.post('/manga/get-list', {
        page: page,
        numberItem: numberItem,
        type: 0
    })
}
export const getListCommicNew = (page = 1, numberItem = 10) => {
    return axios.post('/manga/get-list', {
        page: page,
        numberItem: numberItem,
        type: 1
    })
}
export const getListComicByType = (page = 1, numberItem = 0, type = 0) => {
    return axios.post('/manga/get-list', {
        page: page,
        numberItem: numberItem,
        type: type
    })
}
export const getDetialComic = (id) => {
    return axios.post("/manga/detial-manga", {
        manga_id: id
    })
}
export const getListByCategorySortViews = (page = 1, numberItem = 12, category) => {
    return axios.post("/manga/get-list-category", {
        page: page,
        numberItem: numberItem,
        type: 0,
        category: category
    })
}
export const searchComicByName = (page = 1, numberItem = 10, name) => {
    return axios.post("/manga/search-manga", {
        page: page,
        numberItem: numberItem,
        name: name
    })
}

export const getListChapter = (id) => {
    return axios.post("/chapter/list-chapter", {
        manga_id: id
    })
}