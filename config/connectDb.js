const knex = require("knex");

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "zain",
    password: "password",
    database: "mydb",
  },
});

module.exports = db;
