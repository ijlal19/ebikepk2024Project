import data from '@/ebikeWeb/pageLayouts/bike-brands/data';
import Gconfig from 'globalconfig'
// import jsCookie from 'js-cookie'
const jsCookie = require('js-cookie');

function getAllbikesDetail(page: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-adds-with-offset/${page}/12`, {
        method: 'GET',
        // headers: { 'Authorization': 'Bearer eyJBdXRob3IiOiJGYXNoaW9uUGFzcyIsImFsZyI6IkhTMjU2In0.e30.oUQGjCS2S_jycg4PZnFK4uQ81DsNFX-N1m81Dfahi6o','X-Request-For':customer_ip, 'guid': request_guid }
    }).then(response => response.json()).then(data => {
        return data
    })
}
function getbrandData() {
    return fetch(Gconfig.ebikeApi + 'brand/get-brand')
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getnewBikeData(data: any) {
    return fetch(Gconfig.ebikeApi + `new-bikes/get-new-bikes-by-brand/`, {
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
function getPostcomment(data: any) {
    return fetch(Gconfig.ebikeApi + `new-bike-comment/add-new-bike-user-comment/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function getdealerData(id: any) {
    return fetch(Gconfig.ebikeApi + `dealer/dealer-by-brand/${id}`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}
function getnewBikedetailsData(id: any) {
    return fetch(Gconfig.ebikeApi + `new-bikes/get-new-bikes-by-id-with-random-bikes/${id}`)
        .then(response => response.json())
        .then(data => {
            return [data]
        })
        .catch((err) => {
            console.log(err)
        })
}
function getFilteredAllbikesDetail(data: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-adds-by-filter`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}

function getSinglebikesDetail(id: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-classified-by-id-with-random-adds/${id}`, {
        method: 'GET',
        // headers: { 'Authorization': 'Bearer eyJBdXRob3IiOiJGYXNoaW9uUGFzcyIsImFsZyI6IkhTMjU2In0.e30.oUQGjCS2S_jycg4PZnFK4uQ81DsNFX-N1m81Dfahi6o','X-Request-For':customer_ip, 'guid': request_guid }
    }).then(response => response.json()).then(data => {
        return data
    })
}
function getBrandFromId(id: any, dataArr: any) {
    if (dataArr && dataArr.length > 0 && id) {
        let brand = dataArr.filter((val: any) => { return (val.id == id) })
        return brand;
    }
    else return []
}
function getCityFromId(id: any, dataArr: any) {
    if (dataArr && dataArr.length > 0 && id) {
        let city = dataArr.filter((val: any) => { return (val.id == id) })
        return city;
    }
    else return []
}
function getYearFromId(id: any, dataArr: any) {
    if (dataArr && dataArr.length > 0 && id) {
        let year = dataArr.filter((val: any) => { return (val.id == id) })
        return year;
    }
    else return []
}

function getSingleBlogData(id: any) {
    return fetch(Gconfig.ebikeApi + `blog/get-blog-by-id/${id}`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getAllBlog() {
    return fetch(Gconfig.ebikeApi + `blog/get-all-blog`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function createmechanic(data: any) {
    let token = jsCookie.get('accessToken_e')
    return fetch(Gconfig.ebikeApi + `dealers/crete-dealer`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "x-access-token": token },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}
function createdealer(data: any) {
    let token = jsCookie.get('accessToken_e')
    return fetch(Gconfig.ebikeApi + `dealers/crete-dealer`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "x-access-token": token },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}
function uplaodImageFunc(data: any) {
    return fetch(`https://api.cloudinary.com/v1_1/dulfy2uxn/image/upload`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}
function getBikesBySpecificFilter(from: any, id: any, getAdFrom: any) {
    // /get-adds-by-brand-offset
    if (from == 'city') {
        return fetch(Gconfig.ebikeApi + `classified/get-adds-by-city-offset/${id}/${getAdFrom}/12`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => {
            return data
        })
    }
    else if (from == "cc") {
        return fetch(Gconfig.ebikeApi + `classified/get-adds-by-cc-offset/${id}/${getAdFrom}/12`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => {
            return data
        })
    }
    else if (from == "year") {
        return fetch(Gconfig.ebikeApi + `classified/get-adds-by-year-offset/${id}/${getAdFrom}/12`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => {
            return data
        })
    }
    else if (from == "brand") {
        return fetch(Gconfig.ebikeApi + `classified/get-adds-by-brand-offset/${id}/${getAdFrom}/12`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => {
            return data
        })
    }
}




function getFeaturedDealer() {
    return fetch(Gconfig.ebikeApi + `dealers/get-featured-dealer`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}



function getAllDealer() {
    return fetch(Gconfig.ebikeApi + `dealers/get-dealer`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function getSingleDealerDetails(id: any) {
    return fetch(Gconfig.ebikeApi + `dealer/get-dealer-by-id/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getSimilarDealers(id: any) {
    return fetch(Gconfig.ebikeApi + `dealer/dealer-by-brand/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

// -----------------

function getFeaturedMechanics() {
    return fetch(Gconfig.ebikeApi + `mechanic/get-featured-mechanic`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: 8 })
    })
        .then(response => response.json()).then(data => {
            console.log('data', data)
            return data
        })
        .catch((err) => {
            return { success: false }
        })
}



function getAllMechanics() {
    return fetch(Gconfig.ebikeApi + `mechanic/get-mechanic`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function getSingleMechanicsDetails(id: any) {
    return fetch(Gconfig.ebikeApi + `mechanic/get-mechanic-by-id/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getSimilarMechanics(id: any) {
    return fetch(Gconfig.ebikeApi + `dealer/dealer-by-brand/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getPostBlogcomment(data: any) {
    return fetch(Gconfig.ebikeApi + `blog-comments/add-blog-comments/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function getAllBlogComment() {
    return fetch(Gconfig.ebikeApi + `news/pakistani-startup-introduces-electric-vehicle-scooter/646`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function getAllFeaturedBike() {
    return fetch(Gconfig.ebikeApi + `classified/get-featured-ads`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "type": "CLASSIFIED_AD_FEATURED" })
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getMyAds(uid: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-user-adds/${uid}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({"type": "CLASSIFIED_AD_FEATURED"})
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            return { success: false }
        })
}

function MarkBikeAsSold(id: any, data: any) {
    return fetch(Gconfig.ebikeApi + `classified/sold-used-bike/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function sendEmailLetter(data: any) {
    return fetch(Gconfig.ebikeApi + `news-letter/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getdatabycitybrand(brandId: any, cityId: any, limit: any) {
    return fetch(`http://localhost:4001/api/classified/get-bike-data-by-city-brand/${brandId}/${cityId}/5/${limit}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json()).then(data => {
        return data
    })
        .catch((err) => {
            console.log("error", err)
        })
}

function getDealerByFilter(data: any) {
    return fetch(Gconfig.ebikeApi + `dealers/get-dealer-by-filter`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((err) => {
        return err
    });
}

function getMechanicByBrandId(idArr :any) {
    return fetch(Gconfig.ebikeApi + `mechanic/get-mechanic-by-filter`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_filter: idArr, city_filter: []  })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((err) => {
        return err
    });
}



export {
    getPostcomment,
    getPostBlogcomment,
    getAllBlogComment,
    getSingleBlogData,
    createmechanic,
    createdealer,
    getAllbikesDetail,
    getSinglebikesDetail,
    getBrandFromId,
    getCityFromId,
    getYearFromId,
    getFilteredAllbikesDetail,
    getbrandData,
    getnewBikeData,
    getdealerData,
    getnewBikedetailsData,
    uplaodImageFunc,
    getBikesBySpecificFilter,
    getAllBlog,
    getAllDealer,
    getFeaturedDealer,
    getSingleDealerDetails,
    getSimilarDealers,
    getFeaturedMechanics,
    getAllMechanics,
    getSingleMechanicsDetails,
    getSimilarMechanics,
    getAllFeaturedBike,
    getMyAds,
    MarkBikeAsSold,
    sendEmailLetter
    , getdatabycitybrand,
    getDealerByFilter,
    getMechanicByBrandId
}