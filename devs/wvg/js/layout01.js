//Position x,y and size w,h follow with screen 1920x1080, so it will be auto scale to other screen with screenRatio
const dataLO1 = {
    //index in actionArea
    buttonA: 0,
    buttonB: 1,
    buttonPanel: 2,
    buttonCharacter: 3,
    buttonL1: 4,
    buttonR1: 5,
    buttonL2: 6,
    buttonR2: 7,

    //Define for button A/B
    buttonWidth: 320,
    buttonHeight: 320,
    borderRight: 140,
    borderBottom: 120,

    //Define for button Home/Setting
    buttonPanelWidth: 199,
    buttonPanelHeight: 199,
    buttonPanelAlignLeft: 75,
    buttonPanelAlignTop: 46,

    //Define for button Character/ Arrow Left Right/ Rotate
    buttonCharacterWidth: 118,
    buttonCharacterHeight: 199,
    buttonCharacterAlignRight: 538,
    buttonCharacterAlignTop: 38,
    buttonL1R1Width: 68,
    buttonL1R1Height: 91,
    buttonL1R1AlignLeft: 70,
    buttonL1R1AlignTop: 70,
    buttonL2R2Width: 108,
    buttonL2R2Height: 51,
    buttonL2R2AlignLeft: 6,
}

const dataDpadLayout01 = {
    //DpadBG
    dpadBGWidth: 511,
    dpadBGHeight: 513,
    dpadBGAlignLeft: 210, //Can use this value to adjust x
    dpadBGAlignBottom: 145, //Can use this value to adjust y
    //Dpad Up
    dpadUpWidth: 92,
    dpadUpHeight: 69,
    //Dpad Down
    dpadDownWidth: 92,
    dpadDownHeight: 69,
    //Dpad Left
    dpadLeftWidth: 69,
    dpadLeftHeight: 92,
    //Dpad Right
    dpadRightWidth: 68,
    dpadRightHeight: 92,
    //Dpad General
    dpadUpDownAlignWithBGLeft: 204,
    dpadUpDownAlignWithBGTop: 56,
    dpadLeftRightAlignWithBGLeft: 56,
    dpadLeftRightAlignWithBGTop: 210,
}

function setKeyCodeLayout1() {
    //Only handle for Action button, dpad will handle itself
    actionArea[dataLO1.buttonA].keyCode = KEYCODE_BUTTON_A;
    actionArea[dataLO1.buttonB].keyCode = KEYCODE_BUTTON_B;
    actionArea[dataLO1.buttonPanel].keyCode = KEYCODE_BUTTON_START;
    actionArea[dataLO1.buttonL1].keyCode = KEYCODE_BUTTON_L1;
    actionArea[dataLO1.buttonR1].keyCode = KEYCODE_BUTTON_R1;
    actionArea[dataLO1.buttonL2].keyCode = KEYCODE_BUTTON_L2;
    actionArea[dataLO1.buttonR2].keyCode = KEYCODE_BUTTON_R2;
}

