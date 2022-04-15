const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: 'can123',
    host: 'localhost',
    port: 5432,
    database: "DengelDB"
});

module.exports = pool;
