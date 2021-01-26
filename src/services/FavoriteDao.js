class FavoriteDao {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll(userId, fields) {
    const query = `SELECT * FROM FAVORITES WHERE USERID = ? AND ${Object.keys(
      fields
    )
      .map((key) => `${key} = ?`)
      .join(', ')} AND ACTIVE = TRUE`;
    console.log('get favorites: Running query:', query);
    const parameters = [userId, ...Object.values(fields)];
    console.log('parameters on select', parameters);
    return await this.connection.query(query, parameters);
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
    console.log('parameters on update', parameters);
    return rows;
  }

  async save(user) {
    const sql = 'INSERT INTO FAVORITES SET ?;';
    return await this.connection.query(sql, user);
  }
}

export default FavoriteDao;
