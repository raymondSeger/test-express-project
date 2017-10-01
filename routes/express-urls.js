const express   = require('express');
const router    = express.Router();

router.get('/user/:id', function(req, res){
    // get URL param value
    res.send('user ' + req.params.id);
});

router.get('/headersSent', function(req, res){
      console.log(res.headersSent); // false
      res.send('OK');
      console.log(res.headersSent); // true
});

router.get('/resLocals', function(req, res){
    res.locals.age = 20;
    res.locals.name = 'Jett';
    b = res.locals;
    res.send('OK');
});

router.get('/resAppend', function(req, res){
    res.append('Warning', '199 Miscellaneous warning');
    res.send('OK');
});

router.get('/resAttachment', function(req, res){
    // res.attachment(); // get the current file
    res.attachment(__dirname + '../public/img/2PACKB7881_1.jpg'); // get the image
    res.send('OK');
});

router.get('/resDownload', function(req, res){
    res.download(__dirname + '/../public/img/2PACKB7881_1.jpg'); // get the image
});

router.get('/resGet', function(req, res){
    res.send( res.get('X-Powered-By') );
});


module.exports = router;