var dpadKeycodeCurrent = 0;

function arrowActiveCount() {
    let count = 0;
    for(let i = 1; i < dpadConst.dpadNumber; i++) {
        if(dpadArea[i].active) {
            count++;
        }
    }
    return count;
}

function arrowDisactiveAll() {
    if (dpadKeycodeCurrent != 0) {
        sendDpadUp(dpadKeycodeCurrent);
    }
    for(let i = 0; i < dpadConst.dpadNumber; i++) {
        if(dpadArea[i].active) {
            dpadArea[i].active = false;
        }
    }
    dpadKeycodeCurrent = 0;
}

function handleTouchInDpad(x, y, dpadCenterPosX, dpadCenterPosY, dpadRadius, isPressed) {
    //console.log("dpadCenterPosX"+dpadCenterPosX+" dpadCenterPosY: "+dpadCenterPosY);
    var disX = x - dpadCenterPosX;
    var disY = y - dpadCenterPosY;

    // //handle touch in center, example disX/disY <= dpadRadius/6
    // if (Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2)) <= dpadRadius/6)
    // {
    //     arrowDisactiveAll();
    //     drawDpad(5);
    //     return;
    // }

    detectDirectionTouchInDpad(calcAngleDegrees(disX, disY), isPressed);
}

//return: The angle in radians (between -Pi and Pi, inclusive) between the positive y-axis and the ray from center of dpad to the touch point (x, y).
function calcAngleDegrees(x, y) {
    //console.log("x: "+x+" y: "+y);
    return Math.atan2(y, x) * 180 / Math.PI;
}

function detectDirectionTouchInDpad(radian, isPressed) {
    //console.log("radian: "+radian);
    //left
    if (Math.abs(radian) > 150)
    {
        handleDirectionTouch(1, isPressed);
    }
    //up direction
    else if (radian > 60 && radian < 120)
    {
        handleDirectionTouch(4, isPressed);
    }
    //right
    else if (Math.abs(radian) < 30)
    {
        handleDirectionTouch(3, isPressed);
    }
    //down
    else if (radian > -120 && radian < -60)
    {
        handleDirectionTouch(2, isPressed);
    }
    else {
        //none direction, release all dpad keys
        arrowDisactiveAll();
    }
}
function handleDirectionTouch(direction, isPressed) {
    writeLog("direction: "+direction)
    switch (direction) {
        case 1: //Key Left
            if(isPressed) {
                if(!dpadArea[dpadConst.dpadLeft].active) {
                    dpadArea[dpadConst.dpadLeft].active = true;
                    if(!isPortraitMode()) {
                        sendDpadDown(KEYCODE_DPAD_LEFT);
                    } else {
                        sendDpadDown(KEYCODE_DPAD_DOWN);
                    }
                }
            } else {
                if(dpadArea[dpadConst.dpadLeft].active) {
                    dpadArea[dpadConst.dpadLeft].active = false;
                    if(!isPortraitMode()) {
                        sendDpadUp(KEYCODE_DPAD_LEFT);
                    } else {
                        sendDpadUp(KEYCODE_DPAD_DOWN);
                    }
                }
            }
            break;
        case 2: //Key Up
            if(isPressed) {
                if(!dpadArea[dpadConst.dpadUp].active) {
                    dpadArea[dpadConst.dpadUp].active = true;
                    if(!isPortraitMode()) {
                        sendDpadDown(KEYCODE_DPAD_UP);
                    } else {
                        sendDpadDown(KEYCODE_DPAD_LEFT);
                    }
                }
            } else {
                if(dpadArea[dpadConst.dpadUp].active) {
                    dpadArea[dpadConst.dpadUp].active = false;
                    if(!isPortraitMode()) {
                        sendDpadUp(KEYCODE_DPAD_UP);
                    } else {
                        sendDpadUp(KEYCODE_DPAD_LEFT);
                    }
                }
            }
            break;
        case 3: //Key Right
            if(isPressed) {
                if(!dpadArea[dpadConst.dpadRight].active) {
                    dpadArea[dpadConst.dpadRight].active = true;
                    if(!isPortraitMode()) {
                        sendDpadDown(KEYCODE_DPAD_RIGHT);
                    } else {
                        sendDpadDown(KEYCODE_DPAD_UP);
                    }
                }
            } else {
                if(dpadArea[dpadConst.dpadRight].active) {
                    dpadArea[dpadConst.dpadRight].active = false;
                    if(!isPortraitMode()) {
                        sendDpadUp(KEYCODE_DPAD_RIGHT);
                    } else {
                        sendDpadUp(KEYCODE_DPAD_UP);
                    }
                }
            }
            break;
        case 4: //Key Down
        if(isPressed) {
            if(!dpadArea[dpadConst.dpadDown].active) {
                dpadArea[dpadConst.dpadDown].active = true;
                if(!isPortraitMode()) {
                    sendDpadDown(KEYCODE_DPAD_DOWN);
                } else {
                    sendDpadDown(KEYCODE_DPAD_RIGHT);
                }
            }
        } else {
            if(dpadArea[dpadConst.dpadDown].active) {
                dpadArea[dpadConst.dpadDown].active = false;
                if(!isPortraitMode()) {
                    sendDpadUp(KEYCODE_DPAD_DOWN);
                } else {
                    sendDpadUp(KEYCODE_DPAD_RIGHT);
                }
            }
        }
            break;
    }
    if (isPressed==false)
    {
        // drawDpad(5);
        //console.log("fffffffffffffffffff");
    }
}

