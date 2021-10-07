/*
 * @File Name          : bankingTransaction.routes.js
 * @Description        : Defining REST API
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

module.exports = app => {
  const bankingTransactions = require("../controllers/bankingTransaction.controller.js");

  var router = require("express").Router();

  // Create a new BankingTransaction
  router.post("/", bankingTransactions.create);

  // Retrieve all BankingTransactions
  router.get("/", bankingTransactions.findAll);
  
   // Retrieve last  BankingTransaction
  router.get("/last", bankingTransactions.findLast);
  
  // Delete all BankingTransactions
  router.delete("/", bankingTransactions.deleteAll);

  // Delete a BankingTransactions with id
  router.delete("/:id", bankingTransactions.delete);

  app.use('/api/bankingTransactions', router);
};