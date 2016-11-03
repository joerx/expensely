'use strict';

const app = require('app');
const port = process.env.PORT || 3000;

// start
app.listen(port, () => 
  console.log('Node app is running on port', port)
);
