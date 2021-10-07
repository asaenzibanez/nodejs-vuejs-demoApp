<!--
 * @File Name          : App.vue
 * @Description        : Main Vue component
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
-->

<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <v-app-bar app dark>
      <div
        class="navbar-brand d-flex align-center mr-2"
        style="padding-right: 50px;"
      >
        DemoBANK
      </div>

      <v-btn to="/bankingTransactions" text>
        Transactions
      </v-btn>

      <v-btn to="/add" text>
        Operations
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
