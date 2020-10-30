var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    path = require('path')

    app.use(express.static(__dirname + "/public"))
    app.listen(port);