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

    addplaylist : function(log, cb){
        db.collection("playlist").insertOne(log,function(err,result){
            
        });
    }

}

module.exports = dataLayer; 