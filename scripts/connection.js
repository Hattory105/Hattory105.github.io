let connected = 0;
let ws;
function connectServer() {
    let host = document.getElementById("txtHostAddress").value;
    let port = document.getElementById("txtPort").value;
    //ws = new WebSocket("ws://192.168.0.144:8082");
    let hostPortWS = "ws://" + host + ":" + port;
    console.log("hostPortWS: " + hostPortWS);

    ws = new WebSocket(hostPortWS);

    ws.addEventListener("open", () => {
        console.log("We are connected!");
        //ws.send("Hey, how's it going?");
        connected = 1;

        document.getElementById("divMainMenu").style.display = "none";
        enableGamepad = true;
        resizeCanvas();
    })

    ws.addEventListener("message", e => {
        console.log(e);
        //console.log(e.data);
        //console.log(e.origin);
    });

    ws.addEventListener("close", e => {
        console.log(e);
        connected = 0;
        //count = 0;
    });

    ws.addEventListener("error", e => {
        console.log(e);
    });
}

function sendAction(a) {
    if(connected == 1) {
        let data;
        if(a == undefined || a == null || a == "") {
            data = "unknown";
        } else {
            data = a;
        }

        ws.send(data);
    }
}