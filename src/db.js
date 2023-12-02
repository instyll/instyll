const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  server: process.env.REACT_APP_DB_SERVER,
  database: process.env.REACT_APP_DATABASE,
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  options: {
    encrypt: true, // For Azure SQL, set to true
  },
};

console.log("ENV: " + process.env.DB_SERVER);

// Example: Perform a query
async function executeQuery(query) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error(err);
  } finally {
    sql.close();
  }
}

module.exports = { executeQuery };
