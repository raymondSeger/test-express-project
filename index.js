const express           = require('express');
const orm               = require("orm");
const app               = express();
const server            = require('http').createServer(app);
const io                = require('socket.io')(server);
const exphbs            = require('express-handlebars');
const bodyParser        = require('body-parser');
const Promise           = require('bluebird');
const request           = require('request');
const fs                = require('fs');
const morgan            = require('morgan');
const path              = require('path');
const cookieParser      = require('cookie-parser');
const session           = require('express-session');
const FileStore         = require('session-file-store')(session);
const main_urls         = require('./routes/main-urls');

// use session
app.use(session({
    store               : new FileStore(),
    secret              : 'keyboard cat',
    resave              : false,
    saveUninitialized   : true
}));

// use ORM
/*
app.use(orm.express("mysql://root@localhost/express", {
    define: function (db, models, next) {
        next();
    }
}));
*/

// use cookie parser
app.use(cookieParser());

// use body-parser
// All the parsers accept a type option which allows you to change the Content-Type that the middleware will parse.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.text());
app.use(bodyParser.raw());

// Register '.handlebars' extension with The handlebars Express
app.engine('handlebars', exphbs({extname: 'handlebars', defaultLayout: 'main', layoutsDir: __dirname + '/views/'}));
app.set('view engine', 'handlebars');

// use static files
app.use('/public', express.static('public'));

// use Morgan
let accessLogStream = fs.createWriteStream(
      path.join(__dirname, '/logs/access.log'), {flags: 'a'}
 );
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));





// Load the main urls
app.use('/', main_urls);


// socket IO connections
io.on('connection', function(){
    console.log('someone connected through socket.io');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});