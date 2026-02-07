const jsCookie = require('js-cookie');
import Gconfig from 'globalconfig'

function isLoginUser() {
  let obj = jsCookie.get('userInfo_e')
  if (obj) {
    return { login: true, info: JSON.parse(obj) }
  }
  else {
    return { login: false, info: null }
  }
}

function add3Dots(str: any, limit: any) {
  var dots = " ... ";
  if (str?.length > limit) {
    str = str.substring(0, limit) + dots;
  }
  return str;
}

const optimizeImage = (url: any, h: any, w: any) => {
  let cloudinary_name;
  let oldUrl;

  if (url?.includes('ic-solutions') > -1) {
    cloudinary_name = 'ic-solutions';
  } else if(url?.includes('dulfy2uxn')) {
    cloudinary_name = "dulfy2uxn"
  }
  else {
    cloudinary_name = 'dtroqldun';
  }

  if (url) {
    oldUrl = url
  } else {
    oldUrl = `https://res.cloudinary.com/${cloudinary_name}/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png`;
  }

  let url1 = oldUrl.split(`https://res.cloudinary.com/${cloudinary_name}/image/upload/`);
  let url2;

  if (url1.length > 1) {
    url2 = url1[1].split('/v');
  } else {
    url2 = url1[0].split('/v');
  }
  if (url2.length == 2) {
    return `https://res.cloudinary.com/${cloudinary_name}/image/upload/c_scale,dpr_auto,f_auto,q_auto,` + h + ',' + w + '/v' + url2[url2.length - 1];
  } else {
    return `https://res.cloudinary.com/${cloudinary_name}/image/upload/c_scale,dpr_auto,f_auto,q_auto,` + h + ',' + w + '/v' + url2[1] + '/v' + url2[url2.length - 1];
  }
}


function capitalizeFirstWord(str: any) {
  return str?.replace(/^\w/, (c: any) => c.toUpperCase());
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

function priceWithCommas(x: any) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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

function resetPassword(data: any) {
  return fetch(Gconfig.ebikeApi + `reset-password`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    return data
  })
}

function changePassword(data: any) {
  return fetch(Gconfig.ebikeApi + `user/change-password`, {
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

function publishAd(data: any, adminToken:any) {
  let token = adminToken ? adminToken : jsCookie.get('accessToken_e')
  return fetch(Gconfig.ebikeApi + `classified/crete-add`, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "x-access-token": token },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    return data
  })
}

function postSearch(data: any) {
  return fetch(Gconfig.ebikeApi + 'new_search', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => { return data })
    .catch((err) => {
      console.log(err)
    })
}

function postSearchNew(data: any) {
  return fetch(Gconfig.ebikeApi + 'global-search', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => { return data })
    .catch((err) => {
      console.log(err)
    })
}


function getFavouriteAds(userId: any) {
  return fetch(Gconfig.ebikeApi + `favourite/getFavourite/${userId}`, {
    // return fetch(Gconfig.ebikeApi + `favourite/getFavourite/2274bfde0b-49e9-41a7-828a-e8c118ee17b2`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  }).then(response => response.json()).then(data => {
    return data
  })
    .catch((err) => {
      return err
    })
}

function GetFavouriteObject(userId: any, PageFrom: string, SelectedAds: any, adId: any) {
  const GetObject = (data: any) => {
    if (PageFrom == "usedBikeIds") {
      return {
        userId: userId,
        favouriteData: {
          usedBikeIds: data
        }
      }
    }
    else if (PageFrom == "newBikeIds") {
      return {
        userId: userId,
        favouriteData: {
          newBikeIds: data
        }
      }
    }
    else {
      return 'Data not Found'
    }
  }

  const obj = GetObject(SelectedAds?.length > 0 ? SelectedAds : [])

  return fetch(Gconfig.ebikeApi + 'favourite/addUpdateFavourite', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(data => { return data })
    .catch((err) => {
      console.log(err)
    }) 

}

function cloudinaryLoader(src:any, width:any, quality:any) {
  console.log('src', src)
    if (!src?.startsWith("http")) {
      return src 
    }

    // Extract the cloud name from the URL
    const match = src.match(/res\.cloudinary\.com\/([^/]+)/);
    const cloudName = match ? match[1] : null;

    if (!cloudName) {
      return src
    }

    // Inject optimization params into the URL
    return src.replace(
      "/upload/",
      `/upload/f_auto,q_${quality || "auto"},w_${width},fl_strip_profile/`
    );
}

const BlogShuffle = (AllBlogs: any[]) => {
  return AllBlogs
    .slice(0, 30) // pehle 50
    .map((item) => ({ item, sortKey: Math.random() })) // har ek item ko random key do
    .sort((a, b) => a.sortKey - b.sortKey) // random key k basis pe shuffle
    .map(({ item }) => item); // original item wapas nikal lo
};


  function timeAgo(createdAt: any) {
    const now = Date.now();
    const created = typeof createdAt === "number" ? createdAt : Date.parse(createdAt);
    if (isNaN(created)) return "";

    const diffSec = Math.floor((now - created) / 1000);

    if (diffSec < 60) return `${diffSec} sec ago`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} hrs ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }

export {
  add3Dots,
  optimizeImage,
  isLoginUser,
  numericOnly,
  alphabetOnly,
  alphaNumeric,
  validateEmail,
  validateMobileNumber,
  validateZipCode,
  noSpecialCharacters,
  noSpecialCharactersButSpace,
  noSpecialCharactersExceptDotUderscore, userLogin, userSignup, verifyUserFromAuthenticationEmail,
  publishAd,
  priceWithCommas,
  capitalizeFirstWord,
  postSearch,
  getFavouriteAds,
  GetFavouriteObject,
  cloudinaryLoader,
  BlogShuffle,
  timeAgo,
  resetPassword,
  changePassword,
  postSearchNew
}