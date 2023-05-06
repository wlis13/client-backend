const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');
const { salesRoutes } = require('./routes/sales.routes');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
}))

app.use('/images', express.static(`${__dirname}/images`));
app.use(express.json());

app.use('/', userRouter);
app.use('/', productsRoutes);
app.use('/', salesRoutes);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const port = process.env.PORT;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vokq4pn.mongodb.net/`)
  .then(() => {
    console.log('connection start success!');
    app.listen(port);
  })
  .catch((error) => console.log(error));
