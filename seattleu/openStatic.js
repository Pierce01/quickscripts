var express = require('express');
var app = express();

app.use(express.static('main'));
app.listen(3000);

console.log('Loaded')