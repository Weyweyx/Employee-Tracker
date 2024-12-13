const { Client } = require('pg');
require('dotenv').config();
const fs = require('fs')

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: true
});

//const createTables = fs.readFileSync('/Users/wolfywolf/Desktop/Coding/Employee-Tracker/db/schema.sql').toString()

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database!')
    //client.query(createTables)
    //.then(()=> console.log('created tables'))
  })
  .catch((err) => console.error('Database connection error:', err.stack));

module.exports = client;