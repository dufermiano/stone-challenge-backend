class FavoritesDao {
  constructor(connection) {
    this.connection = connection;
  }

  // check exactly the favorite request, and if it is repeated will not be created again
  async getAllById(userId, fields) {
    const query = `SELECT * FROM FAVORITES WHERE USERID = ? AND ${Object.keys(
      fields
    )
      .map((key) => `${key} = ?`)
      .join(', ')}`;
    console.log('get favorites: Running query:', query);
    const parameters = [userId, ...Object.values(fields)];
    console.log('parameters on select', parameters);
    return await this.connection.query(query, parameters);
  }

  // get all actives favorites from user
  async getAllByUserId(userId) {
    const sql = 'SELECT * FROM FAVORITES WHERE userId = ? AND ACTIVE = TRUE';
    return await this.connection.query(sql, userId);
  }

  // update table favorites by favId
  async modify(favId, update) {
    const query =
      'Update FAVORITES SET ' +
      Object.keys(update)
        .map((key) => `${key} = ?`)
        .join(', ') +
      ' WHERE favId = ?';
    const parameters = [...Object.values(update), favId];
    console.log('updateUser: Running query:', query);
    const [rows, meta] = await this.connection.query(query, parameters);
    console.log('parameters on update', parameters);
    return rows;
  }

  // insert data on table favorites
  async save(user) {
    const sql = 'INSERT INTO FAVORITES SET ?;';
    return await this.connection.query(sql, user);
  }
}

export default FavoritesDao;
