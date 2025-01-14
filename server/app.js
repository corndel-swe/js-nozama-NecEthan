import express from 'express'
import User from '../models/User.js'
const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  try {
    const result = await User.addUser(req.body);
    res.status(200).json({ result});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


app.post('/users/login', async (req, res) => {
  const result = await User.loginUser(req.body.username, req.body.password)
  if (result) {
    res.status(200).json({ result })
  } else {
    res.status(404).json({error: "user does not exist"})
  }
})
app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await User.deleteUser(userId);

    if (result) {
      res.status(200).json({ msg: 'User successfully deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
});

export default app