function drawDpad() {
    //Dpad Background
    if(!dpadArea[dpadConst.dpadBG].active) {
        ctx.drawImage(imgDpadBG, dpadArea[dpadConst.dpadBG].x, dpadArea[dpadConst.dpadBG].y, dpadArea[dpadConst.dpadBG].w, dpadArea[dpadConst.dpadBG].h);
    } else {
        ctx.drawImage(imgDpadBGP, dpadArea[dpadConst.dpadBG].x, dpadArea[dpadConst.dpadBG].y, dpadArea[dpadConst.dpadBG].w, dpadArea[dpadConst.dpadBG].h);
    }
    //Dpad Up
    if(!dpadArea[dpadConst.dpadUp].active) {
        ctx.drawImage(imgDpadUp, dpadArea[dpadConst.dpadUp].x, dpadArea[dpadConst.dpadUp].y, dpadArea[dpadConst.dpadUp].w, dpadArea[dpadConst.dpadUp].h);
    } else {
        ctx.drawImage(imgDpadUpP, dpadArea[dpadConst.dpadUp].x, dpadArea[dpadConst.dpadUp].y, dpadArea[dpadConst.dpadUp].w, dpadArea[dpadConst.dpadUp].h);
    }
    if(!dpadArea[dpadConst.dpadDown].active) {
    //Dpad Down
        ctx.drawImage(imgDpadDown, dpadArea[dpadConst.dpadDown].x, dpadArea[dpadConst.dpadDown].y, dpadArea[dpadConst.dpadDown].w, dpadArea[dpadConst.dpadDown].h);
    } else {
        ctx.drawImage(imgDpadDownP, dpadArea[dpadConst.dpadDown].x, dpadArea[dpadConst.dpadDown].y, dpadArea[dpadConst.dpadDown].w, dpadArea[dpadConst.dpadDown].h);
    }
    //Dpad Left
    if(!dpadArea[dpadConst.dpadLeft].active) {
        ctx.drawImage(imgDpadLeft, dpadArea[dpadConst.dpadLeft].x, dpadArea[dpadConst.dpadLeft].y, dpadArea[dpadConst.dpadLeft].w, dpadArea[dpadConst.dpadLeft].h);
    } else {
        ctx.drawImage(imgDpadLeftP, dpadArea[dpadConst.dpadLeft].x, dpadArea[dpadConst.dpadLeft].y, dpadArea[dpadConst.dpadLeft].w, dpadArea[dpadConst.dpadLeft].h);
    }
    //Dpad Right
    if(!dpadArea[dpadConst.dpadRight].active) {
        ctx.drawImage(imgDpadRight, dpadArea[dpadConst.dpadRight].x, dpadArea[dpadConst.dpadRight].y, dpadArea[dpadConst.dpadRight].w, dpadArea[dpadConst.dpadRight].h);
    } else {
        ctx.drawImage(imgDpadRightP, dpadArea[dpadConst.dpadRight].x, dpadArea[dpadConst.dpadRight].y, dpadArea[dpadConst.dpadRight].w, dpadArea[dpadConst.dpadRight].h);
    }
}