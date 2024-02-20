//Position x,y and size w,h follow with screen 1920x1080, so it will be auto scale to other screen with screenRatio
const dataLO2 = {
    //index in actionArea
    buttonPause: 0,
    buttonNote1: 1,
    buttonNote2: 2,
    buttonNote3: 3,
    buttonNote4: 4,
    buttonNote5: 5,
    buttonNote6: 6,
    lineL: 7,
    lineR: 8,

    //Define for button Pause
    buttonPauseWidth: 118,
    buttonPauseHeight: 115,
    buttonPauseAlignLeft: 90,
    buttonPauseAlignTop: 54,

    //Define for button Notes
    buttonNoteWidth: 288,
    buttonNoteHeight: 288,
    buttonNoteAlignLeft01: 40,
    buttonNoteAlignLeft02: 0,
    buttonNoteAlignLeft03: -6,
    buttonNoteAlignBottom01: 80,
    buttonNoteAlignBottom02: -148,
    buttonNoteAlignBottom03: -154,

    //Define for Line L/R
    lineLRWidth: 771,
    lineLRHeight: 1039,
    lineLRAlignLeft: 39,
}

function setKeyCodeLayout2() {
    //Only handle for Action button, dpad will handle itself
    actionArea[dataLO2.buttonPause].keyCode = KEYCODE_BUTTON_START;
    actionArea[dataLO2.buttonNote1].keyCode = KEYCODE_DPAD_LEFT;
    actionArea[dataLO2.buttonNote2].keyCode = KEYCODE_DPAD_DOWN;
    actionArea[dataLO2.buttonNote3].keyCode = KEYCODE_DPAD_RIGHT;
    actionArea[dataLO2.buttonNote4].keyCode = KEYCODE_BUTTON_X;
    actionArea[dataLO2.buttonNote5].keyCode = KEYCODE_BUTTON_A;
    actionArea[dataLO2.buttonNote6].keyCode = KEYCODE_BUTTON_B;
}

function loadImages_02()
{
    imgAPBG = new Image();
    imgAPBG.src = "images/WVG_AP_BG.png";
    imgPause = new Image();
    imgPause.src = "images/WVG_AP_Pause.png";
    imgPauseP = new Image();
    imgPauseP.src = "images/WVG_AP_Pause_Press.png";
    imgAPNote = new Image();
    imgAPNote.src = "images/WVG_ButtonCircle_None.png";
    imgAPNoteP = new Image();
    imgAPNoteP.src = "images/WVG_ButtonCircle_Status.png";
    imgLineL = new Image();
    imgLineL.src = "images/WVG_LineL.png";
    imgLineR = new Image();
    imgLineR.src = "images/WVG_LineR.png";
}

