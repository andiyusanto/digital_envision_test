const responseCode = {
    rcSuccess:'00',
    rcNotFound: '01',
    rcNotValid: '02',

}
const responseDesc = {
    rdSuccess : 'SUCCESS',
    rdNotFound : 'Data Not Exist',
    rdNotValidFN : 'Invalid first name Value',
    rdNotValidLN : 'Invalid last name Value',
    rdNotValidBD : 'Invalid birthdate date Value',
    rdNotValidLoc : 'Invalid location Value, check /timezone/[timezoneId] end point',
    rdNotValidUserId: 'Invalid User Id',
}

module.exports = {
    responseCode,
    responseDesc,
  };