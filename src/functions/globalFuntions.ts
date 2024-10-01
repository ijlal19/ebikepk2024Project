
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

const validateZipCode = (zip:string) => {
    return zip.length == 5;
}

// function validateBirthDate(birthdate) {
//     let month = moment(birthdate).format('MM')
//     let days = moment(birthdate).format('DD')
//     let birthDate = moment(moment(birthdate).format('MM/DD/YYYY'), 'MM/DD/YYYY')
//     let dateNow = moment(moment(Date.now()).format('MM/DD/YYYY'), 'MM/DD/YYYY')
//     let dateDiff = dateNow.diff(birthDate, 'years')
//     if (month == 'Invalid date') {
//         return false
//     }
//     if (days == 'Invalid date') {
//         return false
//     }
//     if (birthDate > dateNow) {
//         return false
//     }
//     if ((birthdate.split('/')[2]) < 1940) {
//         return false
//     }
//     if (dateDiff < 10) {
//         return false
//     }
//     return true
// }

const noSpecialCharacters = (value: string) => {
    return value.replace(/[^a-zA-Z0-9]/g, "")
}

const noSpecialCharactersButSpace = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s]/g, "")
}

const noSpecialCharactersExceptDotUderscore = (str: string) => {
    return str.replace(/[^a-zA-Z0-9._]/g, "")
}

function getAllbikesDetail(page:any) {
    return fetch(`https://ebikepk-server-nodejs.herokuapp.com/api/classified/get-adds-with-offset/20/10`, {
        method: 'GET',
        // headers: { 'Authorization': 'Bearer eyJBdXRob3IiOiJGYXNoaW9uUGFzcyIsImFsZyI6IkhTMjU2In0.e30.oUQGjCS2S_jycg4PZnFK4uQ81DsNFX-N1m81Dfahi6o','X-Request-For':customer_ip, 'guid': request_guid }
    }).then(response => response.json()).then(data => {
        return data
    })
}

export { 
    getAllbikesDetail 
}