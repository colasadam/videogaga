var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

var dataLayer = require('./datalayer-historique.js');

app.use(cors());

app.get('/', function (req, res) {
    console.log("home2");
    res.sendFile(__dirname + '/page_historique.html');
});
app.post('/get_historique', function (req, res) {
    var user = {
        user : req.body.utilisateur
    }
    console.log("api")
    console.log(user)
    dataLayer.get_historique(user,function(maliste){
        res.send(maliste)
    })
});

app.post('/add_tohistorique',function(req,res){
    var log ={
        user: req.body.utilisateur,
        video: req.body.videolist
    }
    dataLayer.add_tohistorique(log,function(maliste){
        res.json(maliste)
    })
});

module.exports=app;