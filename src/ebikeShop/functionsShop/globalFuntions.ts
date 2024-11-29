import Gconfig from 'globalconfig'
// import jsCookie from 'js-cookie'
const jsCookie = require('js-cookie');

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
export {
    numericOnly, alphabetOnly, alphaNumeric, validateEmail, validateMobileNumber, validateZipCode,
    noSpecialCharacters, noSpecialCharactersButSpace, noSpecialCharactersExceptDotUderscore
}