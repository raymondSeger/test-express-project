const express       = require('express');
const router        = express.Router();
const fileUpload    = require('express-fileupload');
const app           = express();

// use file-upload
app.use(fileUpload());

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

router.get('/resJSON', function(req, res){
    res.status(500).json({ error: 'message' });
});

router.get('/resLocation', function(req, res){
    res.location('http://example.com');
    res.send( res.get('X-Powered-By') );
});

router.get('/resRedirect', function(req, res){
    res.redirect('http://example.com');
});

router.get('/resRedirectRender', function(req, res){
    res.locals.fromLocal = 20; // not detected in view
    res.render('expresstest1', { message: 'Tobi' });
});

router.get('/resSend', function(req, res){
    res.send(new Buffer('whoop'));
});

router.all('/reqGetPostDataIncludingCookies', function(req, res){

    a = req.app;
    c = req.body;
    d = req.cookies;
    e = req.fresh;
    f = req.params;
    g = req.query;

    res.send('whoop');
});

router.post('/upload', function(req, res) {
    // THIS WILL ONLY WORK if there is no application/x-www-form-urlencoded header, this works because of express-fileupload
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/../uploads/' + sampleFile.name , function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

module.exports = router;