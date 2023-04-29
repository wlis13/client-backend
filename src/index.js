const express = require('express');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use('/images', express.static(`${__dirname}/images`));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT']
};

app.use(cors(corsOptions));

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "x-custom-header");
  next();
});

app.use(express.json());

app.use('/', userRouter);
app.use('/', productsRoutes);
// app.use('/', saleRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const port = process.env.PORT;

app.listen(port);
console.log(`Api rodando na porta ${port}`);
