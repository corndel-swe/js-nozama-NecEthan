import express from 'express'
import Product from '../models/Product.js';

const app = express()
app.use(express.json())

app.get('/products', async (req, res) => {
  const results = await Product.listOfProducts();
  res.status(200).json(results);
});

app.get('/products/:productId', async (req, res) => {

  const id = req.params.productId
  try {
    const results = await Product.getProductById(id);
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ msg: error.message})
  }

});

app.post('/products', async (req, res) => {

  const product = req.body
  try {
    await Product.AddProduct(product);
    res.status(201).json({ msg: 'product created'});
  } catch (error) {
    res.status(400).json({ msg: 'invalid request body'})
  }

});

app.get('/products/category/:categoryId', async (req, res) => {

  const categoryId = req.params.categoryId;
  try {
    const results = await Product.getProductsByCategory(categoryId);
    res.status(200).json(results)
  } catch (error) {
    res.status(404).json({ msg: error.message})

  }

  
  

})

export default app
