const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');

dotenv.config();
const app = express();
const dominio = ["http://localhost:3000"];
app.use(cors({
  origin: function(origin, callback) {
    if (dominio.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
