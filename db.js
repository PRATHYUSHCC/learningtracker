const {Pool}=require('pg');
require('dotenv').config();

const pool = new Pool({
    user :process.env.pg_user,
    database:process.env.pg_db,
    host:process.env.pg_host,
    password:process.env.pg_pass,
    port:process.env.pg_port

});

module.exports=pool;
