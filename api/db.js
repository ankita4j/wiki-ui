var md = require('markdown-it')();
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.listPages = function(owner, callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        var query = { creator : owner };
        var projection = {title: 1, create_date: 1};
        dbo.collection("page").find(query).project(projection).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            callback(result)

        });
    });
}

exports.getPage = function(id, callback){
    console.log(id)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        dbo.collection("page").findOne(ObjectId(id), function(err, result) {
            if (err) throw err;
            db.close();
            result.content_html = md.render(result.content)
            callback(result)

        });
    });
}

exports.savePage = function(id, doc, cb){
    doc['_id'] = ObjectId(id)

    console.log(doc)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        dbo.collection("page").save(doc,{},function (err, result) {
            if (err) throw err;
            db.close();
            cb(result.result)
        });
    });
}

// ggg= this

// ggg.savePage("5b260aae8a3b28ce1664f206",{title: "wiki-ui", content:"hello"}, function (result) {
//     console.log(result)
//
// })

// ggg.listPages("ankita", function (pageList) {
//     console.log(pageList.length)
//     console.log(pageList[0])
//     ggg.getPage(pageList[0]._id,function (page) {
//         console.log(page)
//
//     })
// })