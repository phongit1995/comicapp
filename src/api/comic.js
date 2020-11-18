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