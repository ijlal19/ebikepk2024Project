import Gconfig from 'globalconfig'
const jsCookie = require('js-cookie');

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

const checkAuthAndRedirect = (router: any , pathname :any) => {
    const userCookie = jsCookie.get("userData_ebike_panel");

    if (userCookie) {
        const userData = JSON.parse(userCookie);
        const token = userData?.accessToken;
        if (token) {
            if(pathname == '/ebike-panel' || pathname == '/ebike-panel/login'){
                router.replace("/ebike-panel/dashboard");
            }
        }
        else{
            router.replace("/ebike-panel/login");
        }
    } else {
        router.replace("/ebike-panel/login");
    }
};

/////////////////////////////////////// NEW BIKE FUNCTIONS ///////////////////////////////////////////////////
function addNewBike(data: any) {
    return fetch(Gconfig.ebikeApi + `new-bikes/add-new-bike`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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
    return fetch(Gconfig.ebikeApi + `new-bikes/update-new-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `new-bikes/delete/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
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
    // return fetch(`http://localhost:4001/api/classified/get-custom-ads`, {
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
    return fetch(Gconfig.ebikeApi + `classified/delete-classified/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            return data;
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
    return fetch(Gconfig.ebikeApi + `classified/update-classified/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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

function ChangeFeatured(id: any, payload: any) {
    return fetch(Gconfig.ebikeApi + `classified/feature-used-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `classified/approve-used-bike/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `blog/delete-blog/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
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
    return fetch(Gconfig.ebikeApi + `blog/update-blog/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `blog/add-new-blog`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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
    return fetch(Gconfig.ebikeApi + `dealers/update-dealer/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `dealers/feature-dealer/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `dealers/delete-dealer/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            return data;
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
    return fetch(Gconfig.ebikeApi + `mechanic/feature-mechanic/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `mechanic/update-mechanic/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
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
    return fetch(Gconfig.ebikeApi + `mechanic/delete-mechanic/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            return data;
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

function getPageById(id:any) {
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


export {
    PostLogin,
    uplaodImageFunc,
    checkAuthAndRedirect,

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
    getPageById
}


// feature
// https://ebikepk-server-nodejs.herokuapp.com/api/classified/feature-used-bike/9163

// approve
// https://ebikepk-server-nodejs.herokuapp.com/api/classified/approve-used-bike/9163