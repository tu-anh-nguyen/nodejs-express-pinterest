const express = require('express');
const app = express();
const { sequelize } = require('./models');
const { handleErrors } = require('./helpers/errors');

app.use(express.json());
app.use(express.static("."));

sequelize.sync({
  alter: true,
  // force: true,
});

const v1 = require('./routes/v1');

app.use('/api/v1', v1);
app.use(handleErrors);

app.listen(4000);
