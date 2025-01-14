import knex from 'knex'
import { fileURLToPath } from 'url'

const url = new URL('./db.sqlite', import.meta.url)

const db = knex({
  client: 'sqlite3',
  connection: { filename: fileURLToPath(url) },
  useNullAsDefault: true
})

export default db