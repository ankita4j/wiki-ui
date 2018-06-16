const express = require('express');

const app = express();

var path = require('path');

app.listen(8000, () => {
  console.log('Server started!');
});


app.use(express.static('client'))
app.use(express.static('html'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'html/index.html'));
});


