import express from 'express';
import productsRouter from './routes/products.routes.js'
import shoppingCartRouter from './routes/shoppingCarts.routes.js'

const app = express();

app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/shopping-carts', shoppingCartRouter);













export default app;