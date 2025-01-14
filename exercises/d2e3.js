// https://tech-docs.corndel.com/express/body-and-headers.html

import express from 'express'

const app = express()
app.use(express.json()) // <-- important!

const alarms = [
  {
    time: '08:30',
    message: 'Wake up!'
  },
  {
    time: '17:00',
    message: 'Go home!'
  }
]

app.get('/alarms', (req, res) => {
  res.json(alarms);
})

app.get('/alarms/:index', (req, res) => {
  const index = req.params.index;
  res.json(alarms[index])

})


app.post('/alarms', (req, res) => {
  const payload = req.body;
  alarms.push(payload);  

  res.status(201).json({
    message: 'Alarm added',
  });
});
export default app
