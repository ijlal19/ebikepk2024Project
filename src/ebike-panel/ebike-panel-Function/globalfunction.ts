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


function getSinglebikesDetail(id: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-classified-by-id-with-random-adds/${id}`, {
        method: 'GET',
        // headers: { 'Authorization': 'Bearer eyJBdXRob3IiOiJGYXNoaW9uUGFzcyIsImFsZyI6IkhTMjU2In0.e30.oUQGjCS2S_jycg4PZnFK4uQ81DsNFX-N1m81Dfahi6o','X-Request-For':customer_ip, 'guid': request_guid }
    }).then(response => response.json()).then(data => {
        return data
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

function getCustomBikeAd(obj: any) {
    return fetch(Gconfig.ebikeApi + `classified/get-custom-ads`, {
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

const checkAuthAndRedirect = (router: any) => {
    const userCookie = jsCookie.get("userData_ebike_panel");

    if (userCookie) {
        const userData = JSON.parse(userCookie);
        const token = userData?.accessToken;
        if (!token) {
            router.replace("/ebike-panel/login");
        }
    } else {
        router.replace("/ebike-panel/login");
    }
};

function getAllBlog() {
    return fetch(Gconfig.ebikeApi + `blog/get-all-blog`)
        .then(response => response.json()).then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

export {
    PostLogin,

    addNewBike,
    getAllNewBike,
    UpdateNewBikeById,
    getnewBikedetailsData,
    DeleteNewBikeById,

    getCustomBikeAd,
    getSinglebikesDetail,
    DeleteUsedBikeById,
    UpdateUsedBikeById,
    checkAuthAndRedirect,

    getAllBlog
}