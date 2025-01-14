import express from 'express'
const app = express()

/**
 * Hint: res.send() will not accept numbers - you will need to
 * convert your result to a string before using res.send()
 */

// https://tech-docs.corndel.com/express/query-params.html
app.get('/sumup', (req, res) => {
  const n = req.query.n;

  if (!n) {
    return res.send('0');
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  res.send(sum.toString())


})

// https://tech-docs.corndel.com/express/query-params.html
app.get('/multiply/:x/:y', (req, res) => {
  const x = req.params.x;
  const y = req.params.y;

  const result = x * y;

  res.send(result.toString());
});



export default app
