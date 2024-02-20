var showObjectTouch = !true;
var showArrTouch = !true;
var actionAreaTest = new Array;

const dataTest = {
    buttonBack: 0,
    buttonLayout2: 1,
    buttonLayoutNum: 2,
    buttonArrTouch1: 2,
    buttonArrTouch2: 3,

    //Define for button Back
    buttonBackWidth: 76,
    buttonBackHeight: 74,
    buttonBackAlignLeft: 60,
    buttonbackAlignTop: 46,

    //Define for button Layout2-5
    buttonLayoutWidth: 224,
    buttonLayoutHeight: 223,
    buttonLayoutAlignTop: 0,
}

function loadDataTest(layout)
{
    writeLog("loadDataTest: " + layout);
    actionAreaTest = [];
    switch(layout)
    {
        case appLayout.layout1:
            //ButtonLayout2-5
            writeLog("layout1: " + layout);
            if(!isPortraitMode()) {
                actionAreaTest[dataTest.buttonLayout2] = {};
                actionAreaTest[dataTest.buttonLayout2].isRotate = false;
                actionAreaTest[dataTest.buttonLayout2].w = dataTest.buttonLayoutWidth * screenRatio;
                actionAreaTest[dataTest.buttonLayout2].h = dataTest.buttonLayoutHeight * screenRatio;
                actionAreaTest[dataTest.buttonLayout2].x = actionArea[dataLO1.buttonPanel].x +  actionArea[dataLO1.buttonPanel].w + actionAreaTest[dataTest.buttonLayout2].w / 4;
                actionAreaTest[dataTest.buttonLayout2].y = dataTest.buttonLayoutAlignTop * screenRatio;
                actionAreaTest[dataTest.buttonLayout2].active = false;
                actionAreaTest[dataTest.buttonLayout2].image = imgAPNote;
                actionAreaTest[dataTest.buttonLayout2].imagePress = imgAPNoteP;
            } else {
                actionAreaTest[dataTest.buttonLayout2] = {};
                actionAreaTest[dataTest.buttonLayout2].isRotate = false;
                actionAreaTest[dataTest.buttonLayout2].w = dataTest.buttonLayoutHeight * screenRatio;
                actionAreaTest[dataTest.buttonLayout2].h = dataTest.buttonLayoutWidth * screenRatio;
                actionAreaTest[dataTest.buttonLayout2].x = canvasW - (actionAreaTest[dataTest.buttonLayout2].w + dataTest.buttonLayoutAlignTop * screenRatio);
                actionAreaTest[dataTest.buttonLayout2].y = actionArea[dataLO1.buttonPanel].y + actionArea[dataLO1.buttonPanel].h + actionAreaTest[dataTest.buttonLayout2].h / 4;
                actionAreaTest[dataTest.buttonLayout2].active = false;
                actionAreaTest[dataTest.buttonLayout2].image = imgAPNote;
                actionAreaTest[dataTest.buttonLayout2].imagePress = imgAPNoteP;
            }
            actionAreaTest[dataTest.buttonLayout2].touchEnable = true;
            break;
        
        case appLayout.layout2:
            if(!isPortraitMode()) {
                actionAreaTest[dataTest.buttonBack] = {};
                actionAreaTest[dataTest.buttonBack].isRotate = false;
                actionAreaTest[dataTest.buttonBack].w = dataTest.buttonBackWidth * screenRatio;
                actionAreaTest[dataTest.buttonBack].h = dataTest.buttonBackHeight * screenRatio;
                actionAreaTest[dataTest.buttonBack].x = canvasW - (actionAreaTest[dataTest.buttonBack].w + dataTest.buttonBackAlignLeft * screenRatio);
                actionAreaTest[dataTest.buttonBack].y = dataTest.buttonbackAlignTop * screenRatio;
                actionAreaTest[dataTest.buttonBack].active = false;
                actionAreaTest[dataTest.buttonBack].image = imgHome;
                actionAreaTest[dataTest.buttonBack].imagePress = imgHomeP;

                //Debug for Array Touch
                actionAreaTest[dataTest.buttonArrTouch1] = {};
                actionAreaTest[dataTest.buttonArrTouch1].isRotate = false;
                actionAreaTest[dataTest.buttonArrTouch1].w = dataTest.buttonLayoutWidth / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch1].h = dataTest.buttonLayoutHeight / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch1].x = dataTest.buttonBackAlignLeft * 2 * screenRatio + actionAreaTest[dataTest.buttonBack].w * 2;
                actionAreaTest[dataTest.buttonArrTouch1].y = dataTest.buttonbackAlignTop * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch1].active = false;
                actionAreaTest[dataTest.buttonArrTouch1].image = imgAPNote;
                actionAreaTest[dataTest.buttonArrTouch1].imagePress = imgAPNoteP;

                actionAreaTest[dataTest.buttonArrTouch2] = {};
                actionAreaTest[dataTest.buttonArrTouch2].isRotate = false;
                actionAreaTest[dataTest.buttonArrTouch2].w = dataTest.buttonLayoutWidth / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch2].h = dataTest.buttonLayoutHeight / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch2].x = actionAreaTest[dataTest.buttonArrTouch1].x + actionAreaTest[dataTest.buttonArrTouch1].w * 3 / 2;
                actionAreaTest[dataTest.buttonArrTouch2].y = actionAreaTest[dataTest.buttonArrTouch1].y;
                actionAreaTest[dataTest.buttonArrTouch2].active = false;
                actionAreaTest[dataTest.buttonArrTouch2].image = imgAPNote;
                actionAreaTest[dataTest.buttonArrTouch2].imagePress = imgAPNoteP;

            } else {
                actionAreaTest[dataTest.buttonBack] = {};
                actionAreaTest[dataTest.buttonBack].isRotate = true;
                actionAreaTest[dataTest.buttonBack].w = dataTest.buttonBackHeight * screenRatio;
                actionAreaTest[dataTest.buttonBack].h = dataTest.buttonBackWidth * screenRatio;
                actionAreaTest[dataTest.buttonBack].x = canvasW - (actionAreaTest[dataTest.buttonBack].w + dataTest.buttonbackAlignTop * screenRatio);
                actionAreaTest[dataTest.buttonBack].y = canvasH - (actionAreaTest[dataTest.buttonBack].h + dataTest.buttonBackAlignLeft * screenRatio);
                actionAreaTest[dataTest.buttonBack].active = false;
                actionAreaTest[dataTest.buttonBack].image = imgHome;
                actionAreaTest[dataTest.buttonBack].imagePress = imgHomeP;

                //Debug for Array Touch
                actionAreaTest[dataTest.buttonArrTouch1] = {};
                actionAreaTest[dataTest.buttonArrTouch1].isRotate = true;
                actionAreaTest[dataTest.buttonArrTouch1].w = dataTest.buttonLayoutHeight / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch1].h = dataTest.buttonLayoutWidth / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch1].x = canvasW - (actionAreaTest[dataTest.buttonArrTouch1].w + dataTest.buttonbackAlignTop * screenRatio);
                actionAreaTest[dataTest.buttonArrTouch1].y = dataTest.buttonBackAlignLeft * 2 * screenRatio + actionAreaTest[dataTest.buttonBack].h * 2;
                actionAreaTest[dataTest.buttonArrTouch1].active = false;
                actionAreaTest[dataTest.buttonArrTouch1].image = imgAPNote;
                actionAreaTest[dataTest.buttonArrTouch1].imagePress = imgAPNoteP;

                actionAreaTest[dataTest.buttonArrTouch2] = {};
                actionAreaTest[dataTest.buttonArrTouch2].isRotate = true;
                actionAreaTest[dataTest.buttonArrTouch2].w = dataTest.buttonLayoutHeight / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch2].h = dataTest.buttonLayoutWidth / 2 * screenRatio;
                actionAreaTest[dataTest.buttonArrTouch2].x = actionAreaTest[dataTest.buttonArrTouch1].x;
                actionAreaTest[dataTest.buttonArrTouch2].y = actionAreaTest[dataTest.buttonArrTouch1].y + actionAreaTest[dataTest.buttonArrTouch1].h * 3 / 2;
                actionAreaTest[dataTest.buttonArrTouch2].active = false;
                actionAreaTest[dataTest.buttonArrTouch2].image = imgAPNote;
                actionAreaTest[dataTest.buttonArrTouch2].imagePress = imgAPNoteP;
            }
            actionAreaTest[dataTest.buttonBack].touchEnable = true;
            actionAreaTest[dataTest.buttonArrTouch1].touchEnable = true;
            actionAreaTest[dataTest.buttonArrTouch2].touchEnable = true;
            break;
    }
}

