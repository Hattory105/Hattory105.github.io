const remoteState = {
    none: 0,
    wsConnected: 1,
    wsSentRandomCode: 2,
    wsReceivedLocoDescription: 3,
    webrtcSentRemoteDescription: 4,
}

var remoteInformation = {
    localDescription: '',
    randomCode: ''
};
var state = remoteState.none;
var wsConnectWithoutWebRTC = false;
var wsConnectedWebRTC = false;

//===================================//
//WebSocket
var ws = new WebSocket("wss://gl-ws-test.glitch.me/");
var wsConnected = false;

ws.onopen = function(e) {
    console.log("trung.lyhoang - remote.js - websocket open");
    sendDataJSON(ws, 'LocalOrRemote', 'Remote');
    wsConnected = true;
    state = remoteState.wsConnected;
}

ws.onmessage = function(e) {
    var data = e.data;
    console.log("trung.lyhoang - remote.js - websocket onmessage: " + data);
    try
    {
        const obj = JSON.parse(data);
        switch(state)
        {
            case remoteState.wsConnected:
                
                break;
            case remoteState.wsSentRandomCode:
                if(obj.typeData == "LocalDescription")
                {
                    remoteInformation.localDescription = obj.value;
                    state = remoteState.wsReceivedLocoDescription;
                    initRemoteWebRTC();
                }
            case remoteState.wsReceivedLocoDescription:
            case remoteState.webrtcSentRemoteDescription:
                if(obj.typeData == "LocalCandidate")
                {
                    console.log("trung.lyhoang - remote.js - websocket onmessage LocalCandidate");
                    remoteWebRTC.addIceCandidate(JSON.parse(obj.value)).then(onAddIceCandidateSuccess, onAddIceCandidateError);
                }
                break;
        }

        if(obj.typeData == "ConnectWithoutWebRTC")
        {
            wsConnectWithoutWebRTC = true;
            document.getElementById("send").disabled = false;
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
        console.log("trung.lyhoang - remote.js - sendRemoteDescription - connStr: ", connStr);
        sendDataJSON(ws, 'RemoteDescription', connStr);
        state = remoteState.webrtcSentRemoteDescription;
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
var listLocalDescription = [];
const iceConfiguration = {
    iceServers: [{"urls":"stun:stun.relay.metered.ca:80"},{"urls":"turn:standard.relay.metered.ca:80","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:80?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"}]
}
const remoteWebRTC = new RTCPeerConnection(iceConfiguration);
function initRemoteWebRTC() {
    remoteWebRTC.onicecandidate = function (e) {
        if(e.candidate != null)
        {
            const connStr = JSON.stringify(remoteWebRTC.localDescription);
            console.log("trung.lyhoang - remote.js - onicecandidate: ", connStr);
            // sendRemoteDescription();
            // document.getElementById("txtCreate").value = connStr;
            sendDataJSON(ws, 'RemoteCandidate', JSON.stringify(e.candidate));
        }
    };

    remoteWebRTC.ondatachannel = function ({ channel }) {
        const receiveChannel = channel;
        receiveChannel.onmessage = function (e) {
            console.log("MSG Local: " + e.data);
            document.getElementById("txtData").textContent = e.data;
        };
        receiveChannel.onopen = function (e) {
            console.log("Open");
            document.getElementById("txtStatus").textContent = "Trạng thái: Open";
            document.getElementById("send").disabled = false;
            document.getElementById("sendRandomCode").disabled = true;
            document.getElementById("txtRandomCode").disabled = true;
            wsConnectedWebRTC = true;
        };
        receiveChannel.onclose = function (e) {
            console.log("Close");
            document.getElementById("txtStatus").textContent = "Trạng thái: Close";
            document.getElementById("send").disabled = true;
            document.getElementById("sendRandomCode").disabled = false;
            document.getElementById("txtRandomCode").disabled = false;
            state = remoteState.wsConnected;
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
        document.getElementById("txtAccept").value = remoteInformation.localDescription;
        remoteWebRTC.setRemoteDescription(JSON.parse(remoteInformation.localDescription)).then(function () {
            console.log("trung.lyhoang - remote.js - setLocalDescription, setRemoteDescription Success");
            remoteWebRTC.createAnswer().then(function (a) {
                console.log("trung.lyhoang - remote.js - setLocalDescription, createAnswer Success");
                remoteWebRTC.setLocalDescription(a);
                sendRemoteDescription(a);
                document.getElementById("txtCreate").value = JSON.stringify(a);
            }).then(function (a) {
                console.log("trung.lyhoang - remote.js - setLocalDescription, setLocalDescription DONE");
            });
        });
    }
}

document.getElementById("send").disabled = true;
// send từ remote wa
document.getElementById("send").addEventListener("click", (e) => {
    const txtContent = document.getElementById("txtContent");
    if (txtContent.value === "") {
        console.log("chưa nhập");
    } else {
        console.log(txtContent.value);
        if(wsConnectedWebRTC)
        {
            remoteWebRTC.channel.send(txtContent.value);
        }
        else if(wsConnectWithoutWebRTC)
        {
            sendDataJSON(ws, "RemoteData", txtContent.value);
        }
        txtContent.value = "";
    }
});

document.getElementById("sendRandomCode").disabled = false;
// send Random Code to Server
document.getElementById("sendRandomCode").addEventListener("click", (e) => {
    const txtContent = document.getElementById("txtRandomCode");
    if (txtContent.value === "") {
        console.log("chưa nhập");
    } else {
        console.log(txtContent.value);
        sendDataJSON(ws, 'RandomCode', txtContent.value);
        state = remoteState.wsSentRandomCode;
    }
});
