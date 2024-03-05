var inputNumber = 0;

//Position x,y and size w,h follow with screen 1920x1080, so it will be auto scale to other screen with screenRatio
const dataLO3 = {
    //index in actionArea
    button0: 0,
    button1: 1,
    button2: 2,
    button3: 3,
    button4: 4,
    button5: 5,
    button6: 6,
    button7: 7,
    button8: 8,
    button9: 9,
    buttonDel: 10,
    buttonOK: 11,

    //Define for button Numbers
    buttonNumberWidth: 150,
    buttonNumberHeight: 150,
    buttonNumberBottom: 250,
    buttonNumberSpace: 50,
}

function setKeyCodeLayout3() {
    //Only handle for Action button, dpad will handle itself
    actionArea[dataLO3.button0].keyCode = 0;
    actionArea[dataLO3.button1].keyCode = 1;
    actionArea[dataLO3.button2].keyCode = 2;
    actionArea[dataLO3.button3].keyCode = 3;
    actionArea[dataLO3.button4].keyCode = 4;
    actionArea[dataLO3.button5].keyCode = 5;
    actionArea[dataLO3.button6].keyCode = 6;
    actionArea[dataLO3.button7].keyCode = 7;
    actionArea[dataLO3.button8].keyCode = 8;
    actionArea[dataLO3.button9].keyCode = 9;
    actionArea[dataLO3.buttonDel].keyCode = 10;
    actionArea[dataLO3.buttonOK].keyCode = 11;
}

function loadImages_03()
{
    imgButtonNumber = new Image();
    imgButtonNumber.src = "images/WVG_Button_Number.png";
}

function loadLayout03() {
    writeLog("==== loadLayer03");
    actionArea = [];
    if(!isPortraitMode()) {
        // console.log("DDDFDFDFD");
        for(var i = dataLO3.button0; i <= dataLO3.buttonOK; i++)
        {
            actionArea[i] = {};
            actionArea[i].isRotate = false;
            actionArea[i].w = dataLO3.buttonNumberWidth * screenRatio;
            actionArea[i].h = dataLO3.buttonNumberHeight * screenRatio;
            actionArea[i].active = false;
            actionArea[i].image = imgButtonNumber;
            actionArea[i].imagePress = imgButtonNumber;
        }
        actionArea[dataLO3.button8].x = canvasW / 2 - dataLO3.buttonNumberWidth / 2 * screenRatio;
        actionArea[dataLO3.button8].y = canvasH - dataLO3.buttonNumberBottom * screenRatio - actionArea[dataLO3.button8].h;
        actionArea[dataLO3.button6].y = actionArea[dataLO3.button7].y = actionArea[dataLO3.button9].y = actionArea[dataLO3.button0].y = actionArea[dataLO3.button8].y;
        actionArea[dataLO3.button3].x = actionArea[dataLO3.button8].x;
        actionArea[dataLO3.button3].y = actionArea[dataLO3.button8].y - actionArea[dataLO3.button8].h - dataLO3.buttonNumberSpace * screenRatio;
        actionArea[dataLO3.button1].y = actionArea[dataLO3.button2].y = actionArea[dataLO3.button4].y = actionArea[dataLO3.button5].y = actionArea[dataLO3.button3].y;
        actionArea[dataLO3.button7].x = actionArea[dataLO3.button8].x - actionArea[dataLO3.button7].w - dataLO3.buttonNumberSpace * screenRatio;
        actionArea[dataLO3.button2].x = actionArea[dataLO3.button7].x;
        actionArea[dataLO3.button6].x = actionArea[dataLO3.button7].x - actionArea[dataLO3.button6].w - dataLO3.buttonNumberSpace * screenRatio;
        actionArea[dataLO3.button1].x = actionArea[dataLO3.button6].x;
        actionArea[dataLO3.button9].x = actionArea[dataLO3.button8].x + actionArea[dataLO3.button9].w + dataLO3.buttonNumberSpace * screenRatio;
        actionArea[dataLO3.buttonOK].x = actionArea[dataLO3.button4].x = actionArea[dataLO3.button9].x;
        actionArea[dataLO3.button0].x = actionArea[dataLO3.button9].x + actionArea[dataLO3.button0].w + dataLO3.buttonNumberSpace * screenRatio;
        actionArea[dataLO3.buttonDel].x = actionArea[dataLO3.button5].x = actionArea[dataLO3.button0].x;
        actionArea[dataLO3.buttonDel].y = actionArea[dataLO3.buttonOK].y = actionArea[dataLO3.button0].y + actionArea[dataLO3.button0].h + dataLO3.buttonNumberSpace * screenRatio;
    } else {
        // actionArea[dataLO2.buttonPause] = {};
        // actionArea[dataLO2.buttonPause].isRotate = true;
        // actionArea[dataLO2.buttonPause].w = dataLO2.buttonPauseHeight * screenRatio;
        // actionArea[dataLO2.buttonPause].h = dataLO2.buttonPauseWidth * screenRatio;
        // actionArea[dataLO2.buttonPause].x = canvasW - (actionArea[dataLO2.buttonPause].w + dataLO2.buttonPauseAlignTop * screenRatio);
        // actionArea[dataLO2.buttonPause].y = dataLO2.buttonPauseAlignLeft * screenRatio;
        // actionArea[dataLO2.buttonPause].active = false;
        // actionArea[dataLO2.buttonPause].image = imgPause;
        // actionArea[dataLO2.buttonPause].imagePress = imgPauseP;
    }

    for(var ii = dataLO3.button0; ii <= dataLO3.buttonOK; ii++)
    {
        actionArea[ii].isCircle = true;
        actionArea[ii].cx = actionArea[ii].x + actionArea[ii].w / 2;
        actionArea[ii].cy = actionArea[ii].y + actionArea[ii].h / 2;
        actionArea[ii].r = actionArea[ii].w / 2;
        actionArea[ii].extendTouch = 1.0;
        actionArea[ii].touchEnable = true;
    }
    
    if(testUILayout) {
        loadDataTest(appLayout.layout3);
    }
}

