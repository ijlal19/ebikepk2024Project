import Gconfig from 'globalconfig'
// import jsCookie from 'js-cookie'
const jsCookie = require('js-cookie');

function getAllNewBike() {
    return fetch(Gconfig.ebikeApi + `new-bikes/get-all-new-bikes`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

export {getAllNewBike}