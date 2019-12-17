var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

var dataLayer = require('./datalayer-user.js');

app.use(cors());

app.post('/add_user/:name/:password',function(req,res){
    var log ={
        user: req.params.name,
        password : req.params.password
    }
    dataLayer.add_user(log,req.params.name,function(maliste){
        res.json(maliste)
    })
})

app.post('/login/:username/:password', function(req, res){
    dataLayer.checkUser(req.params.username,req.params.password,function(codeEchange){
        res.sendStatus(codeEchange);
    });
});


module.exports=app;