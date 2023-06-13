const knex = require("knex");

const db = knex({
  client: "mysql",
  connection: {
    host: "sql12.freesqldatabase.com",
    user: "sql12625836",
    password: "23LpBefahw",
    database: "sql12625836",
  },
});

module.exports = db;
