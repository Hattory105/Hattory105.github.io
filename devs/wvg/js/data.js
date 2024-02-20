//----- Variables, Array... -----//
var imgIconFullScreen;
var imgIconTouchScreen;
var imgDpadBG, imgDpadBGP;
var imgDpadUp, imgDpadUpP;
var imgDpadDown, imgDpadDownP;
var imgDpadLeft, imgDpadLeftP;
var imgDpadRight, imgDpadRightP;

//----- Define for layout01 ---//
var imgMenuBG;
var imgActionA, imgActionAP;
var imgActionB, imgActionBP;

var imgPanel, imgPanelP;

var imgCharacter;
var imgL1, imgL1P;
var imgR1, imgR1P;
var imgL2, imgL2P;
var imgR2, imgR2P;

//----- Define for layout02 ---//
var imgAPBG;
var imgPause, imgPauseP;
var imgAPNote, imgAPNoteP;
var imgLineL, imgLineR;

//----- Define for layout03 ---//
var imgButtonNumber;

//----- Keycode constants -----//
const KEYCODE_DPAD_UP		= 19;
const KEYCODE_DPAD_DOWN		= 20;
const KEYCODE_DPAD_LEFT		= 21;
const KEYCODE_DPAD_RIGHT	= 22;

const KEYCODE_BUTTON_A		= 96;
const KEYCODE_BUTTON_B		= 97;
const KEYCODE_BUTTON_X		= 99;
const KEYCODE_BUTTON_Y		= 100;
const KEYCODE_BUTTON_L1		= 102;
const KEYCODE_BUTTON_R1		= 103;
const KEYCODE_BUTTON_L2		= 104;
const KEYCODE_BUTTON_R2		= 105;
const KEYCODE_BUTTON_START	= 108;
const KEYCODE_BUTTON_SELECT = 109;
const KEYCODE_BUTTON_MODE 	= 110;

function loadImages() {
    //console.log('loadImages');
    imgIconFullScreen = new Image();
    imgIconFullScreen.src = "images/WVG_IconFullscreen.png";

    imgIconTouchScreen = new Image();
    imgIconTouchScreen.src = "images/WVG_IconTouchScreen.png";

    //dpad button
    loadDpadImages();

    //----- Load for layout01 ---//
    //Background
    imgMenuBG = new Image();
    imgMenuBG.src = "images/WVG_Menu_BG.png";
    //A
    imgActionA = new Image();
    imgActionA.src = "images/WVG_Menu_A.png";
    imgActionAP = new Image();
    imgActionAP.src = "images/WVG_Menu_A_Press.png";
    //B
    imgActionB = new Image();
    imgActionB.src = "images/WVG_Menu_B.png";
    imgActionBP = new Image();
    imgActionBP.src = "images/WVG_Menu_B_Press.png";

    imgPanel = new Image();
    imgPanel.src = "images/WVG_Menu_Homepanel.png";
    imgPanelP = new Image();
    imgPanelP.src = "images/WVG_Menu_HomepanelP.png";

    imgCharacter = new Image();
    imgCharacter.src = "images/Character.png";
    //L1
    imgL1 = new Image();
    imgL1.src = "images/WVG_Menu_L1.png";
    imgL1P = new Image();
    imgL1P.src = "images/WVG_Menu_L1_Press.png";
    //R1
    imgR1 = new Image();
    imgR1.src = "images/WVG_Menu_R1.png";
    imgR1P = new Image();
    imgR1P.src = "images/WVG_Menu_R1_Press.png";
    //L2
    imgL2 = new Image();
    imgL2.src = "images/WVG_Menu_L2.png";
    imgL2P = new Image();
    imgL2P.src = "images/WVG_Menu_L2_Press.png";
    //R2
    imgR2 = new Image();
    imgR2.src = "images/WVG_Menu_R2.png";
    imgR2P = new Image();
    imgR2P.src = "images/WVG_Menu_R2_Press.png";

    //----- Load for layout02 ---//
    loadImages_02();

    //----- Load for layout03 ---//
    loadImages_03();
}

function loadDpadImages() {
    imgDpadBG = new Image();
    imgDpadBG.src = "images/WVG_Menu_Dpad.png";
    imgDpadBGP = new Image();
    imgDpadBGP.src = "images/WVG_Menu_Dpad_Press.png";
    //Dpad Up
    imgDpadUp = new Image();
    imgDpadUp.src = "images/WVG_Menu_DpadUp.png";
    imgDpadUpP = new Image();
    imgDpadUpP.src = "images/WVG_Menu_DpadUp_Press.png";
    //Dpad Down
    imgDpadDown = new Image();
    imgDpadDown.src = "images/WVG_Menu_DpadDown.png";
    imgDpadDownP = new Image();
    imgDpadDownP.src = "images/WVG_Menu_DpadDown_Press.png";
    //Dpad Left
    imgDpadLeft = new Image();
    imgDpadLeft.src = "images/WVG_Menu_DpadLeft.png";
    imgDpadLeftP = new Image();
    imgDpadLeftP.src = "images/WVG_Menu_DpadLeft_Press.png";
    //Dpad Right
    imgDpadRight = new Image();
    imgDpadRight.src = "images/WVG_Menu_DpadRight.png";
    imgDpadRightP = new Image();
    imgDpadRightP.src = "images/WVG_Menu_DpadRight_Press.png";
}

const dpadConst = {
    //Dpad
    dpadBG: 0, //dpad background
    dpadUp: 1,
    dpadDown: 2,
    dpadLeft: 3,
    dpadRight: 4,
    dpadNumber: 5,
}

var dpadArea = new Array;
var actionArea = new Array;

