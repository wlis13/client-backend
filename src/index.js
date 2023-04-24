const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/errorHandler');
require('express-async-errors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const { userRouter, productRouter, saleRouter, adminRouter } = require('./routes');

app.use('/images', express.static(`${__dirname}/images`));

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/sale', saleRouter);
app.use('/admin', adminRouter);
app.use('/customer', saleRouter);

app.use(handleError);

const port = process.env.PORT || 3001;

app.listen(port);
console.log(`Api rodando na porta ${port}`);
