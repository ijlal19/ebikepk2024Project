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


export {
    getShopMainCategory
}