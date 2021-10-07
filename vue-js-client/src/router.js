/*
 * @File Name          : router.js
 * @Description        : Vue Router Setup
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/bankingTransactions",
      name: "transactions",
      component: () => import("./components/BankingTransactionsList")
    },
   
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBankingTransaction")
    }
  ]
});