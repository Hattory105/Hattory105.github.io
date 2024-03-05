function isInsideActionRect(pX, pY, x, y, w, h) {
    if ((pX > x) && (pX < (x + w))) {
        if ((pY > y) && (pY < (y + h))) {
            return true;
        }
    }
    return false;
}

function isPointInCircle(x, y, cx, cy, radius) {
    var dx = x - cx,
        dy = y - cy,
        dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
        return true;
    }
    return false;
}

function isPortraitMode() {
    if(getOperatingSystem()=="iPhone") //Fix bug reverse control
    {
        if(isLandscapeIOS())
            return false;
        return true;
    }
    return screen.width < screen.height;
}

function isLandscapeMode() {
    if(getOperatingSystem()=="iPhone") //Fix bug reverse control
    {
        if(isLandscapeIOS())
            return true;
        return false;
    }
    return screen.width > screen.height;
}

function isPortraitIOS() {
    // return (window.outerWidth < window.outerHeight);
    return (window.innerWidth < window.innerHeight);
}

function isLandscapeIOS() {
    //return (window.outerWidth > window.outerHeight);
    return (window.innerWidth > window.innerHeight);
}

function getOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    writeLog("userAgent: " + userAgent);
    if (/android/i.test(userAgent))
        return "Android";
    if (/iPhone/.test(userAgent) && !window.MSStream)
        return "iPhone";
    if (/iPad/.test(userAgent) && !window.MSStream)
        return "iPad";
    return "unknown";
}

function drawImageRotate(ct, src, isRotate, x, y, w, h) {
    // console.log("isRotate: " + isRotate + ", x: " + x + ", y: " + y + ", w: " + w + ", h: " + h);
    if(!isRotate) {
        ct.drawImage(src, x, y, w, h);
    } else {
        ct.save();
        ct.translate(x + w, y);
        ct.rotate(90 * Math.PI / 180);
        ct.drawImage(src, 0, 0, h, w);
        ct.restore();
    }
}

function writeLog(data) {
    if(enableLog == true) {
        console.log(data);
    }
}