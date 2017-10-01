const express       = require('express');
const router        = express.Router();
const app           = express();
const path          = require('path');
const os            = require('os');
const mkdirp        = require('mkdirp');
const favicon       = require('serve-favicon');
const fs            = require('fs-extra');
const moment        = require('moment');
const request       = require('request');
const compression   = require('compression');
const uuidv4        = require('uuid/v4');
const _             = require('underscore');
const cors          = require('cors');
const calculate     = require('../my_functions/calculate');

// favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// compression
app.use(compression());

// use CORS
app.use(cors());

// middleware 1
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

// another middleware
router.use(function timeLog2 (req, res, next) {
    console.log('Time2: ', Date.now());
    next()
});

router.get('/', function (req, res) {
    res.render('main', { title: 'Hey', message: 'Hello there!' });
});

router.get('/useUUID', function (req, res) {
    res.send( uuidv4() );
});

router.get('/useUnderscore', function (req, res) {

    let the_returned_array = _.countBy([1, 2, 3, 4, 5], function(num) {
        return num % 2 == 0 ? 'even': 'odd';
    });

    res.send( the_returned_array );
});

router.get('/useRequest', function (req, res) {
    request('http://www.google.com', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send( body ); // Print the HTML for the Google homepage.
    });
});


router.get('/useMoment', function (req, res) {
    res.send( moment().format('MMMM Do YYYY, h:mm:ss a') );
});

router.get('/readJSON', function (req, res) {

    fs.readJson( __dirname + '/../public/example.json', (err, packageObj) => {
      if (err) console.error(err);

      console.log(packageObj)
    });

    fs.writeJson(__dirname + '/../public/example2.json', {name: 'fs-extra', age: 20}, err => {
        if (err) return console.error(err);

        console.log('success!')
    });

    res.send('readJSON');
});

router.get('/get-set-session-data', function (req, res) {
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.end()
    } else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!');
    }

});

router.post('/get-post-data', function (req, res) {
    res.send('get-post-data');
});

router.get('/create-cookie', function (req, res) {
    res.cookie('cookieName', 'name', { maxAge: 900000 });

    res.send('create-cookie');
});

router.get('/use-cookie-parser', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies);

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);

    res.send('use-cookie-parser');
});

router.get('/use-os-functions', function (req, res) {

    let theString = os.EOL;
    let arch = os.arch();
    let constants = os.constants;
    let cpus = os.cpus();
    let freememory = os.freemem();
    let homedir = os.homedir();
    let hostname = os.hostname();
    let platform = os.platform();
    let releases = os.release();
    let tmpdir = os.tmpdir();
    let totalmemory = os.totalmem();
    let os_type = os.type();
    let uptime = os.uptime();
    let userInfo = os.userInfo;

    // use breakpoiints
    console.log(theString);

    res.send('use-os-functions');
});

router.get('/use-external-functions', function (req, res) {
    let the_result  = calculate.sum(1, 2);
    let the_result2 = calculate.myFunction1(4,2);
    console.log(the_result);
    console.log(the_result2);
    res.send('use-external-functions');
});

router.get('/use-file-system', function (req, res) {

    // create directories
    mkdirp(__dirname + '/../assets/a/b/c', function(err) {
        // path exists unless there was an error
        let a = ''
    });

    // read directory
    fs.readdir(__dirname + '/../assets/', function(err, files){
        let a =''
    });

    fs.realpath(__dirname + '/../assets/a.txt', function(err, resolvedPath){
        let a =''
    });

    fs.readFile(__dirname + '/../assets/a.txt', function(err, data){
        if (err) throw err;

        // data is Buffer object
        var data = data;
        var data_length = data.length;
        var data_in_string = data.toString('utf-8');
        var data_in_string_length = data_in_string.length;
    });

    res.send('use-file-system');
});

router.get('/async-file-read', function (req, res) {

    var a = __dirname;
    var b = __filename;

    fs.readFile(__dirname + '/../assets/a.txt', function(err, data){
        if (err) throw err;

        // data is Buffer object
        var data = data;
        var data_length = data.length;
        var data_in_string = data.toString('utf-8');
        var data_in_string_length = data_in_string.length;
    });

    res.render('main', { title: 'Hey', message: 'Hello there!' });
});

router.get('/using-timeout', function (req, res) {

    function myFunc(arg) {
        console.log(arg);
        res.render('main', { title: 'Hey', message: 'Hello there!' });
    }

    setTimeout(myFunc, 1000, 'funky');
});

router.get('/using-interval', function (req, res) {

    function intervalFunc() {
        console.log('Cant stop me now!');
    }

    setInterval(intervalFunc, 1500);
});

router.get('/immidiate', function (req, res) {

    console.log('before immediate');

    setImmediate(function(arg){
        console.log(`executing immediate: ${arg}`);
    }, 'so immediate');

    console.log('after immediate');

    res.send('test');

});

// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

module.exports = router;