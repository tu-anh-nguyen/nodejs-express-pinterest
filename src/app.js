require('colors');
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');
const { handleErrors } = require('./helpers/errors');
const v1 = require('./routes/v1');

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

sequelize.sync({
  alter: true,
  // force: true,
});

// test
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/v1', v1);
app.use(handleErrors);

app.listen(4000, () => {
  console.log('App started at port 4000'.green);
});
