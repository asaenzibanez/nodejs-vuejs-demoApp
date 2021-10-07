<!-- 
 * @File Name          : AddBankingTransaction.vue
 * @Description        : component to show the view of Operations
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
        <v-card-title>Operations</v-card-title>
        <div style=" max-width: 380px; margin: auto">
          <div v-if="errors.length" class="alert alert-warning">
            <ul style="margin-bottom: 0rem;">
              <li v-for="item in errors" :key="item.id">
                {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="!submitted">
            <div class="form-group">
              <label for="amount">Amount</label>

              <input
                v-model="bankingTransaction.amount"
                autocomplete="off"
                class="form-control"
                id="amount"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @keypress="restrictChars($event)"               
                type="number"
                maxlength="10"
                placeholder="€"              
              />
            </div>

            <div class="form-group" style="padding-bottom: 10px;">
              <label for="concept">Concept</label>
              <input
                class="form-control"
                id="concept"
                v-model="bankingTransaction.concept"
                autocomplete="off"
                name="concept"
              />
            </div>
            <div>
              <button
                @click="depositBankingTransaction"
                class="btn btn-primary btn-sm"
              >
                Deposit money</button
              >&nbsp;
              <button
                @click="withdrawBankingTransaction"
                class="btn btn-primary btn-sm"
              >
                Withdraw money
              </button>
              <button
                :disabled="
                  lastBankingTransaction == null ||
                    lastBankingTransaction.length == 0
                "
                @click="handleConfirm"
                class="btn btn-danger btn-sm"
                style="padding-left:5px;float: right"
              >
                Cancel account
              </button>
            </div>
          </div>
          <br />

          <!--<div v-else>
              <h5>Success Operation!</h5>
              <button class="btn btn-success" @click="newBankingTransaction">
                New Operation
              </button>
            </div>-->
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BankingTransactionDataService from "../services/BankingTransactionDataService";

export default {
  name: "add-bankingTransaction",
  data() {
    return {
      bankingTransaction: {
        id: null,
        amount: "",
        concept: "",
      },
      lastBankingTransaction: null,
      submitted: false,
      errors: [],
    };
  },

  methods: {
    /**
     * Gets called on keypress in Amount input to avoid exponencial numbers and negative numbers
     * @param event `
     * @public This is a public method
     */
    restrictChars: function($event) {
      if ($event.key.toLowerCase() == "e" || $event.key == "-") {
        $event.preventDefault();
      }
    },
    
    /**
     * Gets called when the user clicks on the buttons "Deposit money"
     *      or "Withdraw money" to validate the required inputs
     * @public This is a public method
     */
    checkForm: function() {
      if (
        this.bankingTransaction.amount &&
        Number(this.bankingTransaction.amount) > 0 &&
        this.bankingTransaction.concept
      ) {
        this.errors = [];
        return true;
      }

      this.errors = [];

      if (
        !this.bankingTransaction.amount ||
        Number(this.bankingTransaction.amount) == 0
      ) {
        this.$toast.warning("Amount required", {
          position: "top-center",
          timeout: 2200,
        });
      }
      if (!this.bankingTransaction.concept) {
        this.$toast.warning("Concept required", {
          position: "top-center",
          timeout: 2200,
        });
      }
    },

    /**
     * Gets called when the user clicks on the button "Deposit money".
     *    Check the balance before insert new record.
     * @public This is a public method
     */
    depositBankingTransaction() {
      if (this.checkForm()) {
        var that = this;
        this.retrieveLastBankingTransaction().then(() => {          
          let data = {
            amount: that.bankingTransaction.amount,
            concept: that.bankingTransaction.concept,
            balance:
              (that.lastBankingTransaction.length == 0
                ? 0
                : Number(that.lastBankingTransaction[0].balance)) +
              Number(that.bankingTransaction.amount),
            operation: "+",
          };
          that.createBankingTransaction(data);
        });
      }
    },

    /**
     * Gets called when the user clicks on the button "Withdraw money".
     *    Check the amount to extract against the balance
     * @public This is a public method
     */
    withdrawBankingTransaction() {
      if (this.checkForm()) {
        var that = this;
        this.retrieveLastBankingTransaction().then(() => {
          if (
            that.lastBankingTransaction.length == 0 ||
            Number(that.lastBankingTransaction[0].balance) -
              Number(that.bankingTransaction.amount) <
              0
          ) {
            that.$toast.error("Not enough money", {
              position: "top-center",
              timeout: 2200,
            });
          } else {
            let data = {
              amount: that.bankingTransaction.amount,
              concept: that.bankingTransaction.concept,
              balance:
                Number(that.lastBankingTransaction[0].balance) -
                Number(that.bankingTransaction.amount),
              operation: "-",
            };
            this.createBankingTransaction(data);
          }
        });
      }
    },

    /**
     * Gets called to create new record after the user clicks
     *    on the buttons "Deposit money"  or "Withdraw money"
     * @param {} data record to insert
     * @public This is a public method
     */
    createBankingTransaction(data) {
      BankingTransactionDataService.create(data)
        .then((response) => {
          this.bankingTransaction.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push({
            name: "transactions",
            params: { operationStatus: "OK" },
          });
        })
        .catch((e) => {
          this.$router.push({
            name: "transactions",
            params: { operationStatus: "KO" },
          });
          console.log(e);
        });
    },

    /**
     * Gets called when the user confirm the account cancelation
     *    to remove all records of DB
     * @public This is a public method
     */
    removeAllBankingTransactions() {
      let that = this;
      BankingTransactionDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "transactions",
            params: { operationStatus: "OK" },
          });
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
     * Gets called to check the balance after the user
     *  clicks on the buttons "Deposit money"  or "Withdraw money"
     * @async
     * @public This is a public method
     */
    async retrieveLastBankingTransaction() {
      let that = this;
      await BankingTransactionDataService.getLast()
        .then((response) => {
          that.lastBankingTransaction = response.data;
          console.log(response.data);
          return response.data;
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
     * Gets called when the user clicks on the button "Cancel account"
     * @public This is a public method
     */
    handleConfirm() {
      this.$confirm({
        message: `Are you sure? All transations will be deleted`,
        button: {
          no: "No",
          yes: "Yes",
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            this.removeAllBankingTransactions();
          }
        },
      });
    },
  },

  /**
   * Gets called when the component is created
   */
  mounted() {
    this.retrieveLastBankingTransaction(); // to enable or not cancel account button
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
/* Align place holder right
webkit solution */
::-webkit-input-placeholder { text-align:right; }
/* mozilla solution */
input:-moz-placeholder { text-align:right; }

/*Remove Arrows/Spinners 
Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
