const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');
const { loginUserService } = require('./services/user.service');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/images', express.static(`${__dirname}/images`));
app.use(express.json());

app.post("/login", async (req, res) => {
  const userFromReq = req.body;
  const token = await loginUserService(userFromReq);
  res.status(200).json(token);
});
app.use('/', productsRoutes);
// app.use('/', saleRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const port = process.env.PORT;

app.listen(port);
console.log(`Api rodando na porta ${port}`);

module.exports = app
