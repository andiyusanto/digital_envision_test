const Sequelize = require("sequelize")

async function getMessages(dbMysql){
  const messages = dbMysql.define(
    "MESSAGES",   
     {        
       id: {         
         type: Sequelize.BIGINT,
         primaryKey: true,            
         autoIncrement: true        
       },        
       message: {            
         type: Sequelize.STRING(250)        
       }, 
     }, 
     { timestamps: false, tableName: "MESSAGES" }
  )
  return messages;
}
module.exports = {
  getMessages
};