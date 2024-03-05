var touchesAction = [];

//----------------- Control -----------------//
function handleClick(event) {
    writeLog("handleClick");
    var x = event.pageX - el.getBoundingClientRect().left;
    var y = event.pageY - el.getBoundingClientRect().top;
    switch(appLayoutCurrent)
    {
        case appLayout.layout0:
            switch(currentLayout0Substate)
            {
                case layout0Substate.stateIconFullScreen:
                    // if (getOperatingSystem()!="iPad" || getOperatingSystem()!="iPhone") {
                        // if (isInsideActionRect(x, y, iconFullScreenInfo.x, iconFullScreenInfo.y, iconFullScreenInfo.w, iconFullScreenInfo.h)) {
                            lockFullscreen();
                            currentLayout0Substate = layout0Substate.stateIconTouchScreen;
                        // }
                    // }
                    break;
                case layout0Substate.stateIconTouchScreen:
                    // if (getOperatingSystem()!="iPad" || getOperatingSystem()!="iPhone") {
                        // if (isInsideActionRect(x, y, iconTouchScreenInfo.x, iconTouchScreenInfo.y, iconTouchScreenInfo.w, iconTouchScreenInfo.h)) {
                            switchLayout(appLayoutSDK);
                        // }
                    // }
                    break;
            }
            break;
        default:
            break;
    }
}

function handleStart(event) {
    writeLog("handleStart");
    var x = event.changedTouches[0].pageX - el.getBoundingClientRect().left;
    var y = event.changedTouches[0].pageY - el.getBoundingClientRect().top;
    writeLog("x: " + x + ", y: " + y);
    writeLog("pageX: " + event.changedTouches[0].pageX + ", pageY: " + event.changedTouches[0].pageY);
    writeLog("left: " + el.getBoundingClientRect().left + ", top: " + el.getBoundingClientRect().top);
    writeLog("testUILayout: " + testUILayout + ", appLayoutCurrent: " + appLayoutCurrent + ", isLocked: " + isLocked);

    if(testUILayout)
    {
        handleStartTest(x, y, appLayoutCurrent);
    }

    switch(appLayoutCurrent)
    {
        case appLayout.layout1:
        case appLayout.layout2:
        case appLayout.layout3:
        {
            if (isLocked)
            {
                event.preventDefault();
                var changedTouches = event.changedTouches;
                writeLog("changedTouches.length: " + changedTouches.length);
                for (var i = 0; i < changedTouches.length; i++) {
                    var touch = changedTouches[i];
                    var btnId = -1;
                    var pX = touch.pageX-el.getBoundingClientRect().left;
                    var pY = touch.pageY-el.getBoundingClientRect().top;
                    var isActionDown = false;
                    var extendTouch = 1.0;
                    // var pX = touch.pageX;
                    // var pY = touch.pageY;
                    writeLog("actionArea.length: " + actionArea.length);
                    for (var j = 0; j < actionArea.length; j++) {
                        isActionDown = false;
                        extendTouch = 1.0;
                        writeLog("j: " + j + ", actionArea[j].touchEnable: " + actionArea[j].touchEnable + ", actionArea[j].active: " + actionArea[j].active);
                        if(actionArea[j]['touchEnable'] != undefined && actionArea[j].touchEnable && !actionArea[j].active) {
                            writeLog("extendTouch: " + actionArea[j]['extendTouch'] + ", isCircle: " + actionArea[j]['isCircle']);
                            if(actionArea[j]['extendTouch'] != undefined) {
                                extendTouch = actionArea[j].extendTouch;
                            }
                            if(actionArea[j]['isCircle'] != undefined && actionArea[j].isCircle) {
                                writeLog("pX: " + pX + ", pY: " + pY + ", cx: " + actionArea[j].cx + ", cy: " + actionArea[j].cy + ", r: " + actionArea[j].r);
                                if(isPointInCircle(pX, pY, actionArea[j].cx, actionArea[j].cy, actionArea[j].r * extendTouch)) {
                                    isActionDown = true;
                                }
                            } else {
                                var actionX = actionArea[j].x;
                                var actionY = actionArea[j].y;
                                var actionW = actionArea[j].w;
                                var actionH = actionArea[j].h;
                                if(extendTouch != 1.0) {
                                    actionW *= extendTouch;
                                    actionH *= extendTouch;
                                    actionX = actionX - (actionW - actionArea[j].w) / 2;
                                    actionY = actionY - (actionH - actionArea[j].h) / 2;
                                }
                                writeLog("pX: " + pX + ", pY: " + pY + ", actionX: " + actionX + ", actionY: " + actionY + ", actionW: " + actionW + ", actionH: " + actionH);
                                if(isInsideActionRect(pX, pY, actionX, actionY, actionW, actionH)) {
                                    isActionDown = true;
                                }
                            }
                            if(!isActionDown && actionArea[j]['arrTouch'] != undefined && actionArea[j].arrTouch.length > 0) {
                                console.log("checking arrTouch, length: " + actionArea[j].arrTouch.length + ", pX: " + pX + ", pY: " + pY);
                                for(var ii = 0; ii < actionArea[j].arrTouch.length; ii++) {
                                    var touchTmp = actionArea[j].arrTouch[ii];
                                    console.log("touchTmp, x: " + touchTmp.x + ", y: " + touchTmp.y + ", w: " + touchTmp.w + ", h: " + touchTmp.h);
                                    if(isInsideActionRect(pX, pY, touchTmp.x, touchTmp.y, touchTmp.w, touchTmp.h)) {
                                        isActionDown = true;
                                        break;
                                    }
                                }
                            }
                            writeLog("isActionDown: " + isActionDown);
                            if (isActionDown) {
                                btnId = j;
                                writeLog("handleStart!!! btnId "+ btnId);
                                console.log("handleStart!!! btnId "+ btnId);
                                // doActionPressed(j);
                                actionArea[j].active = true;
                                touchesAction.push({ id: changedTouches[i].identifier, buttonId: btnId, isDpad: false});
                                // if(appLayoutCurrent == appLayout.layout3)
                                // {
                                //     layout03ActionDown(actionArea[j].keyCode);
                                // }
                                // else
                                if(appLayoutCurrent != appLayout.layout3)
                                {
                                    sendActionDown(actionArea[j].keyCode);
                                }
                                return;
                            }
                        }
                    }
                }
                
            }

            if (isLocked)
            {
                if (dpadArea.length > 0 && isPointInCircle(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r)) {
                    handleTouchInDpad(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r, true);
                    writeLog("handleStart - touch on dpad");
                    dpadArea[dpadConst.dpadBG].active = true;
                    touchesAction.push({ id: event.changedTouches[0].identifier, buttonId: -1, isDpad: true});
                }
            }
            break;
        }
    }
    
    
}

