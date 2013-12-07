(function() {

    var messagesDiv;
    
    // TODO should try to read stored values here?
    var server = 'http://localhost:6666';
    var channelURL;

    if( !navigator.push ) {
        window.alert('Push Notifications are not available in this environment');
    } else {
        init();
    }

    // ---

    function init() {
        console.log('init');

        // UI
        messagesDiv = document.getElementById('messages');
        serverDiv = document.getElementById('server');

        serverDiv.value = server;

        serverDiv.addEventListener('change', updateServerPath, false);
        serverDiv.addEventListener('keyup', updateServerPath, false);

        // TODO should do it only if not registered already?
        // Register with the Push Notification Server
        var request = navigator.push.register();

        request.onsuccess = function(ev) {

            // Get channel URL
            var channelURL = request.result;
            console.log('channelURL ' + channelURL);

            // Let our server know about the private channelURL
            registerChannelWithServer(channelURL);
        };

        request.onerror = function(ev) {
            reportError('Unable to connect to push notification server');
        };
        
    }


    function updateServerPath() {
        var oldValue = server.trim();
        server = serverDiv.value.trim();
        console.log('update to', server);
        if(oldValue !== server && channelURL !== undefined) {
            registerChannelWithServer(channelURL);
        }
    }


    function registerChannelWithServer(channelURL) {
        ajax('POST', '/register', {
            channelURL: channelURL
        }, function(err, res) {
            if(err) {
                reportError('Unable to register channel: ' + err);
            } else {
                reportOK('Registered with server');
            }
        });

    }


    function ajax(method, path, data, callback) {

        var url = server + path;
        var xhr = new XMLHttpRequest({ mozSystem: true });

        xhr.onload = function (evt) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.response);
            } else {
                callback(xhr.status);
            }
        };

        xhr.open(method, url, true);
        xhr.onerror = function(e) {
            console.error('xhr error ' + xhr.status);
            callback(e);
        };

        var formData = new FormData();
        Object.keys(data).forEach(function(k) {
            formData.append(k, data[k]);
        });

        xhr.send(formData);

    }


    function reportError(msg) {
        reportMessage(msg, 'error');
    }

    function reportOK(msg) {
        reportMessage(msg, 'ok');
    }

    function reportMessage(msg, className) {
        var p = document.createElement('p');
        p.className = className;
        p.innerHTML = msg;
        messagesDiv.appendChild(p);
    }

})();
