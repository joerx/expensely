'use strict';

const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(__dirname));

app.listen(PORT, () => 
  console.log('Node app is running on port', PORT)
);
