class UserDao {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    return await this.connection.query('SELECT * FROM USER');
  }

  async getByUsername(username) {
    const sql = 'SELECT * FROM USER WHERE USERNAME = ?';
    return await this.connection.query(sql, username);
  }

  async login(username, password) {
    const sql = 'SELECT * FROM USER WHERE USERNAME = ? AND PASSWORD = ?';
    return await this.connection.query(sql, [username, password]);
  }

  async save(user) {
    const sql = 'INSERT INTO USER SET ?;';
    return await this.connection.query(sql, user);
  }
}

export default UserDao;
