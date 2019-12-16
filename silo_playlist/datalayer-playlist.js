var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://adam:manureva0612@cluster0-jiovk.mongodb.net/Silo_playlist?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser :true});
var ObjectId = require('mongodb').ObjectID;
var db;

var dataLayer ={

    init : function(cb){
        client.connect(function(err){
            if(err) throw err;
            db =client.db("Silo_playlist");
            cb();
        });
    },

    getplaylists : function(username, cb) {
        db.collection("playlist").find({"user": username}).toArray(function(err, docs) { //Docs est le résultat de find
            console.log(docs)
            cb(docs);
        });
    },

    getplaylist : function(username,name, cb) {
        db.collection("playlist").find({"user": username,"name":name}).toArray(function(err, docs) { //Docs est le résultat de find
            console.log(docs)
            cb(docs);
        });
    },

    addplaylist : function(log,user,cb){
        db.collection("playlist").insertOne(log,function(err,docs){
            db.collection("playlist").find({"user":user}).toArray(function(err,docs){
                cb(docs)
            })
        });
    },

    delete_playlist : function(user,name,cb){
        var playlist ={
            "name":name
        }
        db.collection("playlist").deleteOne(playlist,function(err,docs){
            db.collection("playlist").find({"user":user}).toArray(function(err,docs){
                cb(docs)
            })
        })
    },

    addto_playlist : function(user,playlist,videoid,cb){

        db.collection("playlist").find({"user":user,"name":playlist}).toArray(function(err,docs){
            var id = {
                "_id" : ObjectId(docs[0]["_id"])
            }
            var lvideos = docs[0]["videos"]
            lvideos.push(videoid)
            var data = {
                $set:{
                    videos : lvideos
                }
            }
            db.collection("playlist").updateOne(id,data,function(err,docs){
                db.collection("playlist").find({"user":user,"name":playlist}).toArray(function(err,docs){
                    cb(docs)
                })
            })
        })
    },

    deleteto_playlist : function(user,playlist,videoid,cb){

        db.collection("playlist").find({"user":user,"name":playlist}).toArray(function(err,docs){
            var id = {
                "_id" : ObjectId(docs[0]["_id"])
            }
            var lvideos = docs[0]["videos"]
   
            for( var i = lvideos.length-1; i--;){
                if ( lvideos[i] === videoid) lvideos.splice(i, 1);
                }
            var data = {
                $set:{
                    videos : lvideos
                }
            }
            db.collection("playlist").updateOne(id,data,function(err,docs){
                db.collection("playlist").find({"user":user,"name":playlist}).toArray(function(err,docs){
                    cb(docs)
                })
            })
        })
    }
    

}

module.exports = dataLayer; 