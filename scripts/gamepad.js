//These value get from https://developer.android.com/reference/android/view/KeyEvent#KEYCODE_DPAD_UP_LEFT
const KEYCODE_DPAD_LEFT = 21;
const KEYCODE_DPAD_RIGHT = 22;
const KEYCODE_DPAD_UP = 19;
const KEYCODE_DPAD_DOWN = 20;
const KEYCODE_BUTTON_L1 = 102;
const KEYCODE_BUTTON_R1 = 103;
const KEYCODE_BUTTON_SELECT = 109;
// const KEYCODE_BUTTON_X = 99;
// const KEYCODE_BUTTON_Y = 100;
// const KEYCODE_BUTTON_A = 96;
// const KEYCODE_BUTTON_B = 97;
const KEYCODE_BUTTON_X = 52;
const KEYCODE_BUTTON_Y = 53;
const KEYCODE_BUTTON_A = 29;
const KEYCODE_BUTTON_B = 30;

var imgGamepadWidth = WIDTH;
var imgGamepadHeight = HEIGHT;
var imgGamepadOffY = 0;
var imgGamepadOffX = 0;

var enableGamepad = false;

var gamepadBtn = [
    //object infor, x, y, w, h
    {isHighLight: false, imgIDHL: "", imgID: "imgBGDPad", draw: true, touchEnable: false, name: "dpad_pos_bg", x: 155, y: 60, w: 462, h: 462},
    {isHighLight: false, imgIDHL: "", imgID: "imgDPadNormal", draw: true, touchEnable: false, name: "dpad_pos", x: 200, y: 100, w: 380, h: 380},
    {isHighLight: false, imgIDHL: "imgDPadLeft", imgID: "", draw: false, touchEnable: true, name: "dpad_left", keyCode: KEYCODE_DPAD_LEFT, x: 200, y: 230, w: 130, h: 120},
    {isHighLight: false, imgIDHL: "imgDPadRight", imgID: "", draw: false, touchEnable: true, name: "dpad_right", keyCode: KEYCODE_DPAD_RIGHT, x: 450, y: 230, w: 130, h: 120},
    {isHighLight: false, imgIDHL: "imgDPadUp", imgID: "", draw: false, touchEnable: true, name: "dpad_up", keyCode: KEYCODE_DPAD_UP, x: 330, y: 100, w: 120, h: 130},
    {isHighLight: false, imgIDHL: "imgDPadDown", imgID: "", draw: false, touchEnable: true, name: "dpad_down", keyCode: KEYCODE_DPAD_DOWN, x: 330, y: 350, w: 120, h: 130},
    {isHighLight: false, imgIDHL: "imgLHL", imgID: "imgL", draw: true, touchEnable: true, name: "trigger_l", keyCode: KEYCODE_BUTTON_L1, x: 28, y: 458, w: 115, h: 224},
    {isHighLight: false, imgIDHL: "imgRHL", imgID: "imgR", draw: true, touchEnable: true, name: "trigger_r", keyCode: KEYCODE_BUTTON_R1, x: 1773, y: 458, w: 115, h: 224},

    //Keycode for press/release, touch enable?, name, x, y, w, h, xR, yR
    {isHighLight: false, imgIDHL: "imgXHL", imgID: "imgX", draw: true, touchEnable: true, name: "button_x", keyCode: KEYCODE_BUTTON_X, x: 1168, y: 204, w: 224, h: 224, xR: 1280, yR: 316},
    {isHighLight: false, imgIDHL: "imgYHL", imgID: "imgY", draw: true, touchEnable: true, name: "button_y", keyCode: KEYCODE_BUTTON_Y, x: 1355, y: 48, w: 224, h: 224, xR: 1467, yR: 160},
    {isHighLight: false, imgIDHL: "imgAHL", imgID: "imgA", draw: true, touchEnable: true, name: "button_a", keyCode: KEYCODE_BUTTON_A, x: 1355, y: 360, w: 224, h: 224, xR: 1467, yR: 472},
    {isHighLight: false, imgIDHL: "imgBHL", imgID: "imgB", draw: true, touchEnable: true, name: "button_b", keyCode: KEYCODE_BUTTON_B, x: 1536, y: 204, w: 224, h: 224, xR: 1648, yR: 316},
    {isHighLight: false, imgIDHL: "imgBackHL", imgID: "imgBack", draw: true, touchEnable: true, name: "button_back", keyCode: KEYCODE_BUTTON_SELECT, x: 870, y: 480, w: 180, h: 180, xR: 960, yR: 570},
    {isHighLight: false, imgIDHL: "", imgID: "imgBGMove", draw: true, touchEnable: false, name: "button_axis_left_bg", x: 350, y: 570, w: 464, h: 464, xR: 582, yR: 802},
    {isHighLight: false, imgIDHL: "", imgID: "imgBGMove", draw: true, touchEnable: false, name: "button_axis_right_bg", x: 1096, y: 570, w: 464, h: 464, xR: 1328, yR: 802},
    {isHighLight: false, imgIDHL: "", imgID: "imgControll", draw: true, touchEnable: false, name: "button_axis_left", keyCode: 0, x: 449, y: 669, w: 266, h: 266, xR: 582, yR: 802},
    {isHighLight: false, imgIDHL: "", imgID: "imgControll", draw: true, touchEnable: false, name: "button_axis_right", keyCode: 0, x: 1195, y: 669, w: 266, h: 266, xR: 1328, yR: 802},
];

