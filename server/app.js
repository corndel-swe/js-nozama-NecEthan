import express from 'express'
import User from '../models/User.js'
const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  try {
    await User.addUser(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


app.post('/users/login', async (req, res) => {
  const result = await User.loginUser(req.body.username, req.body.password)
  if (result) {
    res.status(200).json({ result })
  } else {
    res.status(401).json({error: "user not found"})
  }
})

app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      await User.deleteUser(userId);
      res.status(200).json({ msg: 'User successfully deleted' });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
    
});


export default app
