/**
 * Module dependencies.
 */
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
/* var controllers = require('./controllers'); */

var flash = require('connect-flash');
var http = require('http');
var path = require('path');
var expressValidator = require("express-validator");
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);


var app = express();



// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(bodyParser.json());

app.use(expressValidator());
app.set('view engine', 'ejs');


//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(upload());

app.use('/', express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); // session secret
 
app.use(flash()); // use connect-flash for flash messages stored in session

/*------------------------------------------
 connection peer, register as middleware
 type koneksi : single,pool and request 
 -------------------------------------------*/

//load employers route
require('./controllers/employer.js')(app); // Page Route

/* var admin = require('./controllers/admin');

var admin = require('./controllers/admin');
var forgot_password = require('./controllers/forgot_password'); */
 
app.get('/', function(req, res){
    res.sendfile('default.html', { root: __dirname + "/front/index" } );
});
	
/* 
app.get('/', controllers.list);
app.get('/forgot-password', forgot_password.index);
app.post('/forgot-password/send', forgot_password.send);
app.get('/password-link-sent', forgot_password.link_sent);
app.get('/reset-password', forgot_password.reset_password);
app.post('/forgot-password/save-new-password', forgot_password.save_new_password);
app.get('/reset-success', forgot_password.reset_success); */

/////admin
//app.get('/admin', admin.list);

//console.log(session);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
