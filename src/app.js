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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));
