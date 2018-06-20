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

/** API */
/* list page */
app.get('/api/pages', function(req, res) {
    db.listPages("ankita", function (pages) {
        console.log(pages)
        res.send(pages)
    })
});

/* get page */
app.get('/api/page/:pageID', function(req, res) {
    db.getPage(req.params.pageID, function (page) {
        console.log(page)
        res.send(page)
    })
});

/* update page */
app.put('/api/page/:pageID', function (req, res) {
    console.log(req.body)
    db.savePage(req.params.pageID, req.body, function(data){
    res.send(data)
    });
})

/* create new page */
app.put('/api/page/', function (req, res) {
    console.log(req.body)
    db.savePage(null, req.body, function(data){
    res.send(data)
    });
})

// app.get('/p/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });



/** UI View */

app.get('/p/*', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});


//Bookmark

app.put('/api/bookmark/:pageID', function (req, res) {
    db.createBookmark(req.params.pageID, "ankita", function(data){
        res.send(data)
    });
})
app.get('/api/bookmark/:pageID', function(req, res) {
    db.getBookmark(req.params.pageID, function (page) {
        console.log(page)
        res.send(page)
    })
});


