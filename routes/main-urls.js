const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

// define the home page route
router.get('/', function (req, res) {
    res.render('main', { title: 'Hey', message: 'Hello there!' });
});

// define the home page route
router.get('/test-nodejs', function (req, res) {

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

router.get('/using-timeout-nodejs', function (req, res) {

    function myFunc(arg) {
        console.log(arg);
        res.render('main', { title: 'Hey', message: 'Hello there!' });
    }

    setTimeout(myFunc, 1000, 'funky');
});

// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

module.exports = router;