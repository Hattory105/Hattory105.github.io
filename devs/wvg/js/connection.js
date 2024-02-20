//----------------- EX_XMLHttp Class -----------------//
class EX_XMLHttp {
    //constructor
    constructor(){
        this.reInit();
    }
    
    reInit()
    {
        this.httpSend = new XMLHttpRequest();
        this.httpSend.open("POST",window.location + "Action/",true);
        this.httpSend.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        this.httpSend.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE ) {
                window.readySend = true;
            }
        }
    }
    
    sendBody(body)
    {
        window.readySend = false;
        this.httpSend.send(body);
    }
    
    isReadyState()
    {
        return this.isReady;
    }
}

//----------------- Queue Class -----------------//
class Queue {
    constructor() {
        this.items = [];
        this.items = [];
    }

    enqueue(action, element) {
        return this.items.push({action, element});
    }

    dequeue() {
        if(this.items.length > 0) {
            return this.items.shift();
        }
    }

    peek() {
        return this.items[0].element;
    }

    action() {
        return this.items[0].action;
    }

    isEmpty(){
        return this.items.length == 0;
    }

    size(){
            return this.items.length;
    }

    clear(){
        this.items = [];
    }
}


const MAX_ACTIONS = 100;
const queue = new Queue();
const MAX_CONNECTION = 12;
var readySend = true;
var EX_XMLHTTP_Pool;
var index = 0;

function findAvailableXMLHTTP()
{				
    index++;
    let i = index % MAX_CONNECTION;
    EX_XMLHTTP_Pool[i].reInit();				
    return EX_XMLHTTP_Pool[i];
}

function initHttpPool()
{
    EX_XMLHTTP_Pool = [];
    for (let i = 0; i < MAX_CONNECTION; i++)
    {
        const ex_http = new EX_XMLHttp();
        EX_XMLHTTP_Pool.push(ex_http);
    }
}

function doActionInQueue_V3()
{
    if(readySend == false)
        return;

    var json = { events:[] };
    var counter = 0;
    while(!queue.isEmpty())
    {
        if(queue.action() > 0)
        {
            var element = new Object();
            element['keycode'] = queue.peek();
            element['action'] = queue.action();

            json.events.push(element);
            queue.dequeue();
            counter ++;
        }
        if(counter >= MAX_ACTIONS)
            break;					
    }
    if(json.events.length <= 0)
    {
        return;
    }

    var httpAvailable = findAvailableXMLHTTP();
    var body = JSON.stringify(json);
    httpAvailable.sendBody(body);
}

function sendActionUp(a) {
    writeLog("sendActionUp: " + a);
    if(!useWebSocketTransfer) {
        queue.enqueue(4, a);
    } else {
        var data = createJsonString("KeyUp", a);
        //webSocket_client.sendData(data);
        wsServerSendData("RemoteData", data);
    }
}

function sendActionDown(a) {
    writeLog("sendActionDown: " + a);
    if(!useWebSocketTransfer) {
        queue.enqueue(3, a);
    } else {
        var data = createJsonString("KeyDown", a);
        //webSocket_client.sendData(data);
        wsServerSendData("RemoteData", data);
    }
    if (window.navigator.vibrate)
    {
        navigator.vibrate(1);
    }
}

function sendDpadUp(a) {
    writeLog("sendDpadUp: " + a);
    if(!useWebSocketTransfer) {
        queue.enqueue(2, a);
    } else {
        var data = createJsonString("KeyUp", a);
        //webSocket_client.sendData(data);
        wsServerSendData("RemoteData", data);
    }
}

function sendDpadDown(a) {
    writeLog("sendDpadDown: " + a);
    dpadKeycodeCurrent = a;
    if(!useWebSocketTransfer) {
        queue.enqueue(1, a);
    } else {
        var data = createJsonString("KeyDown", a);
        //webSocket_client.sendData(data);
        wsServerSendData("RemoteData", data);
    }
    if (window.navigator.vibrate)
    {
        navigator.vibrate(1);
    }
}

function wsServerCreateJsonString(type, data) {
    var obj = new Object();
    obj.typeData = type;
    obj.value = keycode;

    //convert object to json string
    return JSON.stringify(obj);
}

function wsServerSendData(type, data)
{
    if(wsConnected == true)
    {
        let obj = {};
        obj.typeData = type;
        obj.value = data;
        let objString = JSON.stringify(obj);
        if(wsConnectedWebRTC == true)
        {
            remoteWebRTC.channel.send(objString);
        }
        else if(wsConnectWithoutWebRTC == true)
        {
            websocket_instance.send(objString);
        }
    }
}

let isCheckConnection = false;
let NumberPingRetry = 0;
function pingIn() {
    if (!isCheckConnection)
    {
        isCheckConnection = true;
        let myPromise = new Promise(function (resolve, reject) {
            // console.log("PQT Debug ----- start1");
            var xhr = new XMLHttpRequest();
            xhr.open("GET",window.location + "PingIn",true);
            xhr.timeout = 5000; // time in milliseconds
            xhr.send();
            
            finalResolve = resolve;
            finalReject = reject;
            xhr.onreadystatechange = function () {
                // console.log("PQT Debug ----- onreadystatechange, xhr.readyState: " + xhr.readyState);
                // console.log("PQT Debug ----- onreadystatechange, xhr.status: " + xhr.status);
                if(xhr.readyState === XMLHttpRequest.DONE)
                {													
                    isCheckConnection = false;
                    if (xhr.status == 200)
                    {
                        finalResolve("Success");
                        parseResponseFromSDK(xhr.responseText);
                    }
                    else 
                    {
                        finalReject("Failure");
                    }
                }
            }

            xhr.ontimeout = (e) => {
                // console.log("trung.lyhoang - index.html - pingIn, ontimeout");
            };
            xhr.onerror = (e) => {
                // console.log("trung.lyhoang - index.html - onerror, e: " + e);
                disconnect();
            };
        });
    
        myPromise.then(
            function(value) {
                NumberPingRetry = 0;
                // console.log("PQT Debug - ping success");
                hideNoConnectionPopup();

            },
            function(error) {
                // console.log("PQT Debug - ping failed");
                NumberPingRetry++;
                if(NumberPingRetry > 4)
                {
                    // console.log("PQT Debug - disconnected after 4 attempts");
                    NumberPingRetry = 0;
                    disconnect(); 
                }
            }
        ).catch(
            function()
            {
                // console.log("PQT Debug - exception occured");
                NumberPingRetry++;
                if(NumberPingRetry > 4)
                {
                    // console.log("PQT Debug - disconnected after 4 times of exceptions");
                    NumberPingRetry = 0;
                    disconnect(); 
                }
            }
        );
    }
}

function parseResponseFromSDK(responseText)
{
    if(testUILayout)
        return;
    
    const obj = JSON.parse(responseText);
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
            case 3:
                switchLayout(appLayout.layout3, true);
                break;
        }
    }
}

// function hideNoConnectionPopup() {
//     isCheckConnection = false;
//     NumberPingRetry = 0;
//     document.getElementById("noconnection").style.display = 'none';
// }

function disconnect() {
    //console.log("disconnect");
    document.getElementById("noconnection").style.display = 'block';
}