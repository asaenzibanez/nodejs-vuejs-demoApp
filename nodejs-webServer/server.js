/*
 * @File Name          : server.js
 * @Description        : Setup Node Server
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

const db = require("./app/models");

/*------------------------------------------------------------
  Drop BD and re-sync sequelize changes --> Development stage
  ------------------------------------------------------------
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node web Server." });
});


require("./app/routes/bankingTransaction.routes")(app);

/*--------------------------------------
  set port, listen for requests
  --------------------------------------*/
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app