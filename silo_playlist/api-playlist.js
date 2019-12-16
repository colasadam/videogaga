var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

var dataLayer = require('./datalayer-playlist.js');

app.use(cors());

app.get('/get_playlists/:user', function (req, res) {
    dataLayer.getplaylists(req.params.user,function(maliste){
        res.json(maliste)
    })
});

app.get('/get_playlist/:user/:name', function(req,res){
    dataLayer.getplaylist(req.params.user,req.params.name,function(maliste){
        res.json(maliste)
    })
})

app.post('/add_playlist/:user/:name',function(req,res){
    var log ={
        user: req.params.user,
        name : req.params.name,
        videos : []
    }
    dataLayer.addplaylist(log,req.params.user,function(maliste){
        res.json(maliste)
    })
})

app.post('/delete_playlist/:user/:name',function(req,res){

    dataLayer.delete_playlist(req.params.user,req.params.name,function(maliste){
        res.json(maliste)
    })
})

app.post('/addto_playlist/:user/:nameplaylist/:videoid',function(req,res){
    dataLayer.addto_playlist(req.params.user,req.params.nameplaylist,req.params.videoid,function(maliste){
        res.json(maliste)
    })
})

app.post('/deleteto_playlist/:user/:nameplaylist/:videoid',function(req,res){
    dataLayer.deleteto_playlist(req.params.user,req.params.nameplaylist,req.params.videoid,function(maliste){
        res.json(maliste)
    })
})

module.exports=app;