const jsCookie = require('js-cookie');

function isLoginUser() {
    let obj = jsCookie.get('userInfo_e')
    if (obj) {
        return { login: true, info: JSON.parse(obj) }
    }
    else {
        return { login: false, info: null }
    }
}

function getMainCategory() {
    return fetch(`localhost:3005`, {
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

function getmainCatgeorybyId(id:any) {
    return fetch(`localhost:3005/${id}`, {
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
    return fetch(`localhost:3005`, {
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
    return fetch(`localhost:3005/${id}`, {
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
    return fetch(`localhost:3005`,{
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
    return fetch(`localhost:3005`,{
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
    return fetch(`localhost:3005/${id}`,{
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
    return fetch(`localhost:3005`,{
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

function getAllthreadComment(){
    return fetch(`localhost:3005`,{
        method:'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

function getthreadCommentbyId(id:any){
    return fetch(`localhost:3005/${id}`,{
        method:'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {return data})
    .catch((err) => {
        console.log(err)
    })
}

export {
    isLoginUser,
    getMainCategory,
    getmainCatgeorybyId,
    getSubCategory,
    getSubCatgeorybyId,
    postThread,
    getAllthread,
    getthreadbyId,
    postthreadComment,
    getAllthreadComment,
    getthreadCommentbyId,

}