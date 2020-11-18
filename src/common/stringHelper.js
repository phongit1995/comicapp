export const formatViews = (views)=>{
    return views.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}
