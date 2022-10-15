const Sequelize = require("sequelize")

async function getInitData(dbMysql){
  const init_date = dbMysql.define(
    "INIT_DATA",   
     {        
       id: {         
         type: Sequelize.BIGINT,
         primaryKey: true,            
         autoIncrement: true        
       },        
       id_user: {            
        type: Sequelize.BIGINT,      
       },        
       processing_date: {            
        type: Sequelize.DATEONLY       
       }, 
       is_sent: {            
        type: Sequelize.INTEGER,    
       }, 
       id_message: {            
          type: Sequelize.BIGINT,        
       }, 
     }, 
     { timestamps: false, tableName: "INIT_DATA" }
  )
  return init_date;
}
module.exports = {
  getInitData
};