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
    if(id){
        doc['_id'] = ObjectId(id)
    }

    console.log(doc)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        dbo.collection("page").save(doc,{},function (err, result) {
            if (err) throw err;
            db.close();
            if(id)
                cb(id)
            else
                cb(result['ops'][0]['_id'])

        });
    });
}

// ggg= this
//
// ggg.savePage("5b26d93d8fa04203bfc1761e",{title: "wiki-ui", content:"hello"}, function (result) {
//     console.log(result)
//
// })


exports.getBookmarks = function(user, callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        dbo.collection('bookmark').aggregate([
        {
            $match: {
              user:user
            }
        },
        {
            $lookup: {
                    localField: "pageId",
                    from: "page",
                    foreignField: "_id",
                    as: "info"
            }
        },
        { "$unwind": "$info" },
        { "$project": {
            "info._id": 1,
            "info.title": 1,
            }
        }
        ]).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            callback(result)
        });
    });
}

exports.createBookmark = function(pageId, user, cb){
    var doc={
             pageId : ObjectId(pageId),
             user : user
             }

    console.log(doc)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wiki-db");
        var query = { pageId : ObjectId(pageId),
                      user : user
                    };
        dbo.collection("bookmark").findOne(query,function(err, result) {
                                                           if (err) throw err;
                                                           db.close();
                                                           if(result)
                                                              cb(result._id)
                                                           else
                                                               dbo.collection("bookmark").save(doc,function (err, result) {
                                                                          if (err) throw err;
                                                                          db.close();
                                                                          cb(result['ops'][0]['_id'])
                                                                      });


                                                       });

    });
}

//this.getBookmarks("ankita",function(result){console.log(result)});
this.createBookmark("5b270e97a6bdb60571063efe","ankita",function(id){console.log(id)});
// ggg.listPages("ankita", function (pageList) {
//     console.log(pageList.length)
//     console.log(pageList[0])
//     ggg.getPage(pageList[0]._id,function (page) {
//         console.log(page)
//
//     })
// })