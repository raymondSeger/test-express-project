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


module.exports = router;