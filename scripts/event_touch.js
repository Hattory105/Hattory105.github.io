document.addEventListener("DOMContentLoaded", startup);
function startup() {
    console.log("startup: ");
    var el = document.getElementById("mainCanvas");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}

var ongoingTouches = []; //save touch with: identifier, pageX, pageY, pageXStart, pageYStart

function handleStart(evt) {
    evt.preventDefault();
    log("touchstart");
    console.log("touchstart.");
    var el = document.getElementById("mainCanvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        checkGamepad("touchstart", touches[i].pageX, touches[i].pageY);
        ongoingTouches.push(copyTouch(touches[i].identifier, touches[i].pageX, touches[i].pageY, touches[i].pageX, touches[i].pageY));

        // var color = colorForTouch(touches[i]);
        // ctx.beginPath();
        // ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
        // ctx.fillStyle = color;
        // ctx.fill();
    }
}

function handleMove(evt) {
    evt.preventDefault();
    //log("touchmove");
    var el = document.getElementById("mainCanvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            // ctx.beginPath();
            // ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            // ctx.lineTo(touches[i].pageX, touches[i].pageY);
            // ctx.lineWidth = 4;
            // ctx.strokeStyle = color;
            // ctx.stroke();
            ongoingTouches.splice(idx, 1, copyTouch(touches[i].identifier, touches[i].pageX, touches[i].pageY, ongoingTouches[idx].pageXStart, ongoingTouches[idx].pageYStart));  // swap in the new touch record
        } else {
            //console.log("can't figure out which touch to continue");
        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    log("touchend");
    var el = document.getElementById("mainCanvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        //log("identifier end: " + typeof(touches[i].identifier) + ", " + touches[i].identifier);
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            checkGamepad("touchend", touches[i].pageX, touches[i].pageY, ongoingTouches[idx].pageXStart, ongoingTouches[idx].pageYStart);

            // ctx.lineWidth = 4;
            // ctx.fillStyle = color;
            // ctx.beginPath();
            // ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            // ctx.lineTo(touches[i].pageX, touches[i].pageY);
            // ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end

            ongoingTouches.splice(idx, 1);  // remove it; we're done
        } else {
            //console.log("can't figure out which touch to end");
        }
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    log("touchcancel");
    console.log("touchcancel.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        log("identifier cancel: " + typeof(touches[i].identifier) + ", " + touches[i].identifier);
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
}

function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    console.log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
}

function copyTouch(identifier, pageX, pageY, pageXStart, pageYStart) {
    return { identifier, pageX, pageY, pageXStart, pageYStart };
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
        return i;
        }
    }
    return -1;    // not found
}

function log(typetouch, keyCode, msg) {
    let debugInfo = typetouch;
    if(keyCode == null || keyCode == undefined) {
        //Nothing
    } else {
        if(typetouch == "touchstart") {
            sendAction(keyCode);
            debugInfo += ", key: " + keyCode;
        } else if(typetouch == "touchend") {
            sendAction(keyCode * 10);
            debugInfo += ", key: " + (keyCode * 10);
        } else {
            debugInfo += ", key: " + keyCode;
        }
    }
    if(msg == null || msg == undefined) {
        //Nothing
    } else {
        debugInfo += ", " + msg;
    }
    
    var el = document.getElementById("mainCanvas");
    var ctx = el.getContext("2d");
    ctx.font = "18px Arial";
    ctx.fillStyle = 'white';
    ctx.fillRect(WIDTH/2 - 160, 0, 320, 28);
    ctx.fillStyle = 'red';
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(debugInfo, WIDTH / 2, 5);
}