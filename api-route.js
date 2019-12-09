var express = require('express');

var app = require('express').Router();;
var bodyParser = require('body-parser');

const Streamlink = require('streamlink');

var cors = require('cors');

var ytdl = require('ytdl-core');

app.use(cors());

app.get('/', function (req, res) {
    console.log("home");
    res.sendFile(__dirname + '/home.html');


    ytdl.getInfo("M9ak5x-NYxc", (err, info) => {
        if (err) throw err;
        let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        if (format) {
            console.log(format.url);
        }
    });

    /*var link = "https://www.youtube.com/watch?v=M9ak5x-NYxc";
    var stream = new Streamlink(link).output('./' + Date.now() + '.flv').start();

    stream.getQualities();

    stream.on('quality', (data) => {
        console.log(data);
    });
    
    stream.on('err', (err) => {
        console.log(err);
    });
    
    stream.on('end', (o) => {
        console.log("Stream ended");
        console.log(o);
    });
    
    stream.on('log', (data) => {
        console.log(data);
    });*/
});


app.get('/watch/:videoId', function (req, res) {
    ytdl.getInfo(req.params.videoId, (err, info) => {
        if (err) throw err;
        let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        res.json(format.url);
    })
});

module.exports = app


