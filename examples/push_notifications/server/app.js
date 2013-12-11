var http = require('http');
var querystring = require('querystring');
var clients = [];
var eventSequenceNumber = 1;

var PORT = parseInt(process.argv[2] || 6666, 10);

// API
// ---
// POST /register
// POST /unregister
// POST /
// GET /(\d+)

var routes = [
    [ 'post', '/register', registerClient ],
    [ 'post', '/unregister', unregisterClient ]
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
        output404(request, response);        
    }


}).listen(PORT);

console.log('server listening at', PORT);

scheduleRandomEvent();


// ---


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


function output404(request, response) {
    response.write('404\nNothing found for ' + request.method + ' ' + request.url + '\n');
    response.end();
}


function findClientByChannelURL(url) {
    for(var i = 0; i < clients.length; i++) {
        var c = clients[i];
        if(c.channelURL === url) {
            return c;
        }
    }
    return null;
}


function registerClient(request, response) {
    console.log('registering client', request.post);

    var channelURL = request.post.channelURL;

    // If the channelURL is not in the request, say 404 and die
    if(channelURL === undefined) {
        return output404(request, response);
    }

    if(findClientByChannelURL(channelURL) === null) {
        clients.push({ channelURL: channelURL });
    }

    response.write('registered - current: ' + clients.length + ' active clients\n');
    response.end();
}


function unregisterClient(request, response) {
    console.log('unregistering client', request.post);

    var channelURL = request.post.channelURL;

    // If the channelURL is not in the request, say 404 and die
    if(channelURL === undefined) {
        return output404(request, response);
    }

    var registeredClient = findClientByChannelURL(channelURL);

    if(registeredClient !== null) {
        var pos = clients.indexOf(registeredClient);
        console.log('existing at', pos);
        clients.splice(pos, 1);
    }

    response.write('unregistered - current: ' + clients.length + ' active clients\n');
    response.end();
}


function broadcastEvent(info) {
    console.log('Broadcasting event: ' + info.sequenceNumber + ' to ' + clients.length + ' clients');
    
    // PUT -d version=version
    // TODO Asynchronously iterate over the clients and send current sequenceNumber to the PNS
}


function scheduleRandomEvent() {
    var nextEventTimeout = (5000 + Math.random() * 10000) | 0;
    broadcastEvent({
        sequenceNumber: eventSequenceNumber,
        message: 'Here is event number... ' + eventSequenceNumber + ' - next in ' + nextEventTimeout
    });
    eventSequenceNumber++;
    setTimeout(scheduleRandomEvent, nextEventTimeout);
}

