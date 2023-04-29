const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');
const { productsRoutes } = require('./routes/products.routes');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus : 200
}));

app.use('/images', express.static(`${__dirname}/images`));
app.use(express.json());

const PATH_USERS = "../../database/users.json";

app.use('/', userRouter);
app.use('/', productsRoutes);
// app.use('/', saleRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);
app.get("/test", async (req, res) => {
  const { email } = req.body;
  const fileUsers = path.join(__dirname, PATH_USERS);
  const dataUsers = JSON.parse(await fs.readFile(fileUsers, "utf-8"));
  const getUser = dataUsers.find((user) => user.email === email);
  const token = await generateToken(getUser);
  res.status(200).json({ token });
})

const port = process.env.PORT;

app.listen(port);
console.log(`Api rodando na porta ${port}`);
