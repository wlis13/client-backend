const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');
const { salesRoutes } = require('./routes/sales.routes');

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());
app.use('/images', express.static(`${__dirname}/images`));

app.use('/', userRouter);
app.use('/', productsRoutes);
app.use('/', salesRoutes);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const dbUser = process.env.DB_USER || 'wlissesfernando285';
const dbPassword = process.env.DB_PASSWORD || 'app-delivery';
const port = process.env.PORT;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vokq4pn.mongodb.net/`)
  .then(() => {
    console.log('connection start success!');
    app.listen(port);
  })
  .catch((error) => console.log(error));
