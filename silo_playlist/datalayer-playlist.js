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

    getplaylist : function(username, cb) {
        console.log(username);
        db.collection("playlist").find({"user": username}).toArray(function(err, docs) { //Docs est le résultat de find
            console.log(docs)
            cb(docs);
        });
    },

}

module.exports = dataLayer; 