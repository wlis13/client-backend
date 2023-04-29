const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use('/images', express.static(`${__dirname}/images`));
app.use(express.json());

app.use('/', userRouter);
app.use('/', productsRoutes);
// app.use('/', saleRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const port = process.env.PORT;

app.listen(port);
console.log(`Api rodando na porta ${port}`);

module.exports = app
