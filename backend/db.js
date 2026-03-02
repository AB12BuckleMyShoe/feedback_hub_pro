const {Pool}  = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool ({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
})




module.exports = pool;