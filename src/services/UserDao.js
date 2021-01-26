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

  async getByUserId(userId) {
    const sql = 'SELECT * FROM USER WHERE userId = ?';
    return await this.connection.query(sql, userId);
  }

  async login(username, password) {
    const sql = 'SELECT * FROM USER WHERE USERNAME = ? AND PASSWORD = ?';
    return await this.connection.query(sql, [username, password]);
  }

  async modify(userId, update) {
    const query =
      'Update USER SET ' +
      Object.keys(update)
        .map((key) => `${key} = ?`)
        .join(', ') +
      ' WHERE userId = ?';
    const parameters = [...Object.values(update), userId];
    console.log('updateUser: Running query:', query);
    const [rows, meta] = await this.connection.query(query, parameters);
    return rows;
  }

  async save(user) {
    const sql = 'INSERT INTO USER SET ?;';
    return await this.connection.query(sql, user);
  }
}

export default UserDao;