function loadLayout02() {
    actionArea = [];
    if(!isPortraitMode()) {
        actionArea[dataLO2.buttonPause] = {};
        actionArea[dataLO2.buttonPause].isRotate = false;
        actionArea[dataLO2.buttonPause].w = dataLO2.buttonPauseWidth * screenRatio;
        actionArea[dataLO2.buttonPause].h = dataLO2.buttonPauseHeight * screenRatio;
        actionArea[dataLO2.buttonPause].x = dataLO2.buttonPauseAlignLeft * screenRatio;
        actionArea[dataLO2.buttonPause].y = dataLO2.buttonPauseAlignTop * screenRatio;
        actionArea[dataLO2.buttonPause].active = false;
        actionArea[dataLO2.buttonPause].image = imgPause;
        actionArea[dataLO2.buttonPause].imagePress = imgPauseP;
    } else {
        actionArea[dataLO2.buttonPause] = {};
        actionArea[dataLO2.buttonPause].isRotate = true;
        actionArea[dataLO2.buttonPause].w = dataLO2.buttonPauseHeight * screenRatio;
        actionArea[dataLO2.buttonPause].h = dataLO2.buttonPauseWidth * screenRatio;
        actionArea[dataLO2.buttonPause].x = canvasW - (actionArea[dataLO2.buttonPause].w + dataLO2.buttonPauseAlignTop * screenRatio);
        actionArea[dataLO2.buttonPause].y = dataLO2.buttonPauseAlignLeft * screenRatio;
        actionArea[dataLO2.buttonPause].active = false;
        actionArea[dataLO2.buttonPause].image = imgPause;
        actionArea[dataLO2.buttonPause].imagePress = imgPauseP;
    }
    actionArea[dataLO2.buttonPause].touchEnable = true;

    //For Line Left and Right
    if(!isPortraitMode()) {
        //Line Left
        actionArea[dataLO2.lineL] = {};
        actionArea[dataLO2.lineL].isRotate = false;
        actionArea[dataLO2.lineL].w = dataLO2.lineLRWidth * screenRatio;
        actionArea[dataLO2.lineL].h = dataLO2.lineLRHeight * screenRatio;
        actionArea[dataLO2.lineL].x = dataLO2.lineLRAlignLeft * screenRatio;
        actionArea[dataLO2.lineL].y = canvasH - actionArea[dataLO2.lineL].h;
        actionArea[dataLO2.lineL].active = false;
        actionArea[dataLO2.lineL].image = imgLineL;
        actionArea[dataLO2.lineL].imagePress = imgLineL;
        //Line Right
        actionArea[dataLO2.lineR] = {};
        actionArea[dataLO2.lineR].isRotate = false;
        actionArea[dataLO2.lineR].w = dataLO2.lineLRWidth * screenRatio;
        actionArea[dataLO2.lineR].h = dataLO2.lineLRHeight * screenRatio;
        actionArea[dataLO2.lineR].x = canvasW - (actionArea[dataLO2.lineR].w + dataLO2.lineLRAlignLeft * screenRatio);
        actionArea[dataLO2.lineR].y = actionArea[dataLO2.lineL].y;
        actionArea[dataLO2.lineR].active = false;
        actionArea[dataLO2.lineR].image = imgLineR;
        actionArea[dataLO2.lineR].imagePress = imgLineR;
    } else {
        //Line Left
        actionArea[dataLO2.lineL] = {};
        actionArea[dataLO2.lineL].isRotate = true;
        actionArea[dataLO2.lineL].w = dataLO2.lineLRHeight * screenRatio;
        actionArea[dataLO2.lineL].h = dataLO2.lineLRWidth * screenRatio;
        actionArea[dataLO2.lineL].x = 0;
        actionArea[dataLO2.lineL].y = dataLO2.lineLRAlignLeft * screenRatio;
        actionArea[dataLO2.lineL].active = false;
        actionArea[dataLO2.lineL].image = imgLineL;
        actionArea[dataLO2.lineL].imagePress = imgLineL;
        //Line Right
        actionArea[dataLO2.lineR] = {};
        actionArea[dataLO2.lineR].isRotate = true;
        actionArea[dataLO2.lineR].w = dataLO2.lineLRHeight * screenRatio;
        actionArea[dataLO2.lineR].h = dataLO2.lineLRWidth * screenRatio;
        actionArea[dataLO2.lineR].x = 0;
        actionArea[dataLO2.lineR].y = canvasH - (actionArea[dataLO2.lineR].h + dataLO2.lineLRAlignLeft * screenRatio);
        actionArea[dataLO2.lineR].active = false;
        actionArea[dataLO2.lineR].image = imgLineR;
        actionArea[dataLO2.lineR].imagePress = imgLineR;
    }
    actionArea[dataLO2.lineL].touchEnable = false;
    actionArea[dataLO2.lineR].touchEnable = false;

    if(!isPortraitMode()) {
        //We have 6 notes, align left and right
        //Left notes: 3-2-1 -> align left
        //Note 1
        actionArea[dataLO2.buttonNote1] = {};
        actionArea[dataLO2.buttonNote1].isRotate = false;
        actionArea[dataLO2.buttonNote1].w = dataLO2.buttonNoteWidth * screenRatio;
        actionArea[dataLO2.buttonNote1].h = dataLO2.buttonNoteHeight * screenRatio;
        actionArea[dataLO2.buttonNote1].x = dataLO2.buttonNoteAlignLeft01 * screenRatio;
        actionArea[dataLO2.buttonNote1].active = false;
        actionArea[dataLO2.buttonNote1].image = imgAPNote;
        actionArea[dataLO2.buttonNote1].imagePress = imgAPNoteP;
        //Note 2
        actionArea[dataLO2.buttonNote2] = {};
        actionArea[dataLO2.buttonNote2].isRotate = false;
        actionArea[dataLO2.buttonNote2].w = actionArea[dataLO2.buttonNote1].w;
        actionArea[dataLO2.buttonNote2].h = actionArea[dataLO2.buttonNote1].h;
        actionArea[dataLO2.buttonNote2].x = actionArea[dataLO2.buttonNote1].x + (actionArea[dataLO2.buttonNote1].w + dataLO2.buttonNoteAlignLeft02 * screenRatio);
        actionArea[dataLO2.buttonNote2].active = false;
        actionArea[dataLO2.buttonNote2].image = imgAPNote;
        actionArea[dataLO2.buttonNote2].imagePress = imgAPNoteP;
        //Note 3
        actionArea[dataLO2.buttonNote3] = {};
        actionArea[dataLO2.buttonNote3].isRotate = false;
        actionArea[dataLO2.buttonNote3].w = actionArea[dataLO2.buttonNote2].w;
        actionArea[dataLO2.buttonNote3].h = actionArea[dataLO2.buttonNote2].h;
        actionArea[dataLO2.buttonNote3].x = actionArea[dataLO2.buttonNote2].x + (actionArea[dataLO2.buttonNote2].w + dataLO2.buttonNoteAlignLeft03 * screenRatio);
        actionArea[dataLO2.buttonNote3].active = false;
        actionArea[dataLO2.buttonNote3].image = imgAPNote;
        actionArea[dataLO2.buttonNote3].imagePress = imgAPNoteP;
        //Calculate y
        actionArea[dataLO2.buttonNote3].y = canvasH - (actionArea[dataLO2.buttonNote3].h + dataLO2.buttonNoteAlignBottom01 * screenRatio);
        actionArea[dataLO2.buttonNote2].y = actionArea[dataLO2.buttonNote3].y - (actionArea[dataLO2.buttonNote3].h + dataLO2.buttonNoteAlignBottom02 * screenRatio);
        actionArea[dataLO2.buttonNote1].y = actionArea[dataLO2.buttonNote2].y - (actionArea[dataLO2.buttonNote2].h + dataLO2.buttonNoteAlignBottom03 * screenRatio);

        //Right notes: 4-5-6 -> align right
        //Note 6
        actionArea[dataLO2.buttonNote6] = {};
        actionArea[dataLO2.buttonNote6].isRotate = false;
        actionArea[dataLO2.buttonNote6].w = actionArea[dataLO2.buttonNote3].w;
        actionArea[dataLO2.buttonNote6].h = actionArea[dataLO2.buttonNote3].h;
        actionArea[dataLO2.buttonNote6].x = canvasW - (actionArea[dataLO2.buttonNote6].w + dataLO2.buttonNoteAlignLeft01 * screenRatio);
        actionArea[dataLO2.buttonNote6].active = false;
        actionArea[dataLO2.buttonNote6].image = imgAPNote;
        actionArea[dataLO2.buttonNote6].imagePress = imgAPNoteP;
        //Note 5
        actionArea[dataLO2.buttonNote5] = {};
        actionArea[dataLO2.buttonNote5].isRotate = false;
        actionArea[dataLO2.buttonNote5].w = actionArea[dataLO2.buttonNote6].w;
        actionArea[dataLO2.buttonNote5].h = actionArea[dataLO2.buttonNote6].h;
        actionArea[dataLO2.buttonNote5].x = actionArea[dataLO2.buttonNote6].x - (actionArea[dataLO2.buttonNote5].w + dataLO2.buttonNoteAlignLeft02 * screenRatio);
        actionArea[dataLO2.buttonNote5].active = false;
        actionArea[dataLO2.buttonNote5].image = imgAPNote;
        actionArea[dataLO2.buttonNote5].imagePress = imgAPNoteP;
        //Note 4
        actionArea[dataLO2.buttonNote4] = {};
        actionArea[dataLO2.buttonNote4].isRotate = false;
        actionArea[dataLO2.buttonNote4].w = actionArea[dataLO2.buttonNote5].w;
        actionArea[dataLO2.buttonNote4].h = actionArea[dataLO2.buttonNote5].h;
        actionArea[dataLO2.buttonNote4].x = actionArea[dataLO2.buttonNote5].x - (actionArea[dataLO2.buttonNote5].w + dataLO2.buttonNoteAlignLeft03 * screenRatio);
        actionArea[dataLO2.buttonNote4].active = false;
        actionArea[dataLO2.buttonNote4].image = imgAPNote;
        actionArea[dataLO2.buttonNote4].imagePress = imgAPNoteP;
        //Calculate y
        actionArea[dataLO2.buttonNote4].y = actionArea[dataLO2.buttonNote3].y;
        actionArea[dataLO2.buttonNote5].y = actionArea[dataLO2.buttonNote2].y;
        actionArea[dataLO2.buttonNote6].y = actionArea[dataLO2.buttonNote1].y;
    } else {
        //We have 6 notes, align left and right
        //Left notes: 3-2-1 -> align left
        //Note 1
        actionArea[dataLO2.buttonNote1] = {};
        actionArea[dataLO2.buttonNote1].isRotate = true;
        actionArea[dataLO2.buttonNote1].w = dataLO2.buttonNoteHeight * screenRatio;
        actionArea[dataLO2.buttonNote1].h = dataLO2.buttonNoteWidth * screenRatio;
        actionArea[dataLO2.buttonNote1].y = dataLO2.buttonNoteAlignLeft01 * screenRatio;
        actionArea[dataLO2.buttonNote1].active = false;
        actionArea[dataLO2.buttonNote1].image = imgAPNote;
        actionArea[dataLO2.buttonNote1].imagePress = imgAPNoteP;
        //Note 2
        actionArea[dataLO2.buttonNote2] = {};
        actionArea[dataLO2.buttonNote2].isRotate = true;
        actionArea[dataLO2.buttonNote2].w = actionArea[dataLO2.buttonNote1].w;
        actionArea[dataLO2.buttonNote2].h = actionArea[dataLO2.buttonNote1].h;
        actionArea[dataLO2.buttonNote2].y = actionArea[dataLO2.buttonNote1].y + (actionArea[dataLO2.buttonNote1].h + dataLO2.buttonNoteAlignLeft02 * screenRatio);
        actionArea[dataLO2.buttonNote2].active = false;
        actionArea[dataLO2.buttonNote2].image = imgAPNote;
        actionArea[dataLO2.buttonNote2].imagePress = imgAPNoteP;
        //Note 3
        actionArea[dataLO2.buttonNote3] = {};
        actionArea[dataLO2.buttonNote3].isRotate = true;
        actionArea[dataLO2.buttonNote3].w = actionArea[dataLO2.buttonNote2].w;
        actionArea[dataLO2.buttonNote3].h = actionArea[dataLO2.buttonNote2].h;
        actionArea[dataLO2.buttonNote3].y = actionArea[dataLO2.buttonNote2].y + (actionArea[dataLO2.buttonNote2].h + dataLO2.buttonNoteAlignLeft03 * screenRatio);
        actionArea[dataLO2.buttonNote3].active = false;
        actionArea[dataLO2.buttonNote3].image = imgAPNote;
        actionArea[dataLO2.buttonNote3].imagePress = imgAPNoteP;
        //Calculate x
        actionArea[dataLO2.buttonNote3].x = dataLO2.buttonNoteAlignBottom01 * screenRatio;
        actionArea[dataLO2.buttonNote2].x = actionArea[dataLO2.buttonNote3].x + (actionArea[dataLO2.buttonNote3].w + dataLO2.buttonNoteAlignBottom02 * screenRatio);
        actionArea[dataLO2.buttonNote1].x = actionArea[dataLO2.buttonNote2].x + (actionArea[dataLO2.buttonNote2].w + dataLO2.buttonNoteAlignBottom03 * screenRatio);
        

        //Right notes: 4-5-6 -> align right
        //Note 6
        actionArea[dataLO2.buttonNote6] = {};
        actionArea[dataLO2.buttonNote6].isRotate = true;
        actionArea[dataLO2.buttonNote6].w = actionArea[dataLO2.buttonNote3].w;
        actionArea[dataLO2.buttonNote6].h = actionArea[dataLO2.buttonNote3].h;
        actionArea[dataLO2.buttonNote6].y = canvasH - (actionArea[dataLO2.buttonNote6].h + dataLO2.buttonNoteAlignLeft01 * screenRatio);
        actionArea[dataLO2.buttonNote6].active = false;
        actionArea[dataLO2.buttonNote6].image = imgAPNote;
        actionArea[dataLO2.buttonNote6].imagePress = imgAPNoteP;
        //Note 5
        actionArea[dataLO2.buttonNote5] = {};
        actionArea[dataLO2.buttonNote5].isRotate = true;
        actionArea[dataLO2.buttonNote5].w = actionArea[dataLO2.buttonNote6].w;
        actionArea[dataLO2.buttonNote5].h = actionArea[dataLO2.buttonNote6].h;
        actionArea[dataLO2.buttonNote5].y = actionArea[dataLO2.buttonNote6].y - (actionArea[dataLO2.buttonNote5].h + dataLO2.buttonNoteAlignLeft02 * screenRatio);
        actionArea[dataLO2.buttonNote5].active = false;
        actionArea[dataLO2.buttonNote5].image = imgAPNote;
        actionArea[dataLO2.buttonNote5].imagePress = imgAPNoteP;
        //Note 4
        actionArea[dataLO2.buttonNote4] = {};
        actionArea[dataLO2.buttonNote4].isRotate = true;
        actionArea[dataLO2.buttonNote4].w = actionArea[dataLO2.buttonNote5].w;
        actionArea[dataLO2.buttonNote4].h = actionArea[dataLO2.buttonNote5].h;
        actionArea[dataLO2.buttonNote4].y = actionArea[dataLO2.buttonNote5].y - (actionArea[dataLO2.buttonNote4].h + dataLO2.buttonNoteAlignLeft03 * screenRatio);
        actionArea[dataLO2.buttonNote4].active = false;
        actionArea[dataLO2.buttonNote4].image = imgAPNote;
        actionArea[dataLO2.buttonNote4].imagePress = imgAPNoteP;
        //Calculate x
        actionArea[dataLO2.buttonNote4].x = actionArea[dataLO2.buttonNote3].x;
        actionArea[dataLO2.buttonNote6].x = actionArea[dataLO2.buttonNote1].x;
        actionArea[dataLO2.buttonNote5].x = actionArea[dataLO2.buttonNote2].x;
    }
    actionArea[dataLO2.buttonNote1].touchEnable = true;
    actionArea[dataLO2.buttonNote2].touchEnable = true;
    actionArea[dataLO2.buttonNote3].touchEnable = true;
    actionArea[dataLO2.buttonNote4].touchEnable = true;
    actionArea[dataLO2.buttonNote5].touchEnable = true;
    actionArea[dataLO2.buttonNote6].touchEnable = true;
    for(var ii = dataLO2.buttonNote1; ii <= dataLO2.buttonNote6; ii++)
    {
        actionArea[ii].isCircle = true;
        actionArea[ii].cx = actionArea[ii].x + actionArea[ii].w / 2;
        actionArea[ii].cy = actionArea[ii].y + actionArea[ii].h / 2;
        actionArea[ii].r = actionArea[ii].w / 2;
        actionArea[ii].extendTouch = 1.0;
        //Extend touch with array touch
        addArrayTouch(actionArea[ii]);
    }
    
    if(testUILayout) {
        loadDataTest(appLayout.layout2);
    }
}

