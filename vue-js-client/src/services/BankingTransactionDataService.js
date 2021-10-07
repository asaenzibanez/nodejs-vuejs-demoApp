/*
 * @File Name          : BankingTransactionDataService.js
 * @Description        : consume REST Services in server
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

import http from "../http-common";

class BankingTransactionDataService {
  getAll() {
    return http.get("/bankingTransactions");
  }  

  getLast() {
    return http.get(`/bankingTransactions/last`);
  }

  create(data) {
    return http.post("/bankingTransactions", data);
  }

  deleteAll() {
    return http.delete(`/bankingTransactions`);
  }

  findByTitle(concept) {
    return http.get(`/bankingTransactions?concept=${concept}`);
  }
}

export default new BankingTransactionDataService();