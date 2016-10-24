'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api', (req, res) => {
  res.status(200).json({msg: 'ok'});
});

app.listen(PORT, () => 
  console.log('Node app is running on port', PORT)
);
