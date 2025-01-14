import express, { Router } from 'express'

const app = express()
app.use(express.json())
const router = Router()

/**
 * Hint: Look at app.use() at the bottom of the file -
 * it already supplies the /endpoint prefix to paths in the router
 */

let state = {
  count: 0
}

app.get('/counter', (req, res) => {
  res.status(200).json(state);
})

app.put('/counter/increment', (req, res) => {
  state.count = state.count + 1;
  res.status(200).json(state);
})

app.use('/counter', router)

export default app
