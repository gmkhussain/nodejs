var Sequelize = require('sequelize');
var employers = require('../models/index').employers;

module.exports = function (app, sequelize) {
	
	app.get('/', function (req, res) {
	  res.render('front/index', {});
	});
	
    app.get('/user-create', function (req, res) {
		      employers.findAll().then(function (user) {
			
        res.render('front/create', {
            page_title: "Employer Profile",
            authCheck: "",
			user: user,
			
            message: req.flash()
        });
		});
    });
	
}