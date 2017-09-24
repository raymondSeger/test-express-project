const express   = require('express');
const router    = express.Router();
const fs        = require('fs');
const calculate = require('../my_functions/calculate');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

router.get('/', function (req, res) {
    res.render('main', { title: 'Hey', message: 'Hello there!' });
});

router.get('/use-external-functions', function (req, res) {
    let the_result  = calculate.sum(1, 2);
    let the_result2 = calculate.myFunction1(4,2);
    console.log(the_result);
    console.log(the_result2);
    res.send('use-external-functions');
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