function loadLayout01() {
    actionArea = [];
    if(!isPortraitMode()) {
        actionArea[dataLO1.buttonB] = {};
        actionArea[dataLO1.buttonB].isRotate = false;
        actionArea[dataLO1.buttonB].w = dataLO1.buttonWidth * screenRatio;
        actionArea[dataLO1.buttonB].h = dataLO1.buttonHeight * screenRatio;
        actionArea[dataLO1.buttonB].x = canvasW - actionArea[dataLO1.buttonB].w - dataLO1.borderRight * screenRatio;
        actionArea[dataLO1.buttonB].active = false;
        actionArea[dataLO1.buttonB].image = imgActionB;
        actionArea[dataLO1.buttonB].imagePress = imgActionBP;

        actionArea[dataLO1.buttonA] = {};
        actionArea[dataLO1.buttonA].isRotate = false;
        actionArea[dataLO1.buttonA].w = dataLO1.buttonWidth * screenRatio;
        actionArea[dataLO1.buttonA].h = dataLO1.buttonHeight * screenRatio;
        actionArea[dataLO1.buttonA].x = actionArea[dataLO1.buttonB].x - actionArea[dataLO1.buttonA].w;
        actionArea[dataLO1.buttonA].y = canvasH - actionArea[dataLO1.buttonA].h - dataLO1.borderBottom * screenRatio;
        actionArea[dataLO1.buttonA].active = false;
        actionArea[dataLO1.buttonA].image = imgActionA;
        actionArea[dataLO1.buttonA].imagePress = imgActionAP;
        actionArea[dataLO1.buttonB].y = actionArea[dataLO1.buttonA].y - actionArea[dataLO1.buttonA].h * 2/3;
    } else {
        actionArea[dataLO1.buttonB] = {};
        actionArea[dataLO1.buttonB].isRotate = true;
        actionArea[dataLO1.buttonB].w = dataLO1.buttonHeight * screenRatio;
        actionArea[dataLO1.buttonB].h = dataLO1.buttonWidth * screenRatio;
        actionArea[dataLO1.buttonB].y = canvasH - actionArea[dataLO1.buttonB].h - dataLO1.borderRight * screenRatio;
        actionArea[dataLO1.buttonB].active = false;
        actionArea[dataLO1.buttonB].image = imgActionB;
        actionArea[dataLO1.buttonB].imagePress = imgActionBP;

        actionArea[dataLO1.buttonA] = {};
        actionArea[dataLO1.buttonA].isRotate = true;
        actionArea[dataLO1.buttonA].w = dataLO1.buttonHeight * screenRatio;
        actionArea[dataLO1.buttonA].h = dataLO1.buttonWidth * screenRatio;
        actionArea[dataLO1.buttonA].x = dataLO1.borderBottom * screenRatio;
        actionArea[dataLO1.buttonA].y = actionArea[dataLO1.buttonB].y - actionArea[dataLO1.buttonA].h;
        actionArea[dataLO1.buttonA].active = false;
        actionArea[dataLO1.buttonA].image = imgActionA;
        actionArea[dataLO1.buttonA].imagePress = imgActionAP;
        actionArea[dataLO1.buttonB].x = actionArea[dataLO1.buttonA].x + actionArea[dataLO1.buttonA].w * 2/3;
    }
    actionArea[dataLO1.buttonB].touchEnable = true;
    actionArea[dataLO1.buttonA].touchEnable = true;
    //Calculator circle
    actionArea[dataLO1.buttonB].isCircle = true;
    actionArea[dataLO1.buttonB].cx = actionArea[dataLO1.buttonB].x + actionArea[dataLO1.buttonB].w / 2;
    actionArea[dataLO1.buttonB].cy = actionArea[dataLO1.buttonB].y + actionArea[dataLO1.buttonB].h / 2;
    actionArea[dataLO1.buttonB].r = actionArea[dataLO1.buttonB].w / 2;
    actionArea[dataLO1.buttonA].isCircle = true;
    actionArea[dataLO1.buttonA].cx = actionArea[dataLO1.buttonA].x + actionArea[dataLO1.buttonA].w / 2;
    actionArea[dataLO1.buttonA].cy = actionArea[dataLO1.buttonA].y + actionArea[dataLO1.buttonA].h / 2;
    actionArea[dataLO1.buttonA].r = actionArea[dataLO1.buttonA].w / 2;
    //Extend touch zone
    actionArea[dataLO1.buttonB].extendTouch = 1.28;
    actionArea[dataLO1.buttonA].extendTouch = 1.28;

    //Button Home/Setting
    if(!isPortraitMode()) {
        actionArea[dataLO1.buttonPanel] = {};
        actionArea[dataLO1.buttonPanel].isRotate = false;
        actionArea[dataLO1.buttonPanel].w = dataLO1.buttonPanelWidth * screenRatio;
        actionArea[dataLO1.buttonPanel].h = dataLO1.buttonPanelHeight * screenRatio;
        actionArea[dataLO1.buttonPanel].x = dataLO1.buttonPanelAlignLeft * screenRatio;
        actionArea[dataLO1.buttonPanel].y = dataLO1.buttonPanelAlignTop * screenRatio;
        actionArea[dataLO1.buttonPanel].active = false;
        actionArea[dataLO1.buttonPanel].image = imgPanel;
        actionArea[dataLO1.buttonPanel].imagePress = imgPanelP;

    } else {
        actionArea[dataLO1.buttonPanel] = {};
        actionArea[dataLO1.buttonPanel].isRotate = true;
        actionArea[dataLO1.buttonPanel].w = dataLO1.buttonPanelHeight * screenRatio;
        actionArea[dataLO1.buttonPanel].h = dataLO1.buttonPanelWidth * screenRatio;
        actionArea[dataLO1.buttonPanel].x = canvasW - actionArea[dataLO1.buttonPanel].w - dataLO1.buttonPanelAlignTop * screenRatio;
        actionArea[dataLO1.buttonPanel].y = dataLO1.buttonPanelAlignLeft * screenRatio;
        actionArea[dataLO1.buttonPanel].active = false;
        actionArea[dataLO1.buttonPanel].image = imgPanel;
        actionArea[dataLO1.buttonPanel].imagePress = imgPanelP;

    }
    actionArea[dataLO1.buttonPanel].touchEnable = true;
    actionArea[dataLO1.buttonPanel].extendTouch = 1.28;

    //Button Character / Arrow Left Right / Rotate
    if(!isPortraitMode()) {
        //Character
        actionArea[dataLO1.buttonCharacter] = {};
        actionArea[dataLO1.buttonCharacter].isRotate = false;
        actionArea[dataLO1.buttonCharacter].w = dataLO1.buttonCharacterWidth * screenRatio;
        actionArea[dataLO1.buttonCharacter].h = dataLO1.buttonCharacterHeight * screenRatio;
        actionArea[dataLO1.buttonCharacter].x = canvasW - (actionArea[dataLO1.buttonCharacter].w + dataLO1.buttonCharacterAlignRight * screenRatio);
        actionArea[dataLO1.buttonCharacter].y = dataLO1.buttonCharacterAlignTop * screenRatio;
        actionArea[dataLO1.buttonCharacter].active = false;
        actionArea[dataLO1.buttonCharacter].image = imgCharacter;
        actionArea[dataLO1.buttonCharacter].imagePress = imgCharacter;

        //Arrow Left/Right -> L1/R1
        //L1
        actionArea[dataLO1.buttonL1] = {};
        actionArea[dataLO1.buttonL1].isRotate = false;
        actionArea[dataLO1.buttonL1].w = dataLO1.buttonL1R1Width * screenRatio;
        actionArea[dataLO1.buttonL1].h = dataLO1.buttonL1R1Height * screenRatio;
        actionArea[dataLO1.buttonL1].x = actionArea[dataLO1.buttonCharacter].x - (actionArea[dataLO1.buttonL1].w + dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonL1].y = actionArea[dataLO1.buttonCharacter].y + dataLO1.buttonL1R1AlignTop * screenRatio;
        actionArea[dataLO1.buttonL1].active = false;
        actionArea[dataLO1.buttonL1].image = imgL1;
        actionArea[dataLO1.buttonL1].imagePress = imgL1P;
        //R1
        actionArea[dataLO1.buttonR1] = {};
        actionArea[dataLO1.buttonR1].isRotate = false;
        actionArea[dataLO1.buttonR1].w = dataLO1.buttonL1R1Width * screenRatio;
        actionArea[dataLO1.buttonR1].h = dataLO1.buttonL1R1Height * screenRatio;
        actionArea[dataLO1.buttonR1].x = actionArea[dataLO1.buttonCharacter].x + (actionArea[dataLO1.buttonCharacter].w + dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonR1].y = actionArea[dataLO1.buttonCharacter].y + dataLO1.buttonL1R1AlignTop * screenRatio;
        actionArea[dataLO1.buttonR1].active = false;
        actionArea[dataLO1.buttonR1].image = imgR1;
        actionArea[dataLO1.buttonR1].imagePress = imgR1P;
        //L2
        actionArea[dataLO1.buttonL2] = {};
        actionArea[dataLO1.buttonL2].isRotate = false;
        actionArea[dataLO1.buttonL2].w = dataLO1.buttonL2R2Width * screenRatio;
        actionArea[dataLO1.buttonL2].h = dataLO1.buttonL2R2Height * screenRatio;
        actionArea[dataLO1.buttonL2].x = actionArea[dataLO1.buttonCharacter].x + actionArea[dataLO1.buttonCharacter].w / 2 - (actionArea[dataLO1.buttonL2].w + dataLO1.buttonL2R2AlignLeft * screenRatio);
        actionArea[dataLO1.buttonL2].y = actionArea[dataLO1.buttonCharacter].y + actionArea[dataLO1.buttonCharacter].h;
        actionArea[dataLO1.buttonL2].active = false;
        actionArea[dataLO1.buttonL2].image = imgL2;
        actionArea[dataLO1.buttonL2].imagePress = imgL2P;
        //R2
        actionArea[dataLO1.buttonR2] = {};
        actionArea[dataLO1.buttonR2].isRotate = false;
        actionArea[dataLO1.buttonR2].w = dataLO1.buttonL2R2Width * screenRatio;
        actionArea[dataLO1.buttonR2].h = dataLO1.buttonL2R2Height * screenRatio;
        actionArea[dataLO1.buttonR2].x = actionArea[dataLO1.buttonCharacter].x + actionArea[dataLO1.buttonCharacter].w / 2 + dataLO1.buttonL2R2AlignLeft * screenRatio;
        actionArea[dataLO1.buttonR2].y = actionArea[dataLO1.buttonCharacter].y + actionArea[dataLO1.buttonCharacter].h;
        actionArea[dataLO1.buttonR2].active = false;
        actionArea[dataLO1.buttonR2].image = imgR2;
        actionArea[dataLO1.buttonR2].imagePress = imgR2P;
    } else {
        //Character
        actionArea[dataLO1.buttonCharacter] = {};
        actionArea[dataLO1.buttonCharacter].isRotate = true;
        actionArea[dataLO1.buttonCharacter].w = dataLO1.buttonCharacterHeight * screenRatio;
        actionArea[dataLO1.buttonCharacter].h = dataLO1.buttonCharacterWidth * screenRatio;
        actionArea[dataLO1.buttonCharacter].x = canvasW - (actionArea[dataLO1.buttonCharacter].w + dataLO1.buttonCharacterAlignTop * screenRatio);
        actionArea[dataLO1.buttonCharacter].y = canvasH - (actionArea[dataLO1.buttonCharacter].w + dataLO1.buttonCharacterAlignRight * screenRatio);
        actionArea[dataLO1.buttonCharacter].active = false;
        actionArea[dataLO1.buttonCharacter].image = imgCharacter;
        actionArea[dataLO1.buttonCharacter].imagePress = imgCharacter;

        //Arrow Left/Right -> L1/R1
        //L1
        actionArea[dataLO1.buttonL1] = {};
        actionArea[dataLO1.buttonL1].isRotate = true;
        actionArea[dataLO1.buttonL1].w = dataLO1.buttonL1R1Height * screenRatio;
        actionArea[dataLO1.buttonL1].h = dataLO1.buttonL1R1Width * screenRatio;
        actionArea[dataLO1.buttonL1].x = actionArea[dataLO1.buttonCharacter].x + (actionArea[dataLO1.buttonCharacter].w - actionArea[dataLO1.buttonL1].w - dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonL1].y = actionArea[dataLO1.buttonCharacter].y - (actionArea[dataLO1.buttonL1].h + dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonL1].active = false;
        actionArea[dataLO1.buttonL1].image = imgL1;
        actionArea[dataLO1.buttonL1].imagePress = imgL1P;
        //R1
        actionArea[dataLO1.buttonR1] = {};
        actionArea[dataLO1.buttonR1].isRotate = true;
        actionArea[dataLO1.buttonR1].w = dataLO1.buttonL1R1Height * screenRatio;
        actionArea[dataLO1.buttonR1].h = dataLO1.buttonL1R1Width * screenRatio;
        actionArea[dataLO1.buttonR1].x = actionArea[dataLO1.buttonCharacter].x + (actionArea[dataLO1.buttonCharacter].w - actionArea[dataLO1.buttonL1].w - dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonR1].y = actionArea[dataLO1.buttonCharacter].y + (actionArea[dataLO1.buttonCharacter].h + dataLO1.buttonL1R1AlignLeft * screenRatio);
        actionArea[dataLO1.buttonR1].active = false;
        actionArea[dataLO1.buttonR1].image = imgR1;
        actionArea[dataLO1.buttonR1].imagePress = imgR1P;
        //L2
        actionArea[dataLO1.buttonL2] = {};
        actionArea[dataLO1.buttonL2].isRotate = true;
        actionArea[dataLO1.buttonL2].w = dataLO1.buttonL2R2Height * screenRatio;
        actionArea[dataLO1.buttonL2].h = dataLO1.buttonL2R2Width * screenRatio;
        actionArea[dataLO1.buttonL2].x = actionArea[dataLO1.buttonCharacter].x - actionArea[dataLO1.buttonL2].w;
        actionArea[dataLO1.buttonL2].y = actionArea[dataLO1.buttonCharacter].y + actionArea[dataLO1.buttonCharacter].h / 2 - (actionArea[dataLO1.buttonL2].h + dataLO1.buttonL2R2AlignLeft * screenRatio);
        actionArea[dataLO1.buttonL2].active = false;
        actionArea[dataLO1.buttonL2].image = imgL2;
        actionArea[dataLO1.buttonL2].imagePress = imgL2P;
        //R2
        actionArea[dataLO1.buttonR2] = {};
        actionArea[dataLO1.buttonR2].isRotate = true;
        actionArea[dataLO1.buttonR2].w = dataLO1.buttonL2R2Height * screenRatio;
        actionArea[dataLO1.buttonR2].h = dataLO1.buttonL2R2Width * screenRatio;
        actionArea[dataLO1.buttonR2].x = actionArea[dataLO1.buttonCharacter].x - actionArea[dataLO1.buttonR2].w;
        actionArea[dataLO1.buttonR2].y = actionArea[dataLO1.buttonCharacter].y + actionArea[dataLO1.buttonCharacter].h / 2 + dataLO1.buttonL2R2AlignLeft * screenRatio;
        actionArea[dataLO1.buttonR2].active = false;
        actionArea[dataLO1.buttonR2].image = imgR2;
        actionArea[dataLO1.buttonR2].imagePress = imgR2P;
    }
    actionArea[dataLO1.buttonCharacter].touchEnable = false;
    actionArea[dataLO1.buttonL1].touchEnable = true;
    actionArea[dataLO1.buttonR1].touchEnable = true;
    actionArea[dataLO1.buttonL2].touchEnable = true;
    actionArea[dataLO1.buttonR2].touchEnable = true;
    //Extend touch zone
    actionArea[dataLO1.buttonL1].extendTouch = 1.28;
    actionArea[dataLO1.buttonR1].extendTouch = 1.28;
    actionArea[dataLO1.buttonL2].extendTouch = 1.06;
    actionArea[dataLO1.buttonR2].extendTouch = 1.06;

    if(testUILayout)
    {
        loadDataTest(appLayout.layout1);
    }
}

