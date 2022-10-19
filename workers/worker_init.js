const moment = require('moment');
const schedule = require('node-schedule');
const {Sequelize, DataTypes, Op} = require("sequelize")
const dbMysql = require('../libs/mysql');
const userModel = require('../models/users');
const initDataModel = require('../models/init_data');

console.log('This is scheduler worker that run every dat at 1 AM, save users data to send message today.');

const avalableParamType = {
    'birthday_message' : 1
}

const queryInsertInitData = 'INSERT INTO INIT_DATA (id_user, id_message, processing_date) '+
            'SELECT * FROM (SELECT :id_user, :id_message, :processing_date) AS tmp '+
            'WHERE NOT EXISTS ( '+
            '    SELECT id_user,id_message, processing_date '+ 
            '   FROM INIT_DATA WHERE id_user = :id_user '+
            '    AND id_message = :id_message AND processing_date = :processing_date '+
            ') LIMIT 1';

const job = schedule.scheduleJob('* * * * *', async function(fireDate){
    console.log('run at ' + fireDate);
    await initDataToSendMessage('birthday_message');
});

async function initDataToSendMessage(messageType){
    const messageId = avalableParamType[messageType];
    console.log('init message id => ' + messageId);
    if(messageId != null ){
        const users = await userModel.getUsers(dbMysql);
        const initData = await initDataModel.getInitData(dbMysql);
        let processingDate = moment().format('YYYY-MM-DD');
        let latestDate = await initData.max('processing_date');
        latestDate = latestDate || processingDate;
        const datausers = await users.findAll({
            'attributes': ['id', 'last_name','first_name','birthday_date','location'],
            'order': [['id', 'ASC']],
            'where': { 'birthday_date': {
                [Op.between] :  [latestDate, processingDate]
                } 
            },
        });
        if(datausers.length != 0){
            console.log(datausers.length + ' Data will be processed');
            await datausers.forEach(async function(dataRows){
                await dbMysql.query(
                    queryInsertInitData,
                    {
                      replacements: { id_user: dataRows.id ,id_message: messageId, processing_date: dataRows.birthday_date },
                      type: Sequelize.QueryTypes.INSERT
                    }).then(result => {
                        console.log(result);
                }).catch((error) => {
                    console.error('Failed to insert data : ', error);
                });
            });
        }else{
            console.log('No Data To Pocess');
        } 
    }else{
        console.log('Not valid message type');
    }   
}

process.on('SIGINT', function () { 
    schedule.gracefulShutdown()
    .then(() => process.exit(0))
})