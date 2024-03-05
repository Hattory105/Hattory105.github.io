const appLayout = {
    layout0: 0, //none - lock screen
    layout1: 1, //menu
    layout2: 2, //action phase
    layout3: 3, //input number
}

var appLayoutCurrent = appLayout.layout0;
var appLayoutSDK = appLayout.layout3;
var canvasW = 0, canvasH = 0;
var screenRatio = 1.0; //fullHD: 1920x1080
var el = document.getElementById("dpadCanvas");
var ctx = el.getContext("2d");

var testUILayout = !true;
var useWebSocketTransfer = true;
var enableLog = !false;

document.addEventListener("DOMContentLoaded",startup());

function startup() {
    //console.log('startup');
    loadImages();
}

window.onload = function() {
    console.log('onload');
    //initHttpPool();
    switch (document.readyState) {
        case "loading":
            writeLog("onload - The document is loading.");
            break;
        case "interactive":
            writeLog("onload - The document has finished loading and we can access DOM elements");
            break;
        case "complete":
            writeLog("onload - The page is fully loaded");
            el.addEventListener("click", handleClick, false);
            el.addEventListener("touchstart", handleStart, false);
            el.addEventListener("touchmove", handleMove, false);
            el.addEventListener("touchend", handleEnd, false);
            el.addEventListener("touchcancel", handleCancel, false);

            if ((getOperatingSystem()=="iPad") || (getOperatingSystem()=="iPhone")) {
                //console.log('lock true');
                isLocked = true;
                // switchLayout(appLayout.layout1);
                currentLayout0Substate = layout0Substate.stateIconTouchScreen;
            }

            el.width = canvasW = 1920;
            el.height = canvasH = 1080;
            setInterval(updatePaint, 100);

            // if(!useWebSocketTransfer) {
            //     setInterval(doActionInQueue_V3, 20);
            //     setInterval(pingIn, 1500);
            // } else {
            //     requestWebsocketPort();
            //     // if(!webSocket_client.isOpen()) {
            //     //     webSocket_client.openSocket();
            //     // }
            //     setInterval(PingInSocket, 1500);
            // }
            
            break;
    }
};

function updatePaint()
{
    // console.log("updatePaint");
    appUpdate();
    appPaint();
}

function switchLayout(layout, fromSDK = false)
{
    // console.log("switchLayout - layout: " + layout);
    if(fromSDK)
    {
        appLayoutSDK = layout;
        if(appLayoutCurrent == appLayout.layout0)
        {
            return;
        }
    }

    if(appLayoutCurrent != layout)
    {
        loadLayout(layout);
        appLayoutCurrent = layout;
    }
}

function appUpdate()
{
    if(ratioIsChanged())
    {
        loadLayout(appLayoutCurrent);
    }
}

function appPaint()
{
    switch(appLayoutCurrent)
    {
        case appLayout.layout0:
            drawLayout0();
            break;
        case appLayout.layout1:
            drawLayout01();
            break;
        case appLayout.layout2:
            drawLayout02();
            break;
        case appLayout.layout3:
            drawLayout03();
            break;
    }
}

function drawActionButton(ctx, infoButton)
{
    if(!infoButton.active) {
        drawImageRotate(ctx, infoButton.image, infoButton.isRotate, infoButton.x, infoButton.y, infoButton.w, infoButton.h);
    } else {
        drawImageRotate(ctx, infoButton.imagePress, infoButton.isRotate, infoButton.x, infoButton.y, infoButton.w, infoButton.h);
    }

    drawObjectTouch(ctx, infoButton);
    drawArrTouch(ctx, infoButton);
}

function getCanvasWidth()
{
    if(window.outerWidth != 0 && window.innerWidth != 0)
    {
        return window.outerWidth < window.innerWidth ? window.outerWidth : window.innerWidth;
    }
    return window.outerWidth || window.innerWidth;
}

function getCanvasHeight()
{
    if(window.outerHeight != 0 && window.innerHeight != 0)
    {
        return window.outerHeight < window.innerHeight ? window.outerHeight : window.innerHeight;
    }
    return window.outerHeight || window.innerHeight;
}

function ratioIsChanged()
{
    if(canvasW != getCanvasWidth() || canvasH != getCanvasHeight())
    {
        let scaleWidth = getCanvasWidth() / 1920;
        let scaleHeight = getCanvasHeight() / 1080;
        if(isPortraitMode()) {
            scaleWidth = getCanvasHeight() / 1920;
            scaleHeight = getCanvasWidth() / 1080;
        }
        screenRatio = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;
        el.width = canvasW = getCanvasWidth();
        el.height = canvasH = getCanvasHeight();
        return true;
    }
    return false;
}