const remoteState = {
    none: 0,
    wsConnected: 1,
    wsSentRandomCode: 2,
    webrtcReceivedLocalDescription: 3,
    webrtcSentRemoteDescription: 4,
}

var remoteInformation = {
    localDescription: '',
    randomCode: ''
};
var websocket_state = remoteState.none;

//===================================//
//WebSocket
var websocket_instance = new WebSocket("wss://gl-ws-test.glitch.me/");
var wsConnected = false;
var wsConnectWithoutWebRTC = false;
var wsConnectedWebRTC = false;

function initWebSocket()
{
    if(wsConnected == false)
    {
        websocket_instance = new WebSocket("wss://gl-ws-test.glitch.me/");
    }
}

websocket_instance.onopen = function(e) {
    console.log("trung.lyhoang - websocket_remote.js - websocket open");
    sendDataJSON(websocket_instance, 'LocalOrRemote', 'Remote');
    wsConnected = true;
    websocket_state = remoteState.wsConnected;
}

websocket_instance.onclose = function(e) {
    wsConnected = false;
    websocket_state = remoteState.none;
    wsConnectWithoutWebRTC = false;
}

websocket_instance.onerror = function(e) {
    wsConnected = false;
    wsConnectWithoutWebRTC = false;
}

websocket_instance.onmessage = function(e) {
    var data = e.data;
    console.log("trung.lyhoang - websocket_remote.js - websocket onmessage: " + data);
    try
    {
        const obj = JSON.parse(data);
        switch(websocket_state)
        {
            case remoteState.wsConnected:
                
                break;
            case remoteState.wsSentRandomCode:
                if(obj.typeData == "LocalDescription")
                {
                    remoteInformation.localDescription = obj.value;
                    websocket_state = remoteState.webrtcReceivedLocalDescription;
                    initRemoteWebRTC();
                }
            case remoteState.webrtcReceivedLocalDescription:
            case remoteState.webrtcSentRemoteDescription:
                if(obj.typeData == "LocalCandidate")
                {
                    console.log("trung.lyhoang - websocket_remote.js - websocket onmessage LocalCandidate");
                    remoteWebRTC.addIceCandidate(JSON.parse(obj.value)).then(onAddIceCandidateSuccess, onAddIceCandidateError);
                }
                break;
        }

        if(obj.typeData == "ConnectWithoutWebRTC")
        {
            wsConnectWithoutWebRTC = true;
        }
    } catch (err) {
        console.log(err.message);
    }
}

function sendRemoteDescription(a)
{
    if(wsConnected == false)
    {
        console.log("trung.lyhoang - websocket fail");
    }
    else
    {
        const connStr = JSON.stringify(a);
        console.log("trung.lyhoang - websocket_remote.js - sendRemoteDescription - connStr: ", connStr);
        sendDataJSON(websocket_instance, 'RemoteDescription', connStr);
        websocket_state = remoteState.webrtcSentRemoteDescription;
    }
}

function sendDataJSON(websocket, type, value)
{
    let obj = {};
    obj.typeData = type;
    obj.value = value;
    let objString = JSON.stringify(obj);
    websocket.send(objString);
}
//===================================//

//===================================//
//WebRTC
const iceConfiguration = {
    iceServers: [{"urls":"stun:stun.relay.metered.ca:80"},{"urls":"turn:standard.relay.metered.ca:80","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:80?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"}]
}
const remoteWebRTC = new RTCPeerConnection(iceConfiguration);
// const remoteWebRTC = new RTCPeerConnection();
function initRemoteWebRTC() {
    remoteWebRTC.onicecandidate = function (e) {
        if(e.candidate != null)
        {
            const connStr = JSON.stringify(remoteWebRTC.localDescription);
            console.log("trung.lyhoang - websocket_remote.js - onicecandidate: ", connStr);
            sendDataJSON(websocket_instance, 'RemoteCandidate', JSON.stringify(e.candidate));
        }
    };

    remoteWebRTC.ondatachannel = function ({ channel }) {
        const receiveChannel = channel;
        receiveChannel.onmessage = function (e) {
            console.log("MSG Local: " + e.data);
        };
        receiveChannel.onopen = function (e) {
            console.log("trung.lyhoang - websocket_remote.js - ondatachannel: Open");
            wsConnectedWebRTC = true;
        };
        receiveChannel.onclose = function (e) {
            console.log("trung.lyhoang - websocket_remote.js - ondatachannel: Close");
            websocket_state = remoteState.wsConnected;
            wsConnectedWebRTC = false;
        };
        remoteWebRTC.channel = receiveChannel;
    };

    setLocalDescription();
}

function onAddIceCandidateSuccess() {
    console.log('AddIceCandidate success.');
}

function onAddIceCandidateError(error) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
}

function setLocalDescription()
{
    if(remoteInformation.localDescription !== "")
    {
        remoteWebRTC.setRemoteDescription(JSON.parse(remoteInformation.localDescription)).then(function () {
            console.log("trung.lyhoang - websocket_remote.js - setLocalDescription, setRemoteDescription Success");
            remoteWebRTC.createAnswer().then(function (a) {
                console.log("trung.lyhoang - websocket_remote.js - setLocalDescription, createAnswer Success");
                remoteWebRTC.setLocalDescription(a);
                sendRemoteDescription(a);
            }).then(function (a) {
                console.log("trung.lyhoang - websocket_remote.js - setLocalDescription, setLocalDescription DONE");
            });
        });
    }
}

function sendRandomCode(value)
{
    let randomCode = "" + value;
    if (randomCode === "" || randomCode === "0") {
        console.log("chưa nhập");
    } else {
        console.log(randomCode);
        sendDataJSON(websocket_instance, 'RandomCode', randomCode);
        websocket_state = remoteState.wsSentRandomCode;
    }
}
