var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

var dataLayer = require('./datalayer-playlist.js');

app.use(cors());

app.get('/get_playlist/:user', function (req, res) {
    dataLayer.getplaylist(req.params.user,function(maliste){
        res.json(maliste)
    })
});

module.exports=app;