var md = require('markdown-it')();
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.defaultID="5b260aae8a3b28ce1664f206"


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
        dbo.collection("bookmark")
					.findOne(
						query,
						function(err, result) {
							if (err) throw err;
							if(result)
								cb(result._id)
							else{
								dbo.collection("bookmark")
									.save(doc,function (err, result) {
										if (err) throw err;
										cb(result['ops'][0]['_id'])
									});
							}
							db.close();
						}
					);
    });
}