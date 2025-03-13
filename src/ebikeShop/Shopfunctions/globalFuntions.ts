import Gconfig from "globalconfig";

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

function getShopMainCategory() {
    return fetch(Gconfig.ebikeApi + `shop/get-main-catagory-data`, {
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


export {
    isLoginUser,
    getShopMainCategory
}