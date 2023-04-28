const express = require('express');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.routes');

dotenv.config();
const app = express();

app.use('/images', express.static(`${__dirname}/images`));

app.use(express.json());

app.use('/', userRouter);
// app.use('/', productRouter);
// app.use('/', saleRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);

const port = process.env.PORT;

app.listen(port);
console.log(`Api rodando na porta ${port}`);
