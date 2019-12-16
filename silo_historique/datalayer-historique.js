var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://adam:manureva0612@cluster0-jiovk.mongodb.net/Silo_historique?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser :true});
var ObjectId = require('mongodb').ObjectID;
var db;

var dataLayer ={

    init : function(cb){
        client.connect(function(err){
            if(err) throw err;
            db =client.db("Silo_historique");
            cb();
        });
    },

    get_historique : function(username, cb) {
        console.log(username);
        db.collection("historique").find({"user": username.user}).toArray(function(err, docs) { //Docs est le résultat de find
            cb(docs);
        });
    },

    add_tohistorique: function(log, cb){
        db.collection("historique").updateOne({"user":log.user},{$set : {"videos": log.video}}, function(err, result) {
            cb();
        });
    }

}

module.exports = dataLayer; 