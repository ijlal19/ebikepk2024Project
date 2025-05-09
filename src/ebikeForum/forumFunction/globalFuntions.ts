import Gconfig from "globalconfig";

function getMainCategory() {
    return fetch(Gconfig.ebikeApi + `new-forum/get-new-forum-main-categ`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getSubCategory() {
    return fetch(Gconfig.ebikeApi + `new-forum/get-new-forum-sub-categ`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getSubCatgeorybyId(id:any) {
    return fetch(Gconfig.ebikeApi + `new-forum/new-forum-sub-categ-byId/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch((err) => {
        console.log(err)
    })
}

function postThread(data:any){
    return fetch( Gconfig.ebikeApi + `new-forum/crete-new-forum-thread`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then( data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

function getAllthread(){
    return fetch( Gconfig.ebikeApi + `new-forum/get-new-forum-thread`,{
        method:'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

function getthreadbyId(id:any){
    return fetch( Gconfig.ebikeApi + `new-forum/get-new-forum-thread/${id}`,{
        method:'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

function postthreadComment(data:any){
    return fetch(Gconfig.ebikeApi + `new-forum/crete-new-forum-comment`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then( data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

function ViewCountAdd(data:any){
    return fetch( Gconfig.ebikeApi + `new-forum/crete-new-forum-view-count`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then( data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

export {
    getMainCategory,
    getSubCategory,
    getSubCatgeorybyId,
    postThread,
    getAllthread,
    getthreadbyId,
    postthreadComment,
    ViewCountAdd
}