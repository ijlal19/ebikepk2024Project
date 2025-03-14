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

function add3Dots(str, limit) {
  var dots = " ... ";
  if (str.length > limit) {
    str = str.substring(0, limit) + dots;
  }
  return str;
}

const optimizeImage = (url, h, w) => {
  let cloudinary_name;
  let oldUrl;

  if (url.includes('ic-solutions')) {
    cloudinary_name = 'ic-solutions';
  } else {
    cloudinary_name = 'dtroqldun';
  }

  if (url) {
    oldUrl = url
  } else {
    oldUrl = `https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png`;
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

export {
  add3Dots,
  optimizeImage,
  isLoginUser
}