function drawLayout03()
{
    writeLog("drawLayout03");
    //Draw background
    if(!isPortraitMode()) {
        drawImageRotate(ctx, imgMenuBG, false, 0, 0, canvasW, canvasH);
    } else {
        drawImageRotate(ctx, imgMenuBG, true, 0, 0, canvasW, canvasH);
    }
    // ctx.fillStyle = "#080D11";
    // ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = "#FFFFFF";
    // ctx.font = "60px Arial";
    let size_font = 60 * screenRatio;
    ctx.font = "" + size_font + "px Arial";
    ctx.textAlign = "center";

    for(var i = dataLO3.button0; i <= dataLO3.button9; i++)
    {
        drawActionButton(ctx, actionArea[i]);
        ctx.fillText("" + i, actionArea[i].x + actionArea[i].w / 2, actionArea[i].y + actionArea[i].h/2 + size_font / 2);
    }

    drawActionButton(ctx, actionArea[dataLO3.buttonOK]);
    ctx.fillText("OK", actionArea[dataLO3.buttonOK].x + actionArea[dataLO3.buttonOK].w / 2, actionArea[dataLO3.buttonOK].y + actionArea[dataLO3.buttonOK].h/2 + size_font / 2);
    drawActionButton(ctx, actionArea[dataLO3.buttonDel]);
    ctx.fillText("<=", actionArea[dataLO3.buttonDel].x + actionArea[dataLO3.buttonDel].w / 2, actionArea[dataLO3.buttonDel].y + actionArea[dataLO3.buttonDel].h/2 + size_font / 2);

    ctx.fillText("" + inputNumber, actionArea[dataLO3.button3].x + actionArea[dataLO3.button3].w / 2, actionArea[dataLO3.button3].y - actionArea[dataLO3.button3].h);

    if(testUILayout) {
        drawActionButtonTest(appLayout.layout3);
    }

    if(wsConnected == true && (wsConnectWithoutWebRTC == true || wsConnectedWebRTC == true))
    {
        switchLayout(appLayout.layout1, false);
    }
}

function layout03Action(keyCode)
{
    writeLog("keycode: " + keyCode);
    switch(keyCode)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9: //it's 0-9 button
            inputNumber = inputNumber * 10 + keyCode;
            break;
        case 10: //it's Backspace button
            inputNumber = Math.floor(inputNumber / 10);
            break;
        case 11: //it's OK button
            //switchLayout(appLayout.layout1);
            sendRandomCode("" + inputNumber);
            break;
    }
}