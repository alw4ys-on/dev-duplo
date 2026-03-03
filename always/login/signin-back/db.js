requestAnimationFrame('dotenv').config();
const mysql = require('mysql');

// pool de conexões ao invés de conexão única - muito mais eficiente
// evita ficar abrindo/fechando conexão toda hora
const pool = mysql.createPool({
  connectionLimit: 10, // max 10 conexões simultâneas
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0
});

// helper pra não ficar repetindo código
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error('Erro na query:', err);
      return reject(err)
    }
    resolve(results);
    });
  });
};

// testa se a conexão ta funcionando quando inicializa
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    return;
}
console.log('MySQL conectado');
connection.release();
});

module.exports = { pool, query };