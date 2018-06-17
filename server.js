const express = require('express');

const db = require('./api/db');

var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

var path = require('path');

app.listen(8000, () => {
  console.log('Server started!');
});


app.use(express.static('html'))

app.get('/pages', function(req, res) {
    db.listPages("ankita", function (pages) {
        console.log(pages)
        res.send(pages)
    })
});
app.get('/page/:pageID', function(req, res) {
    db.getPage(req.params.pageID, function (page) {
        console.log(page)
        res.send(page)
    })
});


app.put('/page/:pageID', function (req, res) {
    console.log(req.body)

    db.savePage(req.params.pageID, req.body, function(data){

        res.send("ok")
    });
})

// app.get('/p/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/p/*', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});


