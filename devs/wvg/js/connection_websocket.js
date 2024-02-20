var serverSendPingTimeout = 3000;
var pingTimeout;

// function heartbeat() {
//     console.log("heartbeat")
//     clearTimeout(pingTimeout);
//     hideNoConnectionPopup();
//     pingTimeout = setTimeout(() => {
//         if(NumberPingRetry >= 1) {
//             showDisconnectPopUp();
//         } else {
//             NumberPingRetry += 1;
//             setTimeout(heartbeat, serverSendPingTimeout + 1000);
//         }
//     }, serverSendPingTimeout + 1000);
// }

var http = new XMLHttpRequest();
var websocket_port = 8080;
var abortController = new AbortController();
var isRequestingSocketPort = true;

function fetchWithTimeout (url)  {
    const timeout = setTimeout(() => {
        abortController.abort();
    }, 1000 * 3); // Abort request in 3 seconds.

    return fetch(url, {
                signal: abortController.signal,
            }).finally(() => {
                clearTimeout(timeout);
            });
};

function requestWebsocketPort() {
    fetchWithTimeout(window.location + "WebSocketPort", {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(port => {
        isRequestingSocketPort = false;
        websocket_port = port;
        webSocket_client.openSocket();
    })
    .catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') {
            console.log("Request socket port timeout!")
            // showDisconnectPopUp();
            // abortController = new AbortController();
            // requestWebsocketPort();
        } else {
            console.log("Request socket port ERROR!")
            // showDisconnectPopUp();
            // abortController = new AbortController();
            // requestWebsocketPort();
        }
    });
}

function createJsonString(type, keycode) {
    var obj = new Object();
    obj.type = type;
    obj.keycode = keycode;

    //convert object to json string
    return JSON.stringify(obj);
}

//----------------- WebSocket Client ---------//
class CustomWebSocket {

    constructor()
    {
        this.isReady = false;
    }

    isOpen()
    {
        if (typeof(this.websocket) === 'undefined')
            return false;
        if (this.websocket.readyState === this.websocket.OPEN)
            return true;
        else
            return false;
    }
    openSocket()
    {
        //this.websocket = new WebSocket("ws://" + window.location);

        writeLog("PQT Debug " + "location -- " + window.location.hostname);
         var temp = window.location.host;
         //let  = "127.0.0.1:8000/Player"; //"" + window.location;
         //console.log("PQT Debug --- url " + URL);
        temp = temp.replace("http://","");
        temp = temp.replace("https://","");
        temp = temp.replace(":"+window.location.port, "");
        //URL = "ws://" + URL;
        writeLog("PQT Debug --- url " + temp);

        var temp = "ws://" + temp + ":" + websocket_port;
        writeLog("PQT Debug --- request websocket connection: " + temp);
        //this.websocket = new WebSocket("ws://localhost:8080");
        this.websocket = new WebSocket(temp);
        //this.websocket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

        this.websocket.onopen = function ()
        {
            writeLog("PQT Debug open socket successfully");
            this.isReady = true;
            // heartbeat();
            hideNoConnectionPopup();
        }
        this.websocket.onerror = function (error)
        {
            writeLog("PQT Debug socket onerror" + JSON.stringify(error));
            this.isReady = false;
        }
        this.websocket.onclose = function ()
        {
            writeLog("PQT Debug socket onclose");
            this.isReady = false;
            disconnect();
        }

        this.websocket.onmessage = function (event)
        {                
            // if (event.data == "Template02") {
            //     template = template2;
            //     ctx.clearRect(0, 0, el.width, el.height);
            //     initArray();
            //   } else if (event.data == "Template03") {
            //     template = template3;
            //     ctx.clearRect(0, 0, el.width, el.height);
            //     initArray();
            //   } else {
            //     console.log(event.data);
            //               // template = template1;
            //               // ctx.clearRect(0, 0, el.width, el.height);
            //     // initArray();
            //   }
            writeLog("onmessage, event.data: " + event.data);
            if (event.data == "PingInOk") {
                hideNoConnectionPopup();
                clearTimeout(pingTimeoutSocket);
            // } else if (event.data == "Ping") {
            //     NumberPingRetry = 0;
            //     heartbeat();
            //     webSocket_client.sendData("Pong");
            // } else if (event.data == "Pong") {
            //     NumberPingRetry = 0;
            //     heartbeat();
            } else {
                writeLog(event.data);
                          // template = template1;
                          // ctx.clearRect(0, 0, el.width, el.height);
                // initArray();
                if(!testUILayout) {
                    try {
                        const obj = JSON.parse(event.data);
                        if(obj != null && obj["LO"] != null) {
                            let layoutID = obj["LO"];
                            switch(layoutID)
                            {
                                case 0:
                                    switchLayout(appLayout.layout0, true);
                                    break;
                                case 1:
                                    switchLayout(appLayout.layout1, true);
                                    break;
                                case 2:
                                    switchLayout(appLayout.layout2, true);
                                    break;
                            }
                        }
                    } catch (e) {

                    }
                }
            }
        }
    }

    sendData(body)
    {
        if(!isRequestingSocketPort)
        {
            if(!this.isOpen())
                this.openSocket();
            if(this.isOpen()) {
                this.websocket.send(body);
            }
        }
    }

}
var webSocket_client = new CustomWebSocket();

function showDisconnectPopUp() {
    writeLog("showDisconnectPopUp");
    // webSocket_client.sendData("Ping");
    document.getElementById("noconnection").style.display = 'block';
}
function hideNoConnectionPopup() {
    writeLog("hideNoConnectionPopup");
    isCheckConnection = false;
    document.getElementById("noconnection").style.display = 'none';
}

var pingTimeoutSocket;

function PingInSocketCheck()
{
    if(NumberPingRetry >= 1) {
        // showDisconnectPopUp();
    } else {
        NumberPingRetry += 1;
        webSocket_client.sendData("PingIn");
        pingTimeoutSocket = setTimeout(PingInSocketCheck, serverSendPingTimeout + 1000);
    }
}

function PingInSocket()
{
    if(!isRequestingSocketPort) {
        if (!isCheckConnection)
        {
            isCheckConnection = true;
            NumberPingRetry = -1;
            PingInSocketCheck();
        }
    }
}