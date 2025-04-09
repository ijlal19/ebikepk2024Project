import Gconfig from "globalconfig";

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

function getProductCompany() {
    return fetch(Gconfig.ebikeApi + `shop/get-product-company-data`, {
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


function getShopCategory(data: any) {
    return fetch(Gconfig.ebikeApi + `shop/product/get-product-by-catagory/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log('err', err)
        })
}

function getProduct(data: any) {
    return fetch(Gconfig.ebikeApi + `shop/product/get-product-by-id`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log('err', err)
        })
}

export {
    getShopMainCategory,
    getShopCategory,
    getProductCompany,
    getProduct
}