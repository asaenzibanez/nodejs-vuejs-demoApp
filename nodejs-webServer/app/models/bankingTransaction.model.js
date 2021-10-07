/*
 * @File Name          : bankingTransaction.model.js
 * @Description        : Sequelize Setup, defining model to map in DB
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

module.exports = (sequelize, Sequelize) => {
  const BankingTransaction = sequelize.define("bankingTransaction", {
    amount: {
      type: Sequelize.DECIMAL(12,2)
    },   
    concept: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.DECIMAL(12,2)
    },
    operation: {
      type: Sequelize.STRING(1)
    },
  });

  return BankingTransaction;
};