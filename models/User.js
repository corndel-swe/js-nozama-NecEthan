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
}

export default User