var gamepadBtnScaled = [];

var isStyleAirConsole = true;

function checkPointInRect(x, y, rect_x, rect_y, rect_w, rect_h) {
    if(isPortrait() == true) {
        let x_backup = rect_x;
        rect_x = WIDTH - rect_y - rect_h;
        rect_y = x_backup;
        let w_backup = rect_w;
        rect_w = rect_h;
        rect_h = w_backup;
    }
    if(x < rect_x || x > rect_x + rect_w || y < rect_y || y > rect_y + rect_h) {
        return false;
    }
    return true;
}

function isPortrait() {
    let isPortrait = HEIGHT > WIDTH ? true : false;
    return isPortrait;
}

function checkPointInArc(x, y, xArc, yArc, rArc) {
    if(isStyleAirConsole == false) {
        let d = rArc - Math.sqrt((x - xArc) * (x - xArc) + (y - yArc) * (y - yArc));
        if(d < 0) {
            return false;
        }
        return true;
    } else {
        if(isPortrait() == true) {
            let x_backup = xArc;
            xArc = WIDTH - yArc;
            yArc = x_backup;
        }
        let d = rArc - Math.sqrt((x - xArc) * (x - xArc) + (y - yArc) * (y - yArc));
        if(d < 0) {
            return false;
        }
        return true;
    }
}

var initedGamepadBtnScaled = 0; 
function initGamepadBtnScaled() {
    if(initedGamepadBtnScaled == 1)
        return;
        initedGamepadBtnScaled = 1;
    for(let i = 0; i < gamepadBtn.length; i++) {
        gamepadBtnScaled[i] = {};
        gamepadBtnScaled[i].isHighLight = gamepadBtn[i].isHighLight;
        gamepadBtnScaled[i].imgID = gamepadBtn[i].imgID;
        gamepadBtnScaled[i].imgIDHL = gamepadBtn[i].imgIDHL;
        gamepadBtnScaled[i].draw = gamepadBtn[i].draw;
        gamepadBtnScaled[i].touchEnable = gamepadBtn[i].touchEnable;
        gamepadBtnScaled[i].name = gamepadBtn[i].name;
        if(gamepadBtn[i]["keyCode"] != null) {
            gamepadBtnScaled[i].keyCode = gamepadBtn[i].keyCode;
        }
        gamepadBtnScaled[i].x = gamepadBtn[i].x;
        gamepadBtnScaled[i].y = gamepadBtn[i].y;
        gamepadBtnScaled[i].w = gamepadBtn[i].w;
        gamepadBtnScaled[i].h = gamepadBtn[i].h;
        if(gamepadBtn[i]["xR"] != null) {
            gamepadBtnScaled[i].xR = gamepadBtn[i].xR;
        }
        if(gamepadBtn[i]["yR"] != null) {
            gamepadBtnScaled[i].yR = gamepadBtn[i].yR;
        }
    }
}

