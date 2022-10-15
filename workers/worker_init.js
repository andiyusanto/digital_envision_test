const moment = require('moment');
const schedule = require('node-schedule');
const {Op} = require("sequelize")
const dbMysql = require('../libs/mysql');
const userModel = require('../models/users');
const initDataModel = require('../models/init_data');

console.log('This is scheduler worker that run every dat at 1 AM, to save users data that have birthday today.');

const job = schedule.scheduleJob('0 0 3 * *', async function(fireDate){
    console.log('run at ' + fireDate);
    await initDataToSendBirthdayMessage();
});

async function initDataToSendBirthdayMessage(){
    const users = await userModel.getUsers(dbMysql);
    const initData = await initDataModel.getInitData(dbMysql);
    let processingDate = moment().format('YYYY-MM-DD');
    const latestDate = await initData.max('processing_date');
    const datausers = await users.findAll({
        'attributes': ['id', 'last_name','first_name','birthday_date','location'],
        'order': [['id', 'ASC']],
        'where': { 'birthday_date': {
            [Op.between] :  [latestDate, processingDate]
            } 
        },
    });
    if(datausers.length != 0){
        console.log(dataToInsert.length + 'Will Be processed');
        await datausers.forEach(async function(dataRows){
            const dataToInsert = {
                id_user: dataRows.id,
                id_message : 1,
                processing_date : dataRows.birthday_date,
            }
            console.log(dataToInsert);
            await initData.create(dataToInsert);
        });
    }else{
        console.log('No Data To Pocess');
    }    
}

process.on('SIGINT', function () { 
    schedule.gracefulShutdown()
    .then(() => process.exit(0))
})