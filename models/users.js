const {Sequelize, Model, DataTypes, Op} = require("sequelize")

async function getUsers(dbMysql){
  const users = dbMysql.define(
    "USERS",   
     {        
       id: {         
         type: Sequelize.BIGINT,
         primaryKey: true,            
         autoIncrement: true        
       },        
       first_name: {            
         type: Sequelize.STRING(30)        
       },        
       last_name: {            
           type: Sequelize.STRING(30)        
       }, 
       birthday_date: {            
         type: Sequelize.DATEONLY       
       }, 
       location: {            
         type: Sequelize.STRING(100)        
       }
     }, 
     { timestamps: false, tableName: "USERS" }
  )
  return users;
}
module.exports = {
  getUsers
};