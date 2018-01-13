# NodeJS :rocket: :sparkles:

Doc: http://docs.sequelizejs.com/


#### 1. Download and intall nodejs installer

#### 2 Create 'node project folder' on localhost 

#### 3. open CMD
	type ```npm init```
	press 'enter'
	type ```project name```
	type: ```yes```
	

#### 4. check folder -> package.json
	
	Create file 'package.json'
	
	Add this code
```javascript
	{
	  "name": "mynode-app",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "dependencies": {
		"ejs": "^1.0.0",
		"express": "3.5.1",
		"express-myconnection": "1.0.4",
		"jade": "*",
		"mysql": "2.2.0"
	  },
	  "author": "H",
	  "license": "ISC"
	}
```
	

#### 5. create 'index.js' file on root


```javascript
/**
 * Module dependencies.
 */

var express = require('express');
http = require('http');
path = require('path');

//load customers route
app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 1800);
// App folder add here..
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(upload());

// App folder add here..
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*------------------------------------------
 connection peer, register as middleware
 type koneksi : single,pool and request 
 -------------------------------------------*/

app.use(
        connection(mysql, {
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306, //port mysql
            database: '_nodejs'
          }, 'pool') //or single
        );


app.get('/', function(req,res){ 
	res.render('index');
 } );
/*

app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);
*/

app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

```

#### 6. install packages
	```npm install``` and press enter

#### 7. Open cmd
	type node index.js
	press enter
	
visit: http://localhost:4444/

<b>Note:</b> Make sure if your are using database Apache/mySQL is runing 












### Cannot GET / Error
Make user url is correct
http://localhost:4300/user-create






### How to set the Default Route to another in NodeJS / ExpressJS
```javascript
/*
** File: root/app.js
*/
app.get('/', function (req, res) {
	//res.send('not found');
    res.redirect('/user-create');
    return false;
  }); 
```