function handleMove(event) {
    var x = event.changedTouches[0].pageX - el.getBoundingClientRect().left;
    var y = event.changedTouches[0].pageY - el.getBoundingClientRect().top;

    switch(appLayoutCurrent)
    {
        case appLayout.layout1:
        case appLayout.layout2:
        {
            let isTouchDpad = isTouchOnDpad(event);
            // console.log("handleMove - isTouchDpad: " + isTouchDpad);

            // if (isLocked)
            if(isLocked && isTouchDpad)
            {
                if (isPointInCircle(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r)) {
                    handleTouchInDpad(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r, true);
                } else {
                    if (event.targetTouches.length > 1) {
                        x = event.changedTouches[0].pageX - el.getBoundingClientRect().left;
                        y = event.changedTouches[0].pageY - el.getBoundingClientRect().top;
                        if (!isPointInCircle(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r)) {
                            arrowDisactiveAll();
                            // drawDpad(5);
                        }
                    } else {
                        // console.log("handleMove - move on dpad 04");
                        arrowDisactiveAll();
                        //     drawDpad(5);
                    }
                }
                
                if (arrowActiveCount() > 0) {
                    dpadArea[dpadConst.dpadBG].active = true;
                } else {
                    dpadArea[dpadConst.dpadBG].active = false;
                }
            }
            break;
        }
    }
}

function handleEnd(event) {
    // console.log("Touch handleEnd");
    var x = event.changedTouches[0].pageX - el.getBoundingClientRect().left;
    var y = event.changedTouches[0].pageY - el.getBoundingClientRect().top;

    switch(appLayoutCurrent)
    {
        case appLayout.layout1:
        case appLayout.layout2:
        case appLayout.layout3:
        {
            let isTouchDpad = isTouchOnDpad(event);
            // console.log("handleEnd - isTouchDpad: " + isTouchDpad);

            if(isLocked)
            {
                // if (isLocked)
                if(!isTouchDpad)
                {
                    event.preventDefault();
                    var changedTouches = event.changedTouches;
                    for (var i = 0; i < changedTouches.length; i++) {
                        var touch = changedTouches[i];
                        var index = getTouchActionIndex(changedTouches[i].identifier);
                        if (index >= 0) {
                            let actionBtn = touchesAction[index].buttonId;
                            // doActionRelease(actionBtn);
                            console.log("touch.js - actionBtn: " + actionBtn);
                            actionArea[actionBtn].active = false;
                            if(appLayoutCurrent != appLayout.layout3)
                            {
                                sendActionUp(actionArea[actionBtn].keyCode);
                            }
                            else
                            {
                                layout03Action(actionArea[actionBtn].keyCode);
                            }
                            // return;
                        }
                    }
                }

                // if (isLocked)
                if(isTouchDpad)
                {
                    if (arrowActiveCount() > 0)
                    {
                        //console.log("sendEnd: release");
                        if (isPointInCircle(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r)) {
                            handleTouchInDpad(x, y, dpadArea[dpadConst.dpadBG].cx, dpadArea[dpadConst.dpadBG].cy, dpadArea[dpadConst.dpadBG].r, false) ;
                        }
                    }
                    
                    if (arrowActiveCount() == 0)
                    {
                        dpadArea[dpadConst.dpadBG].active = false;
                    }
                }

                var index = getTouchActionIndex(event.changedTouches[0].identifier);
                if (index >= 0) {
                    touchesAction.splice(index, 1);
                }
            }
            break;
        }
    }
}

function handleCancel(event) {
    writeLog("Touch Cancel");
}

function getTouchActionIndex(id) {
    // console.log("getTouchActionIndex - length: " + touchesAction.length);
    for (var i = 0; i < touchesAction.length; i++) {
        if (touchesAction[i].id === id) {
            // console.log("getTouchActionIndex - touchesAction i: " + i);
            return i;
        }
    }
    return -1;
}

function isTouchOnDpad(event) {
    let index = getTouchActionIndex(event.changedTouches[0].identifier);
    if(index >= 0) {
        return touchesAction[index].isDpad;
    }
    return false;
}
