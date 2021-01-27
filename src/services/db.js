import mysql from 'mysql2/promise';

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
    });

    console.log('Conectou no MySQL!');
    return connection;
  } catch (error) {
    console.log(error);
  }
}

export { connectDB };
