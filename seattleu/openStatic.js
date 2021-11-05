var express = require('express');
var app = express();

app.use(express.static('law'));
app.listen(3000);

console.log('Loaded')