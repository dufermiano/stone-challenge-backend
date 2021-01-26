import mysql from 'mysql2/promise';

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      user: 'root',
      password: 'rootroot',
      host: 'localhost',
      database: 'STONE',
    });

    console.log('Conectou no MySQL!');
    return connection;
  } catch (error) {
    console.log(error);
  }
}

export { connectDB };