//Update postion gamepad when canvas change size, ex: portrait -> landscape, landscape -> portrait
function updateGamepadScale() {
    initGamepadBtnScaled();
    let scale_w = imgGamepadWidth / 1920;
    let scale_h = imgGamepadHeight / 1080;

    // if(isStyleAirConsole == true) {
    //     let w_new = imgGamepadWidth > imgGamepadHeight ? imgGamepadWidth : imgGamepadHeight;
    //     let h_new = imgGamepadHeight < imgGamepadWidth ? imgGamepadHeight : imgGamepadWidth;
    //     scale_w = w_new / 1920;
    //     scale_h = h_new / 1080;
    // }
    
    //Clone and scale
    for(let i = 0; i < gamepadBtn.length; i++) {
        gamepadBtnScaled[i].x = gamepadBtn[i].x * scale_w;
        gamepadBtnScaled[i].y = gamepadBtn[i].y * scale_h + imgGamepadOffY;
        gamepadBtnScaled[i].w = gamepadBtn[i].w * scale_w;
        gamepadBtnScaled[i].h = gamepadBtn[i].h * scale_h;
        if(gamepadBtn[i]["xR"] != null) {
            gamepadBtnScaled[i].xR = gamepadBtn[i].xR * scale_w;
        }
        if(gamepadBtn[i]["yR"] != null) {
            gamepadBtnScaled[i].yR = gamepadBtn[i].yR * scale_h + imgGamepadOffY;
        }
    }
}

//Draw
function drawGamepad(ctx) {
    if(isStyleAirConsole == false) {
        imgGamepadWidth = WIDTH;
        imgGamepadHeight = imgGamepadWidth / 1920 * 1080;
        if(imgGamepadHeight > HEIGHT) {
            imgGamepadHeight = HEIGHT;
            imgGamepadOffY = 0;
        } else {
            imgGamepadOffY = HEIGHT / 2 - imgGamepadHeight / 2;
        }
        imgGamepadOffX = 0;
    } else {
        let w_new =  WIDTH > HEIGHT ? WIDTH : HEIGHT;;
        let h_new = HEIGHT < WIDTH ? HEIGHT : WIDTH;
        imgGamepadWidth = w_new;
        imgGamepadHeight = imgGamepadWidth / 1920 * 1080;
        if(imgGamepadHeight > h_new) {
            imgGamepadHeight = h_new;
            imgGamepadOffY = 0;
        } else {
            imgGamepadOffY = h_new / 2 - imgGamepadHeight / 2;
        }

        // let isPortrait = HEIGHT > WIDTH ? true : false;
        // if(isPortrait == false) {
        //     if(imgGamepadHeight > HEIGHT) {
        //         imgGamepadHeight = HEIGHT;
        //         imgGamepadOffY = 0;
        //     } else {
        //         imgGamepadOffY = HEIGHT / 2 - imgGamepadHeight / 2;
        //     }
        //     imgGamepadOffX = 0;
        // } else {

        // }
    }
    updateGamepadScale();
    drawGamepadBackground(ctx);
    drawGamepadItems(ctx);
}

function drawGamepadBackground(ctx) {
    ctx.fillStyle = '#080D11';
    if(isStyleAirConsole == false) {
        ctx.fillRect(0, imgGamepadOffY, imgGamepadWidth, imgGamepadHeight);
    } else {
        let isPortrait = HEIGHT > WIDTH ? true : false;
        if(isPortrait == false) {
            ctx.fillRect(0, imgGamepadOffY, imgGamepadWidth, imgGamepadHeight);
        } else {
            ctx.fillRect(WIDTH - imgGamepadHeight - imgGamepadOffY, 0, imgGamepadHeight, imgGamepadWidth);
        }
    }
}

function drawGamepadItems(ctx) {
    let item;
    for(let i = 0; i < gamepadBtnScaled.length; i++) {
        item = gamepadBtnScaled[i];
        if(item.draw == true) {
            // console.log("isHighLight: " + item.isHighLight);
            // console.log("imgID: " + item.imgID);
            if(item.isHighLight == false) {
                if(item.imgID != "") {
                    // ctx.drawImage(document.getElementById(item.imgID), item.x, item.y, item.w, item.h);
                    drawImageOption(ctx, item.imgID, item.x, item.y, item.w, item.h);
                }
            } else {
                if(item.imgIDHL != "") {
                    if(item.name == "dpad_left" || item.name == "dpad_right" || item.name == "dpad_up" || item.name == "dpad_down") {
                        let posDraw = gamepadBtnScaled[1];
                        // ctx.drawImage(document.getElementById(item.imgIDHL), posDraw.x, posDraw.y, posDraw.w, posDraw.h);
                        drawImageOption(ctx, item.imgIDHL, posDraw.x, posDraw.y, posDraw.w, posDraw.h);
                    } else {
                        // ctx.drawImage(document.getElementById(item.imgIDHL), item.x, item.y, item.w, item.h);
                        drawImageOption(ctx, item.imgIDHL, item.x, item.y, item.w, item.h);
                    }
                }
            }
        }
    }
}

