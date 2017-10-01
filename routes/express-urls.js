const express   = require('express');
const router    = express.Router();

router.get('/user/:id', function(req, res){
    // get URL param value
    res.send('user ' + req.params.id);
});

module.exports = router;