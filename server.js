var express = require('express');
var app = express();

app.get("/endpoint", function(req, res) {
    res.send(process.env.API_URL);
});

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 3000);