function drawImageOption(ctx, imageID, posX, posY, imageW, imageH) {
    if(isStyleAirConsole == false) {
        ctx.drawImage(document.getElementById(imageID), posX, posY, imageW, imageH);
    } else {
        //draw support on both portrait and landscape
        let isPortrait = HEIGHT > WIDTH ? true : false;
        if(isPortrait == false) {
            ctx.drawImage(document.getElementById(imageID), posX, posY, imageW, imageH);
        } else {
            ctx.save();

            let newPosX = WIDTH - posY;
            let newPosY = posX;
            ctx.translate(newPosX, newPosY);
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(document.getElementById(imageID), 0, 0, imageW, imageH);

            ctx.restore();
        }
    }
}

function checkGamepad(ctx, typetouch, x, y, x2, y2) {
    if(typetouch == "touchstart" || typetouch == "touchend") { //similar with Key Press
        let item, i;
        let xTouch = x, yTouch = y; //for touchstart
        if(typetouch == "touchend") { //since user touch and move to other position, so use x2 + y2 to identify item with touchstart
            xTouch = x2;
            yTouch = y2;
        }
        for(i = 0; i < gamepadBtnScaled.length; i++) {
            item = gamepadBtnScaled[i];
            if(item.touchEnable == true) {//Only check with item can touch
                if(item["xR"] != null && item["yR"] != null) { //button Arc as: X, Y, A, B, Back, Axis Left/Right
                    if(checkPointInArc(xTouch, yTouch, item.xR, item.yR, item.w < item.h ? item.w / 2 : item.h / 2) == true) {
                        log(typetouch, item.keyCode, item.name);
                        drawGamepadItem(ctx, typetouch, item);
                        
                    }
                } else { //button rect as: left/right/up/down, Trigger L/R
                    if(checkPointInRect(xTouch, yTouch, item.x, item.y, item.w, item.h) == true) {
                        log(typetouch, item.keyCode, item.name);
                        drawGamepadItem(ctx, typetouch, item);
                    }
                }
            }
        }
    }
}

function drawGamepadItem(ctx, typetouch, item) {
    let imgIDDraw = item.imgID;
    let itemDraw = item;
    if(typetouch == "touchstart") {
        imgIDDraw = item.imgIDHL;
    }
    if(item.name == "button_axis_left" || item.name == "button_axis_right") { //Don't has highlight to draw
        return;
    }

    // if(item.name == "dpad_left" || item.name == "dpad_right" || item.name == "dpad_up" || item.name == "dpad_down") {
    //     //Use x, y, w, h of imgDPadNormal
    //     itemDraw = gamepadBtnScaled[1];
    //     if(typetouch == "touchend") {
    //         imgIDDraw = gamepadBtnScaled[1].imgID;
    //     }
    //     //Draw dpad bg:
    //     let itemDpadBG = gamepadBtnScaled[0];
    //     ctx.drawImage(document.getElementById(itemDpadBG.imgID), itemDpadBG.x, itemDpadBG.y, itemDpadBG.w, itemDpadBG.h);    
    // }
    if(item.name == "dpad_left" || item.name == "dpad_right" || item.name == "dpad_up" || item.name == "dpad_down") {
        if(typetouch == "touchend") {
            item.isHighLight = false;
            item.draw = false;
            return;
        } else if(typetouch == "touchstart") {
            itemDraw = gamepadBtnScaled[1];
        }
    }
    // ctx.drawImage(document.getElementById(imgIDDraw), itemDraw.x, itemDraw.y, itemDraw.w, itemDraw.h);
    drawImageOption(ctx, imgIDDraw, itemDraw.x, itemDraw.y, itemDraw.w, itemDraw.h);

    //Update status:
    item.draw = true;
    console.log("drawGamepadItem, typetouch: " + typetouch);
    if(typetouch == "touchstart") {
        if(item.imgIDHL != "") {
            item.isHighLight = true;
            console.log("drawGamepadItem, set isHighLight = " + item.isHighLight);
        }
    } else if (typetouch == "touchend") {
        if(item.imgIDHL != "") {
            item.isHighLight = false;
            console.log("drawGamepadItem, set isHighLight = " + item.isHighLight);
        }
    }
}

function onTestGamepad() {
    document.getElementById("divMainMenu").style.display = "none";

    enableGamepad = true;
    resizeCanvas();
}