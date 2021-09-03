const ldap = require('ldapjs');
const mysql = require("mysql");
const server = ldap.createServer();
const addrbooks = {};
const userinfo = {};
const ldap_port = 10389;
const basedn = "dc=example, dc=com";
const company = "Example";
const db = mysql.createClient({
  user: "abook",
  password: "abook",
  database: "abook"
});

db.query("SELECT * from deladmin",
         (err, contacts) => {
  if (err) {
    console.log("Error fetching contacts", err);
    process.exit(1);
  }

  for (const contact of contacts) {
    if (!addrbooks.hasOwnProperty(contact.username)) {
      addrbooks[contact.username] = [];
      userinfo["cn=" + contact.username + ", " + basedn] = {
        abook: addrbooks[contact.username],
        pwd: contact.password
      };
    }

    const p = contact.name.indexOf(" ");
    if (p != -1)
      contact.firstname = contact.name.substr(0, p);

    p = contact.name.lastIndexOf(" ");
    if (p != -1)
      contact.surname = contact.name.substr(p + 1);

    addrbooks[contact.username].push({
      dn: "cn=" + contact.name + ", " + basedn,
      attributes: {
        objectclass: [ "top" ],
        cn: contact.name,
        mail: contact.email,
        givenname: contact.firstname,
        sn: contact.surname,
        ou: company
      }
    });
  }

  server.bind(basedn, (req, res, next) => {
    const username = req.dn.toString();
    const password = req.credentials;

    if (!userinfo.hasOwnProperty(username) ||
         userinfo[username].pwd != password) {
      return next(new ldap.InvalidCredentialsError());
    }

    res.end();
    return next();
  });

  server.search(basedn, (req, res, next) => {
    const binddn = req.connection.ldap.bindDN.toString();

    if (userinfo.hasOwnProperty(binddn)) {
      for (const abook of userinfo[binddn].abook) {
        if (req.filter.matches(abook.attributes))
          res.send(abook);
      }
    }
    res.end();
  });

  server.listen(ldap_port, () => {
    console.log("Addressbook started at %s", server.url);
  });
});