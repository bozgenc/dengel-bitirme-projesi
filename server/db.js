const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: 'dengel.22',
    host: 'localhost',
    port: 5432,
    database: "dengelDB"
});

module.exports = pool;
