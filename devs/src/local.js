const localState = {
    none: 0,
    wsConnected: 1,
    webrtcSentLocalDescription: 2,
    webrtcReceivedRemoteDescription: 3,
    webrtcConnected: 4
}

var localInformation = {
    remoteDescription: '',
    randomCode: ''
};
var state = localState.none;
var wsConnectWithoutWebRTC = false;
var wsConnectedWebRTC = false;

//===================================//
//WebSocket
var ws = new WebSocket("wss://gl-ws-test.glitch.me/");
var wsConnected = false;

ws.onopen = function(e) {
    console.log("trung.lyhoang - local.js - websocket open");
    sendDataJSON(ws, 'LocalOrRemote', 'Local');
    wsConnected = true;
    state = localState.wsConnected;
}

ws.onclose = function(e) {
    console.log("trung.lyhoang - local.js - websocket close");
    wsConnected = false;
    state = localState.none;
    document.getElementById("btnConnect").disabled = false;
    wsConnectWithoutWebRTC = false;
}

ws.onmessage = function(e) {
    var data = e.data;
    console.log("trung.lyhoang - local.js - websocket onmessage: " + data);
    try
    {
        const obj = JSON.parse(data);
        switch(state)
        {
            case localState.wsConnected:
                if(obj.typeData == "RandomCode")
                {
                    localInformation.randomCode = obj.value;
                    document.getElementById("txtRandomCode").textContent = obj.value;
                    initLocalWebRTC();
                }
                break;
            case localState.webrtcSentLocalDescription:
                if(obj.typeData == 'RemoteDescription')
                {
                    localInformation.remoteDescription = obj.value;
                    state = localState.webrtcReceivedRemoteDescription;
                    setRemoteDescription();
                }
            case localState.webrtcReceivedRemoteDescription:
            case localState.webrtcConnected:
                if(obj.typeData == 'RemoteCandidate')
                {
                    console.log("trung.lyhoang - local.js - websocket onmessage RemoteCandidate");
                    localWebRTC.addIceCandidate(JSON.parse(obj.value)).then(
                        onAddIceCandidateSuccess, onAddIceCandidateError
                        );
                }
            break;
        }

        if(obj.typeData == "ConnectWithoutWebRTC")
        {
            wsConnectWithoutWebRTC = true;
            document.getElementById("send").disabled = false;
        }
        else if(obj.typeData == "RemoteData")
        {
            document.getElementById("txtData").textContent = data;
        }
    } catch (err) {
        console.log(err.message);
    }
}

function sendLocalDescription(description)
{
    if(wsConnected == false)
    {
        console.log("trung.lyhoang - websocket fail");
    }
    else
    {
        const connStr = JSON.stringify(description);
        console.log("trung.lyhoang - local.js - sendLocalDescription - connStr: ", connStr);
        // ws.send(connStr);
        sendDataJSON(ws, 'LocalDescription', connStr);
        state = localState.webrtcSentLocalDescription;
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
const iceConfiguration = {
    iceServers: [{"urls":"stun:stun.relay.metered.ca:80"},{"urls":"turn:standard.relay.metered.ca:80","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:80?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"},{"urls":"turn:standard.relay.metered.ca:443?transport=tcp","username":"05c26142d8a738415ff818cc","credential":"FHUUd4bsa5bQPUMq"}]
}

//===================================//
//WebRTC
const localWebRTC = new RTCPeerConnection(iceConfiguration);
function initLocalWebRTC()
{
    localWebRTC.onicecandidate = function (e) {
        if(e.candidate != null)
        {
            // console.log("trung.lyhoang - local.js - onicecandidate e: ", e.candidate);
            // const connStr = JSON.stringify(localWebRTC.localDescription);
            // console.log("trung.lyhoang - local.js - onicecandidate: ", connStr);
            // sendLocalDescription();
            // document.getElementById("txtCreate").value = connStr;
            sendDataJSON(ws, 'LocalCandidate', JSON.stringify(e.candidate));
        }
        else
        {
            console.log("trung.lyhoang - local.js - onicecandidate, e.candidate = null");
        }
    };

    initDataChannel();

    createOffer();
    
    // localWebRTC.createOffer().then(function (o) {
    //     console.log('trung.lyhoang - local.js - initLocalWebRTC - createOffer success');
    //     localWebRTC.setLocalDescription(o);
    // });
}

function onAddIceCandidateSuccess() {
    console.log('AddIceCandidate success.');
}

function onAddIceCandidateError(error) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
}

var dataChannel = null;
function initDataChannel()
{
    console.log("trung.lyhoang - local.js - initDataChannel");
    dataChannel = localWebRTC.createDataChannel("data_channel");
    dataChannel.onmessage = function (e) {
        console.log("trung.lyhoang - local.js - dataChannel.onmessage: " + e.data);
        document.getElementById("txtData").textContent = e.data;
    };
    dataChannel.onopen = function (e) {
        console.log("trung.lyhoang - local.js - dataChannel.onopen");
        document.getElementById("txtStatus").textContent = "Trạng thái: Open";
        document.getElementById("send").disabled = false;
        wsConnectedWebRTC = true;
    };
    dataChannel.onclose = function (e) {
        console.log("trung.lyhoang - local.js - dataChannel.onclose");
        document.getElementById("txtStatus").textContent = "Trạng thái: Close";
        document.getElementById("send").disabled = true;
        document.getElementById("btnConnect").disabled = false;
        state = localState.webrtcSentLocalDescription;
        wsConnectedWebRTC = false;
    };
}

function createOffer()
{
    localWebRTC.createOffer().then(function (o) {
        // console.log('trung.lyhoang - local.js - initLocalWebRTC - createOffer success - o: ' + JSON.stringify(o));
        sendLocalDescription(o);
        document.getElementById("txtCreate").value = JSON.stringify(o);
        localWebRTC.setLocalDescription(o);
    });
}

function setRemoteDescription()
{
    if(localInformation.remoteDescription !== "")
    {
        console.log("trung.lyhoang - local.js - setRemoteDescription - 001");
        document.getElementById("txtAccept").value = localInformation.remoteDescription;
        localWebRTC.setRemoteDescription(JSON.parse(localInformation.remoteDescription)).then(function () {
            console.log("trung.lyhoang - local.js - setRemoteDescription - DONE");
            state = localState.webrtcConnected;
        });
    }
}
//===================================//

document.getElementById("send").disabled = true;
// Send msg
document.getElementById("send").addEventListener("click", (e) => {
    const txtContent = document.getElementById("txtContent");
    if (txtContent.value === "") {
        console.log("chưa nhập");
    } else {
        console.log(txtContent.value);
        if(wsConnectedWebRTC)
        {
            dataChannel.send(txtContent.value);
        }
        else if(wsConnectWithoutWebRTC)
        {
            sendDataJSON(ws, "LocalData", txtContent.value);
        }
        txtContent.value = "";
    }
});

// Connect button
document.getElementById("btnConnect").disabled = true;
document.getElementById("btnConnect").addEventListener("click", (e) => {
    document.getElementById("btnConnect").disabled = true;
    if(wsConnected == false)
    {
        console.log("trung.lyhoang - websocket begin to start");
        ws = new WebSocket("wss://gl-ws-test.glitch.me/");
    }
    else
    {
        console.log("trung.lyhoang - websocket is connecting");
        initDataChannel();
        createOffer();
        // localWebRTC.createOffer().then(function (o) {
        //     console.log('trung.lyhoang - local.js - initLocalWebRTC - createOffer success');
        //     localWebRTC.setLocalDescription(o);
        // });
    }
});
