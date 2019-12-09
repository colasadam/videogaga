var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./api-route.js');

var app =express();

app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application
app.use(express.static(__dirname));
app.use(session({secret: "Shh, its a secret!"}));
app.use(session({
    name :"Cookiee AppMob"
 }));

app.use(router);

app.listen(process.env.PORT || 8080);