const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "steaua2015",
    host: "localhost",
    port: 5432,
    database: "notes"
})

module.exports = pool;