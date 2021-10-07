/*
 * @File Name          : db.config.js
 * @Description        : DB access Setup
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

module.exports = {
  HOST: "remotemysql.com",
  USER: "QBdHQNilvg",
  PASSWORD: "P04QnPGHEB",
  DB: "QBdHQNilvg",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};