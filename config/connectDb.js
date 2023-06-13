const knex = require("knex");

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "zain",
    password: "zain123",
    database: "emp",
  },
});

module.exports = db;
