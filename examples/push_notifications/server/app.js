var http = require('http');
var querystring = require('querystring');

var PORT = parseInt(process.argv[2] || 6666, 10);

// API
// ---
// POST /register
// POST /unregister
// POST /
// GET /(\d+)

var routes = [
    [ 'post', '/register', registerClient ]
];

http.createServer(function(request, response) {
   
    var requestMethod = request.method;
    var requestURL = request.url;

    console.log(requestURL, requestMethod);

    var responseHandler = parseRoute(requestMethod, requestURL);

    if(responseHandler) {
        readBodyData(request, function() {
            responseHandler(request, response);
        });
    } else {
        
    }

    // response.write('hey');
    // response.end();

}).listen(PORT);


function parseRoute(requestMethod, requestURL) {

    for(var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var routeMethod = route[0].toUpperCase();
        var routeRegExp = new RegExp(route[1]);

        console.log(requestURL, routeRegExp.test(requestURL));
        console.log(requestMethod, routeMethod);

        if(requestMethod === routeMethod) {

            var match = routeRegExp.exec(requestURL);

            if(match) {
                console.log(match);
                console.log('eeh');

                return route[2];
            }
        }
    }
}


function readBodyData(request, callback) {

    if(request.method === 'POST') {
        
        var body = '';
        
        request.on('data', function(data) {
            body += data;
        });

        request.on('end', function() {
            var post = querystring.parse(body);
            request.post = post;
            callback();
        });

    } else {
        callback();
    }

}


function registerClient(request, response) {
    console.log('registering client', request.post);

    response.write('register');
    response.end();
}

console.log('server listening at', PORT);
