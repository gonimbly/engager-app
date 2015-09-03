var express = require('express');
var app = express();

app.get("/endpoint", function(req, res) {
    res.json({
        serverurl: process.env.API_URL || "CHECKCK"
    });
});

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 3000);
