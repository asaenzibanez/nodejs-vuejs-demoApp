<!--
 * @File Name          : BankingTransactionsList.vue
 * @Description        : component to show the view of Transactions
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
-->
<template>
  <v-row align="center" class="list px-3 mx-auto" style="padding-top: 50px;">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto">
        <v-card-title>Transactions</v-card-title>
        <v-row align="center" class="list px-3 mx-auto">
          <v-col cols="12" md="10">
            <v-text-field
              v-model="concept"
              label="Search by Concept"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              small
              @click="searchConcept"
              style="float: right;"
              :disabled="bankingTransactions.length == 0 && !clearFilters"
            >
              Search
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12">
            <v-data-table
              id="tabla"
              dense
              :headers="headers"
              :items="bankingTransactions"
              :hide-default-footer="false"
              :items-per-page="10"
              :item-class="itemRowBackground"
            >
              <!--
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editBankingTransaction(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteBankingTransaction(item.id)">mdi-delete</v-icon>
          </template> -->
            </v-data-table>
          </v-col>
        </v-row>
        <v-card-actions v-if="clearFilters">
          <button class="btn btn-warning btn-sm" @click="refreshList">
            Clear filters
          </button>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BankingTransactionDataService from "../services/BankingTransactionDataService";
export default {
  name: "bankingTransactions-list",
  data() {
    return {
      bankingTransactions: [],
      concept: "",
      headers: [
        { text: "Date", align: "start", sortable: true, value: "createdAt" },
        { text: "Concept", align: "end", value: "concept", sortable: false },
        { text: "Amount", align: "end", value: "amount", sortable: false },
        { text: "Balance", align: "end", value: "balance", sortable: false },
        //{ text: "Actions", value: "actions", sortable: false },
      ],
      clearFilters: false,
    };
  },
  methods: {
    formatNumberWithCommas: function(item) {
      return item.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },

    /**
     * Gets called when render the dataTable to define the backGroundcolor of the row
     * @param {} item record
     * @public This is a public method
     */
    itemRowBackground: function(item) {
      return item.amount.includes("+") ? "style-1" : "style-2";
    },

    /**
     * Gets called when the view is mounted or when user clicks on the button "Clear filters"
     * @public This is a public method
     */
    retrieveBankingTransactions() {
      let that = this;
      BankingTransactionDataService.getAll()
        .then((response) => {
          this.bankingTransactions = response.data.map(
            this.getDisplayBankingTransaction
          );
          console.log(response.data);
        })
        .catch((e) => {
          that.$toast.error("Something has gone wrong:" + e, {
            position: "top-center",
            timeout: 2200,
          });
          console.log(e);
        });
    },

    /**
     * Gets called when the user clicks on the button "Clear filters"
     * @public This is a public method
     */
    refreshList() {
      this.retrieveBankingTransactions();
      this.clearFilters = false;
      this.concept = "";
    },

    /**
     * Gets called when the user clicks on the button "Search"
     * @public This is a public method
     */
    searchConcept() {
      if (this.concept) {
        let that = this;
        BankingTransactionDataService.findByTitle(this.concept)
          .then((response) => {
            this.clearFilters = true;
            this.bankingTransactions = response.data.map(
              this.getDisplayBankingTransaction
            );
            console.log(response.data);
          })
          .catch((e) => {
            that.$toast.error("Something has gone wrong:" + e, {
              position: "top-center",
              timeout: 2200,
            });
            console.log(e);
          });
      } else {
        this.$toast.warning("Enter a concept", {
          position: "top-center",
          timeout: 2200,
        });
      }
    },

    /**
     * Gets called to transform records to show in the datatable
     * @param {} bankingTransaction record to show
     * @public This is a public method
     */
    getDisplayBankingTransaction(bankingTransaction) {
      let date = bankingTransaction.createdAt.split("T");
      let hour = date[1].split(".");
      return {
        id: bankingTransaction.id,
        concept:
          bankingTransaction.concept.length > 30
            ? bankingTransaction.concept.substr(0, 30) + "..."
            : bankingTransaction.concept,
        amount:
          bankingTransaction.operation +
          " " +
          this.formatNumberWithCommas(bankingTransaction.amount) +
          " €",
        balance: this.formatNumberWithCommas(bankingTransaction.balance) + " €",
        createdAt: date[0].replaceAll("-", "/") + "  " + hour[0].substr(0, 5),
      };
    },

    /**
     * Gets called when the component is created to check if comes from performing an operation
     * @public This is a public method
     */
    checkParams() {
      let operationStatus = this.$route.params.operationStatus;
      if (operationStatus == "OK") {
        this.$toast.success("Success operation!", {
          position: "top-center",
          timeout: 2200,
        });
      } else if (operationStatus == "KO") {
        this.$toast.error("Something has gone wrong", {
          position: "top-center",
          timeout: 2200,
        });
      }
    },
  },

  /**
   * Gets called when the component is created
   */
  mounted() {
    this.retrieveBankingTransactions();
    this.checkParams(); //check if operation has been performed success or not to show toast
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
.style-1 {
  background-color: #e8f9ea;
}
.style-2 {
  background-color: #f3e4e4;
}
</style>
