'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var mandrill = require('mandrill-api/mandrill');


var model = bookshelf.Model.extend({
	tableName: 'rewards',
	hasTimestamps: true,

	sendEmail: function(user, reward) {
		//do stuff;
		if(process.env.MANDRILL_API_KEY){
			var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);
			var message = {
			    "html": "<p>Redeem your " + reward.name + " code, for " + reward.description + "</p>",
			    "text": "Redeem your " + reward.name + " code, for " + reward.description,
			    "subject": "Redeem " + reward.name,
			    "from_email": "engager@gonimbly.com",
			    "from_name": "Example Name",
			    "to": [{
			            "email": user.email,
			            "name": user.name,
			            "type": "to"
			        }],
			    "bcc_address": "sales@gonimbly.com"
			};
			var async = false;
			var ip_pool = "Main Pool";
			var send_at = "example send_at";
			mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
			    console.log(result);
			    /*
			    [{
			            "email": "recipient.email@example.com",
			            "status": "sent",
			            "reject_reason": "hard-bounce",
			            "_id": "abc123abc123abc123abc123abc123"
			        }]
			    */
			}, function(e) {
			    // Mandrill returns the error as an object with name and message keys
			    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
			    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
			});
		}
	}

});
module.exports = model;