function drawLayout01()
{
    //Draw background
    if(!isPortraitMode()) {
        drawImageRotate(ctx, imgMenuBG, false, 0, 0, canvasW, canvasH);
    } else {
        drawImageRotate(ctx, imgMenuBG, true, 0, 0, canvasW, canvasH);
    }
    
    //draw Button A/B
    drawActionButton(ctx, actionArea[dataLO1.buttonA]);
    drawActionButton(ctx, actionArea[dataLO1.buttonB]);

    //draw Button Home/Setting
    //Button Panel
    drawActionButton(ctx, actionArea[dataLO1.buttonPanel]);

    //Draw Character / Arrow left right / Rotate
    //Character
    drawActionButton(ctx, actionArea[dataLO1.buttonCharacter]);
    //Arrow Left - L1
    drawActionButton(ctx, actionArea[dataLO1.buttonL1]);
    //Arrow Left - R1
    drawActionButton(ctx, actionArea[dataLO1.buttonR1]);
    //Arrow Left - L2
    drawActionButton(ctx, actionArea[dataLO1.buttonL2]);
    //Arrow Left - R2
    drawActionButton(ctx, actionArea[dataLO1.buttonR2]);

    //Draw Dpad
    drawDpad();

    if(testUILayout)
    {
        //Draw ButtonLayout2-7...
        drawActionButtonTest(appLayout.layout1);
    }
}