var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

var dataLayer = require('./datalayer-historique.js');

app.use(cors());

app.get('/get_historique/:user', function (req, res) {
    dataLayer.get_historique(req.params.user,function(maliste){
        res.json(maliste)
    })
});

module.exports=app;