function drawActionButtonTest(layout)
{
    switch(layout)
    {
        case appLayout.layout1:
            for(var i = dataTest.buttonLayout2; i < dataTest.buttonLayoutNum; i++) {
                writeLog("drawActionButtonTest i: " + i);
                drawActionButton(ctx, actionAreaTest[i]);
            }
            break;
        case appLayout.layout2:
            drawActionButton(ctx, actionAreaTest[dataTest.buttonBack]);
            for(var i = dataTest.buttonArrTouch1; i <= dataTest.buttonArrTouch2; i++) {
                writeLog("drawActionButtonTest i: " + i);
                drawActionButton(ctx, actionAreaTest[i]);
            }
            break;
    }
}

function handleStartTest(x, y, layout)
{
    switch(layout)
    {
        case appLayout.layout1:
            for (var j = dataTest.buttonLayout2; j < dataTest.buttonLayoutNum; j++) {
                if (actionAreaTest[j].touchEnable && !actionAreaTest[j].active && isInsideActionRect(x, y, actionAreaTest[j].x, actionAreaTest[j].y, actionAreaTest[j].w, actionAreaTest[j].h)) {
                    switchLayout(j - (dataTest.buttonLayout2 - appLayout.layout2));
                    return;
                }
            }
            break;
        case appLayout.layout2:
            var buttonBack = actionAreaTest[dataTest.buttonBack];
            if (buttonBack.touchEnable && !buttonBack.active && isInsideActionRect(x, y, buttonBack.x, buttonBack.y, buttonBack.w, buttonBack.h)) {
                switchLayout(appLayout.layout1);
            }
            for (var j = dataTest.buttonArrTouch1; j <= dataTest.buttonArrTouch2; j++) {
                if (actionAreaTest[j].touchEnable && !actionAreaTest[j].active && isInsideActionRect(x, y, actionAreaTest[j].x, actionAreaTest[j].y, actionAreaTest[j].w, actionAreaTest[j].h)) {
                    updateArrayTouchTest(j);
                    return;
                }
            }
            break;
    }
}

