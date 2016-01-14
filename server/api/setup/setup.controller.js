'use strict';

//modules
var Bromise = require('bluebird');

exports.get = function(req, res) {
	var setupHtml = "<!DOCTYPE html><html><head><title>Engager Setup</title></head><body>";
	setupHtml += "<div class='container'><div class='row'><div class='col-md-8 col-md-offset-2'>";
	setupHtml += "<h2>Thank you for setting up the API. Use this heroku button to deploy the User Interface</h2>";
	setupHtml += "<p>Please follow <a href='http://gonimbly.github.io/engager/setup.html' target='blank'>the documentation</a> for full installation instructions</p>";
	setupHtml += "<a href='https://heroku.com/deploy?template=https://github.com/gonimbly/engager-ui/tree/master' target='blank'>";
	setupHtml += "<img src='https://www.herokucdn.com/deploy/button.png' alt='Deploy'></a>";
	setupHtml += "<p class='text-muted' style='margin-top:40px'><a href='http://www.gonimbly.com' target='blank'>Go Nimbly, 2015.</a></p>";
	setupHtml += "</div></div></div>";	
	setupHtml += "<link href='http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet' type='text/css'>";
	setupHtml += "</body></html>";
	res.send(setupHtml);
};