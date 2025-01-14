import db from '../db/index.js'

class User {
  static async findAll() {
    const query = `
      select id, username, firstName, lastName, email, avatar 
      from users
    `
    const results = await db.raw(query)
    return results
  }

  static async findById(id) {
    const query = `SELECT * FROM users WHERE id = ?`
    const results = await db.raw(query, [id])

    const user = results[0]
    delete user.password

    return user
  }

  static async addUser(user) {

    const fields = ['username', 'firstName', 'lastName', 'email', 'avatar', 'password'];

    for (let field of fields) {
      if (!user[field]) {
        throw new Error('missing property')
      }
    }

    const query = `
    INSERT INTO users (username, firstName, lastName, email, avatar, password)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    const results = await db.raw(query, [
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.avatar,
      user.password]);
    
    delete results.password
    return results;
  }

  static async loginUser(username, password) {

    const query = `SELECT * from users WHERE username = ? AND password = ?`;

    const results = await db.raw(query, [
      username,
      password
    ])

    if (results.length === 0) {
      return null;
    }

    delete results[0].password
    return results;
  }

  static async deleteUser(userId) {
    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    const checkResults = await db.raw(checkQuery, [userId]);
  
    if (checkResults.length === 0) {
      return null;
    }

    const query = `DELETE FROM users WHERE id = ?`;

    await db.raw(query, [userId])

    return true;
  }
}

export default User