function loadLayout(layout)
{
    switch(layout)
    {
        case appLayout.layout0:
            loadLayout0();
            break;
        case appLayout.layout1:
            //Button
            loadLayout01();
            setKeyCodeLayout1();
            //Dpad
            loadDataDpad(dataDpadLayout01);
            break;

        case appLayout.layout2:
            //Button
            loadLayout02();
            setKeyCodeLayout2();
            break;
        case appLayout.layout3:
            //Button
            loadLayout03();
            setKeyCodeLayout3();
            break;
    }
}

//this function can use other layout, we need to use other dataDpad
function loadDataDpad(dataDpad)
{
    //Dpad Background
    dpadArea[dpadConst.dpadBG] = {};
    dpadArea[dpadConst.dpadBG].active = false;
    if(!isPortraitMode()) {
        writeLog("loadDataDpad - landscape");
        dpadArea[dpadConst.dpadBG].w = dataDpad.dpadBGWidth * screenRatio;
        dpadArea[dpadConst.dpadBG].h = dataDpad.dpadBGHeight * screenRatio;
        dpadArea[dpadConst.dpadBG].x = dataDpad.dpadBGAlignLeft * screenRatio;
        dpadArea[dpadConst.dpadBG].y = canvasH - dpadArea[dpadConst.dpadBG].h - dataDpad.dpadBGAlignBottom * screenRatio;
        dpadArea[dpadConst.dpadBG].r = Math.sqrt(Math.pow(dpadArea[dpadConst.dpadBG].w, 2) + Math.pow(dpadArea[dpadConst.dpadBG].w / 3, 2)) / 2; //Radius of circle
        dpadArea[dpadConst.dpadBG].cx = dpadArea[dpadConst.dpadBG].x + dpadArea[dpadConst.dpadBG].w / 2; //x of circle
        dpadArea[dpadConst.dpadBG].cy = dpadArea[dpadConst.dpadBG].y + dpadArea[dpadConst.dpadBG].h / 2; //y of circle
    } else {
        writeLog("loadDataDpad - portrait");
        dpadArea[dpadConst.dpadBG].w = dataDpad.dpadBGHeight * screenRatio;
        dpadArea[dpadConst.dpadBG].h = dataDpad.dpadBGWidth * screenRatio;
        dpadArea[dpadConst.dpadBG].x = dataDpad.dpadBGAlignBottom * screenRatio;
        dpadArea[dpadConst.dpadBG].y = dataDpad.dpadBGAlignLeft * screenRatio;
        dpadArea[dpadConst.dpadBG].r = Math.sqrt(Math.pow(dpadArea[dpadConst.dpadBG].w, 2) + Math.pow(dpadArea[dpadConst.dpadBG].w / 3, 2)) / 2; //Radius of circle
        dpadArea[dpadConst.dpadBG].cx = dpadArea[dpadConst.dpadBG].x + dpadArea[dpadConst.dpadBG].h / 2; //x of circle
        dpadArea[dpadConst.dpadBG].cy = dpadArea[dpadConst.dpadBG].y + dpadArea[dpadConst.dpadBG].w / 2; //y of circle
    }

    //Dpad Up
    dpadArea[dpadConst.dpadUp] = {};
    dpadArea[dpadConst.dpadUp].w = dataDpad.dpadUpWidth * screenRatio;
    dpadArea[dpadConst.dpadUp].h = dataDpad.dpadUpHeight * screenRatio;
    dpadArea[dpadConst.dpadUp].x = dpadArea[dpadConst.dpadBG].x + dataDpad.dpadUpDownAlignWithBGLeft * screenRatio;
    dpadArea[dpadConst.dpadUp].y = dpadArea[dpadConst.dpadBG].y + dataDpad.dpadUpDownAlignWithBGTop * screenRatio;
    //Dpad Down
    dpadArea[dpadConst.dpadDown] = {};
    dpadArea[dpadConst.dpadDown].w = dataDpad.dpadDownWidth * screenRatio;
    dpadArea[dpadConst.dpadDown].h = dataDpad.dpadDownHeight * screenRatio;
    dpadArea[dpadConst.dpadDown].x = dpadArea[dpadConst.dpadUp].x;
    dpadArea[dpadConst.dpadDown].y = dpadArea[dpadConst.dpadBG].y + dpadArea[dpadConst.dpadBG].h - (dataDpad.dpadDownHeight + dataDpad.dpadUpDownAlignWithBGTop) * screenRatio;
    //Dpad Left
    dpadArea[dpadConst.dpadLeft] = {};
    dpadArea[dpadConst.dpadLeft].w = dataDpad.dpadLeftWidth * screenRatio;
    dpadArea[dpadConst.dpadLeft].h = dataDpad.dpadLeftHeight * screenRatio;
    dpadArea[dpadConst.dpadLeft].x = dpadArea[dpadConst.dpadBG].x + dataDpad.dpadLeftRightAlignWithBGLeft * screenRatio;
    dpadArea[dpadConst.dpadLeft].y = dpadArea[dpadConst.dpadBG].y + dataDpad.dpadLeftRightAlignWithBGTop * screenRatio;
    //Dpad Right
    dpadArea[dpadConst.dpadRight] = {};
    dpadArea[dpadConst.dpadRight].w = dataDpad.dpadRightWidth * screenRatio;
    dpadArea[dpadConst.dpadRight].h = dataDpad.dpadRightHeight * screenRatio;
    dpadArea[dpadConst.dpadRight].x = dpadArea[dpadConst.dpadBG].x + dpadArea[dpadConst.dpadBG].w - (dataDpad.dpadRightWidth + dataDpad.dpadLeftRightAlignWithBGLeft) * screenRatio;
    dpadArea[dpadConst.dpadRight].y = dpadArea[dpadConst.dpadLeft].y;
}