function drawArrTouch(context, infoButton)
{
    if(showArrTouch) {
        if(infoButton['arrTouch'] != undefined && infoButton.arrTouch.length > 0) {
            for(var i = 0; i < infoButton.arrTouch.length; i++) {
                var objTouch = infoButton.arrTouch[i];
                context.beginPath();
                context.lineWidth = "1";
                context.strokeStyle = "red";
                context.rect(objTouch.x, objTouch.y, objTouch.w, objTouch.h);
                context.stroke();
            }
        }
    }
}

function addArrayTouchTest(infoButton, type, alignLeft) {
    infoButton.arrTouch = [];
    switch(type)
    {
        case dataTest.buttonArrTouch1:
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
            break;
        case dataTest.buttonArrTouch2:
            if(!isPortraitMode()) {
                if(alignLeft)
                {
                    //rect Touch up
                    infoButton.arrTouch[0] = {};
                    infoButton.arrTouch[0].w = infoButton.w * 3 / 4;
                    infoButton.arrTouch[0].h = infoButton.h;
                    infoButton.arrTouch[0].x = infoButton.x;
                    infoButton.arrTouch[0].y = infoButton.y - infoButton.h / 2;
                    //rect Touch down
                    infoButton.arrTouch[1] = {};
                    infoButton.arrTouch[1].w = infoButton.arrTouch[0].w;
                    infoButton.arrTouch[1].h = infoButton.arrTouch[0].h;
                    infoButton.arrTouch[1].x = infoButton.arrTouch[0].x;
                    infoButton.arrTouch[1].y = infoButton.y + infoButton.h / 2;
                } else {
                    //rect Touch up
                    infoButton.arrTouch[0] = {};
                    infoButton.arrTouch[0].w = infoButton.w * 3 / 4;
                    infoButton.arrTouch[0].h = infoButton.h;
                    infoButton.arrTouch[0].x = infoButton.x + infoButton.w / 4;
                    infoButton.arrTouch[0].y = infoButton.y - infoButton.h / 2;
                    //rect Touch down
                    infoButton.arrTouch[1] = {};
                    infoButton.arrTouch[1].w = infoButton.arrTouch[0].w;
                    infoButton.arrTouch[1].h = infoButton.arrTouch[0].h;
                    infoButton.arrTouch[1].x = infoButton.arrTouch[0].x;
                    infoButton.arrTouch[1].y = infoButton.y + infoButton.h / 2;
                }
            } else {
                if(alignLeft) {
                    //rect Touch left
                    infoButton.arrTouch[0] = {};
                    infoButton.arrTouch[0].w = infoButton.w;
                    infoButton.arrTouch[0].h = infoButton.h * 3 / 4;
                    infoButton.arrTouch[0].x = infoButton.x - infoButton.w / 2;
                    infoButton.arrTouch[0].y = infoButton.y;
                    //rect Touch right
                    infoButton.arrTouch[1] = {};
                    infoButton.arrTouch[1].w = infoButton.arrTouch[0].w;
                    infoButton.arrTouch[1].h = infoButton.arrTouch[0].h;
                    infoButton.arrTouch[1].x = infoButton.x + infoButton.w / 2;
                    infoButton.arrTouch[1].y = infoButton.arrTouch[0].y;
                } else {
                    //rect Touch left
                    infoButton.arrTouch[0] = {};
                    infoButton.arrTouch[0].w = infoButton.w;
                    infoButton.arrTouch[0].h = infoButton.h * 3 / 4;
                    infoButton.arrTouch[0].x = infoButton.x - infoButton.w / 2;
                    infoButton.arrTouch[0].y = infoButton.y + infoButton.h / 4;
                    //rect Touch right
                    infoButton.arrTouch[1] = {};
                    infoButton.arrTouch[1].w = infoButton.arrTouch[0].w;
                    infoButton.arrTouch[1].h = infoButton.arrTouch[0].h;
                    infoButton.arrTouch[1].x = infoButton.x + infoButton.w / 2;
                    infoButton.arrTouch[1].y = infoButton.arrTouch[0].y;
                }
            }
            break;
    }
    
}

