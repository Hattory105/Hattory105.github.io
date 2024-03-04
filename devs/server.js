//import { WebSocketServer } from 'ws';
const WebSocket = require('ws');

const PORT = 5000;

//const wsServer = new WebSocketServer({port: PORT});
const wss = new WebSocket.Server({
    port: PORT
});

var listWS = [];

wss.on('connection', function connection(ws) {
    listWS.push(ws);
    console.log('New connection ' + listWS.length);

    ws.on('message', function message(data) {
        var dataString = data.toString();
        console.log('dataString: ', dataString);
        try
        {
            let localWS = null;
            const obj = JSON.parse(dataString);
            switch(obj.typeData)
            {
                case 'LocalOrRemote':
                    ws.TypeConnection = obj.value;
                    if(ws.TypeConnection == 'Local')
                    {
                        ws.localDescription = '';
                        ws.randomCode = '' + generateRandomCode();
                        sendDataJSON(ws, 'RandomCode', ws.randomCode);
                    }
                    else
                    {
                        ws.remoteDescription = '';
                    }
                    break;
                
                //Local sent Data
                case 'LocalData':
                    sendDataToRemote(ws, obj.value);
                    break;
                
                //Local sent LocalDescription
                case 'LocalDescription':
                    ws.localDescription = obj.value;
                    break;
                
                //Remote sent RemoteDescription
                case 'RemoteDescription':
                    ws.remoteDescription = obj.value;
                    localWS = findLocalWebsocket(ws.randomCode);
                    if(localWS != null)
                    {
                        sendDataJSON(localWS, 'RemoteDescription', ws.remoteDescription);
                    }
                    break;
                
                //Remote sent RandomCode:
                case 'RandomCode':
                    localWS = findLocalWebsocket(obj.value);
                    if(localWS != null)
                    {
                        ws.localWS = localWS; //Save local WebSocket to remote WebSocket to send data later.
                        addRemoteWebsocket(localWS, ws);
                        sendDataJSON(ws, 'ConnectWithoutWebRTC', '');
                        sendDataJSON(localWS, 'ConnectWithoutWebRTC', '');

                        if(localWS.localDescription != '')
                        {
                            sendDataJSON(ws, 'LocalDescription', localWS.localDescription);
                            ws.randomCode = obj.value;
                            console.log("localWS.listCandidate.length: " + localWS.listCandidate.length);
                            for(let i = 0; i < localWS.listCandidate.length; i++)
                            {
                                sendDataJSON(ws, 'LocalCandidate', localWS.listCandidate[i]);
                            }
                        }
                    }
                    else
                    {
                        sendDataJSON(ws, 'WrongRandomCode', '');
                    }
                    break;
                
                case 'LocalCandidate':
                    //Add local candidate to array and will send it to remote in the future
                    if(ws.listCandidate == undefined)
                    {
                        ws.listCandidate = [];
                    }
                    ws.listCandidate.push(obj.value);
                    break;
                case 'RemoteCandidate':
                    //Send remote candidate to Local
                    if(ws.localWS == undefined || ws.localWS == null)
                    {
                        ws.localWS = findLocalWebsocket(ws.randomCode);
                    }
                    if(ws.localWS != undefined && ws.localWS != null)
                    {
                        sendDataJSON(ws.localWS, 'RemoteCandidate', obj.value);
                    }
                    break;
                
                case 'RemoteData':
                    sendDataToLocal(ws, obj.value);
                    break;
                
            }
        } catch(err) {
            console.log(err.message);
        }
    });

    ws.on('close', function message(data) {
        console.log('====================');
        console.log('closed: %s', data);
        handleEventWhenWebsocketIsClosed(ws);
        removeObjInArray(listWS, ws);
        console.log('listWS length: ' + listWS.length);
        console.log('Detail connection closed: ');
        console.log('TypeConnection: ' + ws.TypeConnection);
        console.log('====================');
    });
});

function generateRandomCode()
{
    //Returns a random integer between 100 000 -> 999 999
    let randomCode = Math.floor(Math.random() * 1000000);
    if(randomCode < 100000)
    {
        randomCode = 1000000 - randomCode;
    }
    return randomCode;
}

function sendDataJSON(websocket, type, value)
{
    let obj = {};
    obj.typeData = type;
    obj.value = value;
    let objString = JSON.stringify(obj);
    websocket.send(objString);
}

function removeObjInArray(arr, obj)
{
    let index = -1;
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] == obj)
        {
            index = i;
            break;
        }
    }
    if(index != -1)
    {
        arr.splice(index, 1);
    }
}

function findLocalWebsocket(randomCode)
{
    for(let i = 0; i < listWS.length; i++)
    {
        if(listWS[i].TypeConnection == 'Local' && listWS[i].randomCode == randomCode)
        {
            // console.log("Two random code is same");
            return listWS[i];
        }
    }
    return null;
}

function addRemoteWebsocket(websocketLocal, websocketRemote)
{
    console.log("=== addRemoteWebsocket ===");
    if(websocketLocal.listRemoteWS == undefined)
    {
        console.log("listRemoteWS == undefined");
        websocketLocal.listRemoteWS = [];
    }

    if(websocketLocal.listRemoteWS.includes(websocketRemote) == false)
    {
        console.log("listRemoteWS pushed websocketRemote");
        websocketLocal.listRemoteWS.push(websocketRemote);
    }
}

function sendDataToRemote(websocket, data)
{
    if(websocket.listRemoteWS != undefined && websocket.listRemoteWS != null)
    {
        for(let i = 0; i < websocket.listRemoteWS.length; i++)
        {
            sendDataJSON(websocket.listRemoteWS[i], "LocalData", data);
        }
    }
}

function sendDataToLocal(websocket, data)
{
    if(websocket.localWS != undefined && websocket.localWS != null)
    {
        sendDataJSON(websocket.localWS, "RemoteData", data);
    }
}

function handleEventWhenWebsocketIsClosed(websocket)
{
    if(websocket.TypeConnection == 'Local') //Local peer is closed
    {
        sendDataToRemote(websocket, 'LocalIsClosed');
    }
    else
    {
        //Remote peer is closed
        if(websocket.localWS != undefined && websocket.localWS != null)
        {
            if(websocket.localWS.listRemoteWS != undefined && websocket.localWS.listRemoteWS != null)
            {
                for(let i = 0; i < websocket.localWS.listRemoteWS.length; i++)
                {
                    if(websocket.localWS.listRemoteWS[i] == websocket)
                    {
                        if(websocket.localWS.listRemoteWS.length == 1) //If only 1 WVG (remote) connect to game (local)
                        {
                            sendDataToLocal(websocket, 'RemoteIsClosed');
                        }
                        else
                        {
                            websocket.localWS.listRemoteWS.splice(i, 1);
                        }
                        break;
                    }
                }
            }
        }
    }
}

console.log((new Date()) + " Server is listenning on port " + PORT);
