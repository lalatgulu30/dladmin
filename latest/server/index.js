const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 4001;
const cors = require("cors");
const bodyParser = require("body-parser");
const ldap = require("ldapjs");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "de-admin",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.get("/", (req, res) => {
  console.log("Landed on 4001 port page ");
});

app.get("/deladmin/pages/searchAccounts", (req, res) => {
  const userId = req.body.userid;
  console.log("checking the userid value:: " + userId);
  const sqlSelect = "SELECT * FROM deladmin where userid=userId";
  db.query(sqlSelect, userId, (err, result) => {
    console.log(sqlSelect);
    console.log("Deladmin in console");
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/deladmin/pages/validateAccount", (req, res) => {
  const userId = req.body.userid;
  console.log("checking the userid value:: " + userId);
  const sqlSelect = "SELECT * FROM businessadmin";
  db.query(sqlSelect, (err, result) => {
    console.log(sqlSelect);
    console.log("Business Admin in console");
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// function authenticateDN(username, password) {
//   const client = ldap.createClient({
//     url: "ldap://ldap.netscape.com/",
//   });
//   client.bind(cn=username, password, function (err) {
//     if (err) {
//       console.log("Error in new connection" + err);
//     } else {
//       console.log("Success");
//     }
//   });

//   client.on("error", (err) => {});
// }
// authenticateDN('uid=bjensen', 'password');
app.listen(4001, () => {
  console.log("running on port 4001");
});
