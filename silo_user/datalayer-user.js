var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://adam:manureva0612@cluster0-jiovk.mongodb.net/Silo_User?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser :true});
var ObjectId = require('mongodb').ObjectID;
var db;



var dataLayer ={

    init : function(cb){
        client.connect(function(err){
            if(err) throw err;
            db =client.db("Silo_User");
            cb();
        });
    },

    add_user : function(log,user, cb) {
        db.collection("user").count({"user": user},function(err, result) {
            console.log(result)
            if(result ==0){
                db.collection("user").insertOne(log,function(err,docs){
                    db.collection("user").find({"user":user}).toArray(function(err,docs){
                        console.log(docs)
                        cb(docs)
                    })
                });
            }
            else{
                cb("utilisateur déjâ existant")
            }
        })

    },

    checkUser: function(username,password,cb){
        db.collection("user").count({"user": username, "password" : password },function(err, result) {
            console.log(result)
            if(result!== 0)
            {
               //session.username=username;
               //Si je me suis co je lui envoie liste.html
               //console.log("tentative de sendfile")
               cb(200)
            }
            else
               cb(403);
          });
    },

    changepassword:function(username,newpassword,cb){
        db.collection("user").find({"user":username}).toArray(function(err,docs){
            var id = {
                "_id" : ObjectId(docs[0]["_id"])
            }
            var data = {
                $set:{
                    password : newpassword
                }
            }
            db.collection("user").updateOne(id,data,function(err,docs){
                cb(200)
            })
        })
    },
}



module.exports = dataLayer; 