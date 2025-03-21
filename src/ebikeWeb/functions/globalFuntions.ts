import data from '@/ebikeWeb/pageLayouts/bike-brands/data';
import Gconfig from 'globalconfig'
// import jsCookie from 'js-cookie'
const jsCookie = require('js-cookie');

function capitalizeFirstWord(str:any) {
    return str?.replace(/^\w/, (c:any) => c.toUpperCase());
}

const numericOnly = (value: string) => {
    if (value == 'e') return false;
    return /^[0-9]*$/gm.test(value);
};
const alphabetOnly = (value: string) => {
    if (value.length == 1 && /\s/.test(value) == true) return false;
    return /^[a-zA-Z\s]*$/gm.test(value);
};
const alphaNumeric = (value: string) => {
    // only hash, dot and dash allowed
    if (value.length == 1 && (/\s/).test(value) == true) { return "" }
    return value.replace(/[^a-zA-Z0-9\s#/.-]/g, "")
}
const validateEmail = (email: string) => {
    return (/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/).test(email);
}
const validateMobileNumber = (number: string) => {
    return number.length >= 11 && number.length <= 12;
}
const validateZipCode = (zip: string) => {
    return zip.length == 5;
}
const noSpecialCharacters = (value: string) => {
    return value.replace(/[^a-zA-Z0-9]/g, "")
}
const noSpecialCharactersButSpace = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s]/g, "")
}
const noSpecialCharactersExceptDotUderscore = (str: string) => {
    return str.replace(/[^a-zA-Z0-9._]/g, "")
}
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

function userLogin(data: any) {
    return fetch(Gconfig.ebikeApi + `user/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}

function userSignup(data: any) {
    return fetch(Gconfig.ebikeApi + `user/createUser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
    })
}

function verifyUserFromAuthenticationEmail(email: any, token: any) {
    return fetch(Gconfig.ebikeApi + `user/verification/${email}/${token}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json()).then(data => {
        return data
    })
}

function isLoginUser() {
    let obj = jsCookie.get('userInfo_e')
    if (obj) {
        return { login: true, info: JSON.parse(obj) }
    }
    else {
        return { login: false, info: null }
    }
}

function publishAd(data: any) {
    let token = jsCookie.get('accessToken_e')
    return fetch(Gconfig.ebikeApi + `classified/crete-add`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "x-access-token": token },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        return data
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
function priceWithCommas(x: any) {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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


function getSingleDealerDetails(id:any) {
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

function getSimilarDealers(id:any) {
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
        body:JSON.stringify({ payload: 8 })
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


function getSingleMechanicsDetails(id:any) {
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

function getSimilarMechanics(id:any) {
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
                body: JSON.stringify({"type": "CLASSIFIED_AD_FEATURED"})
            })
            .then(response => response.json()).then(data => {
                return data
            })
            .catch((err) => {
                console.log(err) 
            })
    }

    function getMyAds(uid:any) {
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

    function MarkBikeAsSold(id:any, data:any) {
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
    

    function sendEmailLetter(data:any) {
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

export {
    getPostcomment,getPostBlogcomment,getAllBlogComment,
     getSingleBlogData, createmechanic, createdealer,
    numericOnly, alphabetOnly, alphaNumeric, validateEmail, validateMobileNumber, validateZipCode,
    noSpecialCharacters, noSpecialCharactersButSpace, noSpecialCharactersExceptDotUderscore,
    getAllbikesDetail, getSinglebikesDetail, getBrandFromId, getCityFromId, getYearFromId, getFilteredAllbikesDetail,
    getbrandData, getnewBikeData, getdealerData, getnewBikedetailsData, userLogin, userSignup, verifyUserFromAuthenticationEmail,
    isLoginUser, publishAd, uplaodImageFunc, getBikesBySpecificFilter, getAllBlog, priceWithCommas, getAllDealer, getFeaturedDealer,
    getSingleDealerDetails, getSimilarDealers, getFeaturedMechanics, getAllMechanics, getSingleMechanicsDetails, getSimilarMechanics,
    getAllFeaturedBike, capitalizeFirstWord, getMyAds, MarkBikeAsSold, sendEmailLetter
}