var express = require('express');
var app = express();

app.get("/endpoint", function(req, res) {
    res.json({
        serverurl: process.env.API_URL
    });
});

app.use(express.static(__dirname + '/dist'));
var port = process.env.PORT || 3000;
console.log('Listening on ' + port);
app.listen(port);
