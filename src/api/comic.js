import axios from './axios';
export const getListHotCommic =(page=1,numberItem=10)=>{
    return axios.post('/manga/get-list',{
        page: page,
        numberItem: numberItem,
        type: 0
    })
}
export const getListCommicNew =(page=1,numberItem=10)=>{
    return axios.post('/manga/get-list',{
        page: page,
        numberItem: numberItem,
        type: 1
    })
}
export const getListComicByType=(page=1,numberItem=0,type=0)=>{
    return axios.post('/manga/get-list',{
        page: page,
        numberItem: numberItem,
        type: type
    })
}
export const getDetialComic=(id)=>{
    return axios.post("/manga/detial-manga",{
        manga_id:id
    })
}