function updateArrayTouchTest(type) {
    for(var ii = dataLO2.buttonNote1; ii <= dataLO2.buttonNote6; ii++)
    {
        if(ii <= dataLO2.buttonNote3) {
            addArrayTouchTest(actionArea[ii], type, true);
        } else {
            addArrayTouchTest(actionArea[ii], type, false);
        }
    }
}

function drawObjectTouch(context, infoButton)
{
    if(showObjectTouch) {
        if(infoButton['touchEnable'] != undefined && infoButton.touchEnable) {
            var extendTouch = 1.0;
            if(infoButton['extendTouch'] != undefined) {
                extendTouch = infoButton.extendTouch;
            }
            if(infoButton['isCircle'] != undefined && infoButton.isCircle) {
                context.beginPath();
                context.lineWidth = "1";
                context.strokeStyle = "blue";
                context.arc(infoButton.cx, infoButton.cy, infoButton.r * extendTouch, 0, 2 * Math.PI);
                context.stroke();
            } else {
                var actionX = infoButton.x;
                var actionY = infoButton.y;
                var actionW = infoButton.w;
                var actionH = infoButton.h;
                if(extendTouch != 1.0) {
                    actionW *= extendTouch;
                    actionH *= extendTouch;
                    actionX = actionX - (actionW - infoButton.w) / 2;
                    actionY = actionY - (actionH - infoButton.h) / 2;
                }
                context.beginPath();
                context.lineWidth = "1";
                context.strokeStyle = "red";
                context.rect(actionX, actionY, actionW, actionH);
                context.stroke();
            }
        }
    }
}