class FavoriteDao {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    return await this.connection.query('SELECT * FROM FAVORITES');
  }

  async getById(favId) {
    const sql = 'SELECT * FROM USER WHERE favId = ?';
    return await this.connection.query(sql, favId);
  }

  async modify(userId, update) {
    const query =
      'Update FAVORITES SET ' +
      Object.keys(update)
        .map((key) => `${key} = ?`)
        .join(', ') +
      ' WHERE favId = ?';
    const parameters = [...Object.values(update), userId];
    console.log('updateUser: Running query:', query);
    const [rows, meta] = await this.connection.query(query, parameters);
    return rows;
  }

  async save(user) {
    const sql = 'INSERT INTO FAVORITES SET ?;';
    return await this.connection.query(sql, user);
  }
}

export default FavoriteDao;
