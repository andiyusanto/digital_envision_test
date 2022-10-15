const validator = require('validator');
const ct = require('countries-and-timezones');

function validateDate(dateValue){
    let validate = validator.isDate(dateValue, [{'format':'YYYY-MM-DD'},{'delimiters': ['/', '-']}])
    // let validate = moment(dateValue, "YYYY-MM-DD");
    return validate;
}

function validateStringOnly(stringValue){
    const validate = validator.isAlpha(stringValue);
    return validate;
}

function validateNumberOnly(numberValue){
    let validate = /^\d+$/.test(numberValue);
    return validate;
}

function validateTimezone(timezoneValue){
    let check = ct.getTimezone(timezoneValue);
    let validate = true;
    if(check == null){
        validate = false;
    }
    return validate;
}

module.exports = {
    validateDate,
    validateStringOnly,
    validateNumberOnly,
    validateTimezone,
  };