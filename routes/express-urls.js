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

module.exports = router;