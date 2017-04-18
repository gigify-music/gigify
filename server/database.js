const pg = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: 'hrnyc6.ckc79xdn1lff.us-east-1.rds.amazonaws.com',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
const pool = new pg.Pool(config);
pool.on('error', err => console.error('idle client error', err.message, err.stack));
module.exports.query = (text, values, callback) => pool.query(text, values, callback);
module.exports.connect = callback => pool.connect(callback);
