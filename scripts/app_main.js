// (function () {
//     canvas = document.getElementById('mainCanvas');
//     ctx = canvas.getContext("2d");
    
//     canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//     WIDTH	= canvas.width;
//     HEIGHT	= canvas.height;
    
//     clearScreen();
// })();

// document.addEventListener("DOMContentLoaded", app_main_init);

// function app_main_init() {
// (function() {

//     canvas = document.getElementById('mainCanvas');
//     ctx = canvas.getContext("2d");
    
//     canvas.width = 0;
//     canvas.height = 0;
//     WIDTH	= canvas.width;
//     HEIGHT	= canvas.height;
    
//     clearScreen();
// })();
// }


			
// function clearScreen() {
//     var grd = ctx.createLinearGradient(0,0,0,180);
//     grd.addColorStop(0,"#6666ff");
//     grd.addColorStop(1,"#aaaacc");

//     ctx.fillStyle = grd;
//     ctx.fillRect(  0, 0, WIDTH, HEIGHT );
// }

// function resizeCanvas() {
//     if(enableGamepad == false)
//         return;
//     canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
//     WIDTH = canvas.width;
//     HEIGHT = canvas.height;
    
//     clearScreen();
//     drawGamepad();
// }

// var myVirtualGamepad;
var WIDTH = 0;
var HEIGHT = 0;

function startGamepad()
{
    myVirtualGamepadArea.start();
}

var myVirtualGamepadArea = {
    canvas : document.getElementById('mainCanvas'),
    start : function() {
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateVirtualGamepadArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateVirtualGamepadArea() {
    myVirtualGamepadArea.clear();
    drawGamepad(myVirtualGamepadArea.context);
}

function resizeCanvas() {
    if(enableGamepad == false)
        return;
    myVirtualGamepadArea.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    myVirtualGamepadArea.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    WIDTH = myVirtualGamepadArea.canvas.width;
    HEIGHT = myVirtualGamepadArea.canvas.height;
    
    myVirtualGamepadArea.clear();
    //drawGamepad();
}