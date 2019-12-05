var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bX = 10;
var bY = 150;
// load images

var nghia = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var gameOver = new Image();

nghia.src = "images/nghia2-mit-wings-transparent-fixed.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
gameOver.src = "images/gameover.jpg";

// some variables
var gap = 90;
var constant; 

var gravity = 1.3;
var score = 0; 

// audio files

var fly = new Audio();
var scor = new Audio();
var hit = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
hit.src = "sounds/hit.mp3";
// on key down

document.addEventListener("keydown",moveUp);
        
function moveUp() {
    bY -= 30;
    fly.play();
}
//again
function again() {
	window.location.replace("../nghia.html"); // return to the characters choices
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// draw images

function draw(){

	ctx.drawImage(bg,0,0);
    
    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        
        pipe[i].x--;
        
        if( pipe[i].x == 45){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }
      
    // detect collision
        if( bX + nghia.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + nghia.height >= pipe[i].y + constant) || bY + nghia.height >= cvs.height - fg.height ){
             hit.play();
             ctx.drawImage(gameOver,-125,25);
             ctx.fillStyle = "#000";
             ctx.font = "20px Verdana";
             ctx.fillText("Game Over!!! Nochmal?",10,cvs.height-150);
             ctx.fillText("Drücke eine Taste",20,cvs.height-120);
             ctx.fillText("um noch mal zu spielen ^^",10,cvs.height-90);
             document.addEventListener("keydown",again);
             scor.stop();
             }

        if(pipe[i].x == 5){
        	score++;
        	scor.play();
        }
    }
        
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(nghia,bX,bY);
    
    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();