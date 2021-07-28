const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3002;
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "de-admin",
});
app.use(cors());
app.use(express.json());
app.get("/deladmin/pages/searchAccounts", (req, res) => {
  const userid = req.body.userid;
  console.log("checking the userid value:: " + userid);
  console.log("Deladmin in console");
  res.send({ message: "deladmin" });
});

app.listen(3002, () => {
  console.log("running on port 3002");
});
