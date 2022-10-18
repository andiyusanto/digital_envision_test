var moment = require('moment-timezone');
const schedule = require('node-schedule');
const {Op} = require("sequelize")
const dbMysql = require('../libs/mysql');
const senderModul = require('../libs/sender');
const userModel = require('../models/users');
const initDataModel = require('../models/init_data');
const messsagesModel = require('../models/messsages');

console.log('This is scheduler worker that run every minute, to send birthday message.');

sendBirthdayMessage();
const job = schedule.scheduleJob('* * * * *', async function(fireDate){
    console.log('run at ' + fireDate);
    await sendBirthdayMessage();
});

async function sendBirthdayMessage(){
    const users = await userModel.getUsers(dbMysql);
    const initData = await initDataModel.getInitData(dbMysql);
    const messages = await messsagesModel.getMessages(dbMysql);
    users.hasMany(initData);
    initData.belongsTo(users, { foreignKey: 'id_user' });
    
    const dataToProcess = await initData.findAll({
        'attributes': [
            'id', 'id_user','processing_date','id_message',
        ],
        'order': [['id', 'ASC']],
        'where': { 'is_sent': 0},
        'include': {
            model: users
           },
    });
    if(dataToProcess.length != 0){
        await dataToProcess.forEach(async function(dataRows){
            const full_name = dataRows.dataValues.USER.dataValues.first_name + dataRows.dataValues.USER.dataValues.last_name;
            const birthdayMessage = await messages.findByPk(dataRows.dataValues.id_message);
            let presentTime = moment();
            console.log('presentTime => '+presentTime.format('YYYY-MM-DD HH:ii:ss'));
            const confirmedSentTime = presentTime.tz(dataRows.dataValues.USER.dataValues.location);
            console.log('Processing '+full_name+ ' at localtime '+confirmedSentTime.format('YYYY-MM-DD HH:ii:ss'));
            
            if(parseInt(confirmedSentTime.format('HH')) == 4){
                messageToSend = birthdayMessage.message.replace(/{full_name}/g, `${full_name}`);
                const requestToSend = {
                    "email": "test@digitalenvision.com.au",
                    "message": messageToSend
                };
                console.log('request to send -> '+JSON.stringify(requestToSend));
                let senderResponse = await senderModul.doSendEmailRequest(requestToSend);
                if(senderResponse){
                    senderResponse = JSON.parse(senderResponse);
                    if(senderResponse.status == 'sent'){
                        console.log(senderResponse.status);
                        await initData.update({is_sent : 1}, {
                            where: {
                              id: dataRows.dataValues.id
                            }
                        });
                    }
                }
            }
            
        });
    }else{
        console.log('No Data To Pocess');
    }
}