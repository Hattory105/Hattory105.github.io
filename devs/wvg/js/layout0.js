const layout0Substate = {
    stateIconFullScreen: 0,
    stateIconTouchScreen: 1
}

const dataLO0 = {
    buttonIconFullScreenWidth: 342,
    buttonIconFullScreenHeight: 342,
    buttonIconTouchScreenWidth: 342,
    buttonIconTouchScreenHeight: 342,
}

var isLocked = false;
var iconFullScreenInfo = {};
var iconTouchScreenInfo = {};
var currentLayout0Substate = layout0Substate.stateIconFullScreen;

function loadLayout0()
{
    //Icon FullScreen
    iconFullScreenInfo.w = dataLO0.buttonIconFullScreenWidth * screenRatio;
    iconFullScreenInfo.h = dataLO0.buttonIconFullScreenHeight * screenRatio;
    iconFullScreenInfo.x = canvasW / 2 - iconFullScreenInfo.w / 2;
    iconFullScreenInfo.y = canvasH / 2 - iconFullScreenInfo.h / 2;
    //Icon TouchScreen
    iconTouchScreenInfo.w = dataLO0.buttonIconTouchScreenWidth * screenRatio;
    iconTouchScreenInfo.h = dataLO0.buttonIconTouchScreenHeight * screenRatio;
    iconTouchScreenInfo.x = canvasW / 2 - iconFullScreenInfo.w / 2;
    iconTouchScreenInfo.y = canvasH / 2 - iconFullScreenInfo.h / 2;
}

function drawLayout0()
{
    ctx.fillStyle = "#080D11";
    ctx.fillRect(0, 0, canvasW, canvasH);
    switch(currentLayout0Substate)
    {
        case layout0Substate.stateIconFullScreen:
            drawImageRotate(ctx, imgIconFullScreen, false, iconFullScreenInfo.x, iconFullScreenInfo.y, iconFullScreenInfo.w, iconFullScreenInfo.h);
            break;
        case layout0Substate.stateIconTouchScreen:
            drawImageRotate(ctx, imgIconTouchScreen, false, iconTouchScreenInfo.x, iconTouchScreenInfo.y, iconTouchScreenInfo.w, iconTouchScreenInfo.h);
            break;
    }
}

/* View in fullscreen */
function lockFullscreen() {
    if (document.documentElement.requestFullscreen) {					/* Chrome */
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { 		/* IE11 */
        document.documentElement.msRequestFullscreen();
    }
    screen.orientation.lock(screen.orientation.type).then(() => {
    }).catch((error) => {
        //console.log("Locked error: " + error);
    });

    if ((canvasW > canvasH) && (screen.orientation.type=="portrait-primary")) {
        screen.orientation.lock("landscape-primary");
        //screen.orientation.lock("portrait-primary");
    }

    // switchLayout(appLayoutSDK);
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    screen.orientation.unlock();
}

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

function onFullScreenChange() {
    writeLog('lock change');
    if (getOperatingSystem() == "Android")
        isLocked = !isLocked;
    if (!isLocked) {
        currentLayout0Substate = layout0Substate.stateIconFullScreen;
        switchLayout(appLayout.layout0);
    }
}