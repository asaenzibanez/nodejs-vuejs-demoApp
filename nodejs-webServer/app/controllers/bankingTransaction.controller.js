/*
 * @File Name          : bankingTransaction.controller.js
 * @Description        : DB operation with ORM Setup
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

const db = require("../models");
const BankingTransaction = db.bankingTransactions;
const Op = db.Sequelize.Op;

/**
 * Create and Save a new BankingTransaction
 * @param  {} req
 * @param  {} res 
 */
exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const bankingTransaction = {
    amount: req.body.amount,
    concept: req.body.concept,
    balance: req.body.balance,
    operation: req.body.operation
  };

  BankingTransaction.create(bankingTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BankingTransaction."
      });
    });
};


/**
 * Retrieve all BankingTransactions from the database.
 * @param  {} req
 * @param  {} res 
 */

exports.findAll = (req, res) => {
  const concept = req.query.concept;
  var condition = concept ? { concept: { [Op.like]: `%${concept}%` } } : null;

  BankingTransaction.findAll({ where: condition, order: [['id', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BankingTransactions."
      });
    });
};



/**
 * Retrieve the last BankingTransaction from the database.
 * @param  {} req
 * @param  {} res 
 */

exports.findLast = (req, res) => {

  BankingTransaction.findAll({ limit: 1, order: [['id', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BankingTransaction."
      });
    });
};


/**
 * Delete all BankingTransactions from the database.
 * @param  {} req
 * @param  {} res 
 */

exports.deleteAll = (req, res) => {
  BankingTransaction.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} BankingTransaction were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BankingTransactions."
      });
    });
};


/**
 * Delete a BankingTransactions from the database.
 * @param  {} req
 * @param  {} res 
 */

exports.delete = (req, res) => {
  const id = req.params.id;

  BankingTransaction.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "BankingTransaction was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete BankingTransaction with id=${id}. Maybe BankingTransaction was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete BankingTransaction with id=" + id
      });
    });
};

