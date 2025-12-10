import Gconfig from 'globalconfig'
const jsCookie = require('js-cookie');
const Port = 'http://localhost:4000/api/'
function PostLogin(data: any) {
    return fetch(Gconfig.ebikeApi + `user-role/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
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

const checkAuthAndRedirect = (router: any, pathname: any) => {
    const userCookie = jsCookie.get("userData_ebike_panel");

    if (userCookie) {
        const userData = JSON.parse(userCookie);
        const token = userData?.accessToken;
        if (token) {
            if (pathname == '/ebike-panel' || pathname == '/ebike-panel/login') {
                router.replace("/ebike-panel/dashboard");
            }
        }
        else {
            router.replace("/ebike-panel/login");
        }
    } else {
        router.replace("/ebike-panel/login");
    }
};

const GetUserDetail = () => {
    const userCookie = jsCookie.get("userData_ebike_panel");
    if (userCookie) {
        const userData = JSON.parse(userCookie);
        return userData
    }
}

/////////////////////////////////////// NEW BIKE FUNCTIONS ///////////////////////////////////////////////////
function addNewBike(data: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-bikes/add-new-bike`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function getAllNewBike() {
    return fetch(Gconfig.ebikeApi + `new-bikes/get-all-new-bikes`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function UpdateNewBikeById(id: any, payload: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-bikes/update-new-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
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

function DeleteNewBikeById(id: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-bikes/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// USED BIKE FUNCTIONS //////////////////////////////////////////////
function getCustomBikeAd(obj: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-custom-ads`, {
        // return fetch(`http://localhostj:4001/api/classified/get-custom-ads`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    }).then(response => response.json()).then(data => {
        return data
    })
        .catch((err) => {
            return err
        })
}

function DeleteUsedBikeById(id: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    let resStatus = -1

    return fetch(Gconfig.ebikeApi + `classified/delete-classified/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => {
            resStatus = response.status
            response.json()
        })
        .then(data => {
            if (resStatus == 204) {
                return { success: true }
            }
            else {
                return { success: false }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function getSinglebikesDetail(id: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-classified-by-id-with-random-adds/${id}`, {
        method: 'GET',
        // headers: { 'Authorization': 'Bearer eyJBdXRob3IiOiJGYXNoaW9uUGFzcyIsImFsZyI6IkhTMjU2In0.e30.oUQGjCS2S_jycg4PZnFK4uQ81DsNFX-N1m81Dfahi6o','X-Request-For':customer_ip, 'guid': request_guid }
    }).then(response => response.json()).then(data => {
        return data
    })
}

function UpdateUsedBikeById(id: any, payload: any) {
    let resStatus = -1
    return fetch(Gconfig.ebikeApi + `classified/update-classified/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            resStatus = response.status
            response.json()
        })
        .then(data => {
            if (resStatus == 204) {
                return { success: true }
            }
            else {
                return { success: false }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function ChangeFeatured(id: any, payload: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `classified/feature-used-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function ChangeApprove(id: any, payload: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `classified/approve-used-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// BLOG FUNCTIONS //////////////////////////////////////////////////////
function getAllBlog() {
    return fetch(Gconfig.ebikeApi + `blog/get-all-blog`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function DeleteBlogById(id: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `blog/delete-blog/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getSingleblogDetail(id: any) {
    return fetch(Gconfig.ebikeApi + `blog/get-blog-by-id/${id}`, {
        method: 'GET',
    }).then(response => response.json()).then(data => {
        return data
    })
}

function UpdateBlogById(id: any, payload: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `blog/update-blog/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewBlog(data: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `blog/add-new-blog`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

/////////////////////////////////////// DEALERS FUNCTION ///////////////////////////////////////////////////////
function getAllDealer() {
    return fetch(Gconfig.ebikeApi + `dealers/get-dealer`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function ChangeDealerApprove(id: any, payload: any) {

    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `dealers/update-dealer/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function ChangeDealerFeatured(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `dealers/feature-dealer/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteDealerbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    let resStatus = -1

    return fetch(Gconfig.ebikeApi + `dealers/delete-dealer/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => {
            resStatus = response.status
            response.json()
        })
        .then(data => {
            if (resStatus == 204) {
                return { success: true }
            }
            else {
                return { success: false }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// MECHANICS FUNCTION ///////////////////////////////////////////////////////
function getAllMechanics() {
    return fetch(Gconfig.ebikeApi + `mechanic/get-mechanic`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function ChangeMechanicFeatured(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `mechanic/feature-mechanic/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function ChangeMechanicApprove(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `mechanic/update-mechanic/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteMechanicbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    let resStatus = -1
    return fetch(Gconfig.ebikeApi + `mechanic/delete-mechanic/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => {
            resStatus = response.status
            response.json()
        })
        .then(data => {
            if (resStatus == 204) {
                return { success: true }
            }
            else {
                return { success: false }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// ALL PAGES FUNCTION ///////////////////////////////////////////////////////
function getAllPages() {
    return fetch(Gconfig.ebikeApi + 'page/get-all-pages', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log('Error fetching mechanics:', err);
        });
}

function getPageById(id: any) {
    return fetch(Gconfig.ebikeApi + `page/get-page-by-id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log('Error fetching mechanics:', err);
        });
}

function UpdatePageById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `page/update-page/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeletePagebyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `page/delete-page/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewPage(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `page/add-new-page`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

/////////////////////////////////////// ALL GENERAL BRAND FUNCTION ///////////////////////////////////////////////////////
function getbrandData() {
    return fetch(Gconfig.ebikeApi + 'brand/get-brand')
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getBrandFromId(id: any, dataArr: any) {
    if (dataArr && dataArr.length > 0 && id) {
        let brand = dataArr.filter((val: any) => { return (val.id == id) })
        return brand;
    }
    else return []
}

function UpdateBrandById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `brand/update-brand/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteBrandbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `brand/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewBrand(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `bike-brand/create-brand`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

/////////////////////////////////////// ALL GENERAL CITY FUNCTION ///////////////////////////////////////////////////////
function getCityData() {
    return fetch(Gconfig.ebikeApi + 'city/get-city')
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function DeleteCitybyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `city/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewCity(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `city/create-city`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

/////////////////////////////////////// ALL USER FUNCTION ///////////////////////////////////////////////////////
function getNewLettetrData() {
    return fetch(Gconfig.ebikeApi + 'news-letter/get-emails')
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getSignupData() {
    return fetch(Gconfig.ebikeApi + 'user/get-all-users')
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function DeleteUserbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `user/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteNewsLetterUserbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `news-letter/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// ALL SHOP FUNCTION ///////////////////////////////////////////////////////
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

function GetSubCategByMainCateg(id: any) {
    return fetch(Gconfig.ebikeApi + `shop/get-sub-catagory-data-by-main-catagory/${id}`, {
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

function GetProductCompany() {
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

function addNewProduct(data: any) {
    return fetch(Gconfig.ebikeApi + `shop/product/add-product`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function DeleteProductbyId(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `shop/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////// ADD CATEGORY FUNCTION ///////////////////////////////////////////////////////
function addNewCategory(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `shop/add-main-catagory`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function addNewSubCategory(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `shop/add-sub-catagory`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function UpdateCategImagesById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/main-category/update/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
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

function UpdateProductDetailById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/product/update/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

///////////////////////////////////////COMPANY BRAND FUNCTION ///////////////////////////////////////////////////////
function GetCompanyBrand() {
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

function UpdateBrandCompany(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/update-company_data/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteBrandCompany(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `shop/company-brand/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewBrandCompany(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `shop/add-product-company`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

//////////////////////////////////////// PENDING ORDER LIST FUNCTION ///////////////////////////////////////////////////////
function GetAllOrders() {
    return fetch(Gconfig.ebikeApi + `shop/oder-details/get-oders-detail`, {
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

function CancelOrderPending(orderId: any, id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/oder-details/update/${orderId}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function ProcessOrderPending(orderId: any, id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/oder-details/update/${orderId}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function CompleteOrder(orderId: any, id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/oder-details/update/${orderId}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function ReturnOrder(orderId: any, id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `shop/oder-details/update/${orderId}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

/////////////////////////////////////////////////// COUPON CODE FUNCTION ////////////////////////////////////////
function GetAllCouponCode() {
    return fetch(Gconfig.ebikeApi + `coupon-code/get-coupon-code`, {
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

function AddNewCouponCode(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `coupon-code/create-coupon-code`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function DeleteCouponCode(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `coupon-code/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

////////////////////////////////////////////// FORUMS FUNCTION //////////////////////////////////////////////
function GetAllForumCategory() {
    return fetch(Gconfig.ebikeApi + `forum/get-forum-catagories`, {
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

function GetAllMainForumCategory() {
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

function GetAllThreads() {
    return fetch(Gconfig.ebikeApi + `new-forum/get-new-forum-thread`, {
        // return fetch(`http://localhoslt:4001/api/new-forum/get-new-forum-thread`, {
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

function GetAllThreadsComments() {
    return fetch(Gconfig.ebikeApi + `forum/get-all-comments`, {
        // return fetch(`http://localhodst:4001/api/forum/get-all-comments`, {
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

function AddNewForumCategory(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `forum/add-forum-catagory`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function AddNewForumMainCategory(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-forum/crete-new-forum-main-categ`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function AddNewForumSubCategory(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-forum/crete-new-forum-sub-categ`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function DeleteForumCategory(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `forum/delete-category/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteThread(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `new-forum/delete-forum-thread/${id}`, {
        // return fetch(`http://localkhost:4001/api/new-forum/delete-forum-thread/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function DeleteThreadComment(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `forum/delete-thread-comments/${id}`, {
        // return fetch(`http://localhosmt:4001/api/forum/delete-thread-comments/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function UpdateThreadById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `new-forum/update-forum-thread/${id}`, {
        // return fetch(`http://localhnost:4001/api/new-forum/update-forum-thread/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function UpdateThreadCommentById(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `forum/update-thread-comments/${id}`, {
        // return fetch(`http://localhojst:4001/api/forum/update-thread-comments/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            // "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

////////////////////////////////////////////// BIKE VIDEOS FUNCTION //////////////////////////////////////////////
function AddNewVideo(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Gconfig.ebikeApi + `videos/create-videos`, {
        // return fetch(`http://localhosjt:4000/api/videos/create-videos`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function UpdateVideoByID(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `videos/update-by-id/${id}`, {
        // return fetch(`http://localhhost:4000/api/videos/update-by-id/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function GetAllVideos() {
    return fetch(Gconfig.ebikeApi + `videos/get-all-bike-videos`, {
        // return fetch(`http://locjalhost:4000/api/videos/get-all-bike-videos`, {
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

function DeleteBikeVideo(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Gconfig.ebikeApi + `videos/delete-by-id/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

////////////////////////////////////////////// WEBSITE SETTING FUNCTION //////////////////////////////////////////////
function AddNewSetting(data: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;
    return fetch(Port + `website-setting/create-setting`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function UpdateSettingByID(id: any, payload: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Port + `website-setting/setting-update-by-id/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function GetAllSetting() {
    return fetch(Port + `website-setting/get-all-website-settings`, {
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

function DeleteSetting(id: any) {
    const userCookie = jsCookie.get("userData_ebike_panel");
    const userData = JSON.parse(userCookie);
    const token = userData?.accessToken;

    return fetch(Port + `website-setting/setting-delete-by-id/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}


export {
    PostLogin,
    uplaodImageFunc,
    checkAuthAndRedirect,
    GetUserDetail,

    addNewBike,
    getAllNewBike,
    UpdateNewBikeById,
    getnewBikedetailsData,
    DeleteNewBikeById,

    getCustomBikeAd,
    getSinglebikesDetail,
    DeleteUsedBikeById,
    UpdateUsedBikeById,
    ChangeFeatured,
    ChangeApprove,

    getAllBlog,
    DeleteBlogById,
    getSingleblogDetail,
    UpdateBlogById,
    addNewBlog,

    getAllDealer,
    ChangeDealerApprove,
    ChangeDealerFeatured,
    DeleteDealerbyId,

    getAllMechanics,
    ChangeMechanicFeatured,
    ChangeMechanicApprove,
    DeleteMechanicbyId,

    getAllPages,
    getPageById,
    DeletePagebyId,
    UpdatePageById,
    addNewPage,

    getbrandData,
    getBrandFromId,
    UpdateBrandById,
    DeleteBrandbyId,
    addNewBrand,

    getCityData,
    DeleteCitybyId,
    addNewCity,

    getNewLettetrData,
    getSignupData,
    DeleteUserbyId,
    DeleteNewsLetterUserbyId,

    getShopMainCategory,
    getShopCategory,
    GetSubCategByMainCateg,
    GetProductCompany,
    addNewProduct,
    DeleteProductbyId,

    addNewCategory,
    addNewSubCategory,
    UpdateCategImagesById,
    getProduct,
    UpdateProductDetailById,

    GetCompanyBrand,
    UpdateBrandCompany,
    DeleteBrandCompany,
    addNewBrandCompany,

    GetAllOrders,
    CancelOrderPending,
    ProcessOrderPending,
    CompleteOrder,
    ReturnOrder,

    AddNewCouponCode,
    GetAllCouponCode,
    DeleteCouponCode,

    GetAllThreads,
    GetAllForumCategory,
    AddNewForumCategory,
    DeleteForumCategory,
    GetAllMainForumCategory,
    AddNewForumMainCategory,
    AddNewForumSubCategory,
    DeleteThread,
    DeleteThreadComment,
    UpdateThreadById,
    UpdateThreadCommentById,
    GetAllThreadsComments,

    AddNewVideo,
    GetAllVideos,
    UpdateVideoByID,
    DeleteBikeVideo,

    AddNewSetting,
    GetAllSetting,
    UpdateSettingByID,
    DeleteSetting
}