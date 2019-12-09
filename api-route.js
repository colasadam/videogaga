var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

var cors = require('cors');

app.get('/', function(req, res) {
    console.log("home");
    res.sendFile(__dirname + '/home.html');;
});

module.exports = app