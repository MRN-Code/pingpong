'use strict';

var config = require('config');

// Load the http module to create an http server.
var http = require('http');
var url = require('url');

var port = process.env.PORT || config.get('server.port');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var contentType, body;
    if (query.callback) {
        contentType = 'text/javascript';
        body = [query.callback, '(\'pong\');'].join('');
    } else {
        contentType = 'text/plain';
        body = 'pong';
    }
    response.writeHead(200, {"Content-Type": contentType});
    response.end(body);
});

server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at " + port);