function addArrayTouch(infoButton) {
    infoButton.arrTouch = [];
    if(!isPortraitMode()) {
        //rect Touch up
        infoButton.arrTouch[0] = {};
        infoButton.arrTouch[0].w = infoButton.w * 2 / 3;
        infoButton.arrTouch[0].h = infoButton.h * 3 / 4;
        infoButton.arrTouch[0].x = infoButton.x + infoButton.w / 6;
        infoButton.arrTouch[0].y = infoButton.y - infoButton.h / 2;
        //rect Touch down
        infoButton.arrTouch[1] = {};
        infoButton.arrTouch[1].w = infoButton.w * 2 / 3;
        infoButton.arrTouch[1].h = infoButton.h * 3 / 4;
        infoButton.arrTouch[1].x = infoButton.arrTouch[0].x;
        infoButton.arrTouch[1].y = infoButton.y + infoButton.h * 3 / 4;
    } else {
        //rect Touch left
        infoButton.arrTouch[0] = {};
        infoButton.arrTouch[0].w = infoButton.w * 3 / 4;
        infoButton.arrTouch[0].h = infoButton.h * 2 / 3;
        infoButton.arrTouch[0].x = infoButton.x - infoButton.w / 2;
        infoButton.arrTouch[0].y = infoButton.y + infoButton.h / 6;
        //rect Touch right
        infoButton.arrTouch[1] = {};
        infoButton.arrTouch[1].w = infoButton.w * 3 / 4;
        infoButton.arrTouch[1].h = infoButton.h * 2 / 3;
        infoButton.arrTouch[1].x = infoButton.x + infoButton.w * 3 / 4;
        infoButton.arrTouch[1].y = infoButton.arrTouch[0].y;
    }
}

function drawLayout02()
{
    //Draw background
    if(!isPortraitMode()) {
        drawImageRotate(ctx, imgAPBG, false, 0, 0, canvasW, canvasH);
    } else {
        drawImageRotate(ctx, imgAPBG, true, 0, 0, canvasW, canvasH);
    }

    //Draw Line Left / Right
    drawActionButton(ctx, actionArea[dataLO2.lineL]);
    drawActionButton(ctx, actionArea[dataLO2.lineR]);
    
    //draw Button Pause
    drawActionButton(ctx, actionArea[dataLO2.buttonPause]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote1]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote2]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote3]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote4]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote5]);
    drawActionButton(ctx, actionArea[dataLO2.buttonNote6]);

    if(testUILayout) {
        drawActionButtonTest(appLayout.layout2);
    }
}
