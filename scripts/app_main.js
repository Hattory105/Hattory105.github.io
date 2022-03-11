// (function () {
//     canvas = document.getElementById('mainCanvas');
//     ctx = canvas.getContext("2d");
    
//     canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//     WIDTH	= canvas.width;
//     HEIGHT	= canvas.height;
    
//     clearScreen();
// })();

(function () {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext("2d");
    
    canvas.width = 0;
    canvas.height = 0;
    WIDTH	= canvas.width;
    HEIGHT	= canvas.height;
    
    clearScreen();
})();
			
function clearScreen() {
    var grd = ctx.createLinearGradient(0,0,0,180);
    grd.addColorStop(0,"#6666ff");
    grd.addColorStop(1,"#aaaacc");

    ctx.fillStyle = grd;
    ctx.fillRect(  0, 0, WIDTH, HEIGHT );
}

function resizeCanvas() {
    if(enableGamepad == false)
        return;
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    
    clearScreen();
    drawGamepad();
}