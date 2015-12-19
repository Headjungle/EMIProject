
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var bubbleListe = [];
ctx.width  = 600;
ctx.height = 400;
var i, j;


function init(){
  var bubbleliste = new Array();
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.width  = 600;
  ctx.height = 400;
  erzeugeBubbleMenge(10);
  setInterval(draw, 26);


}

var Bubble = function(x, y, col){
  this.x = x;
  this.y = y;
  this.col = col;
  this.radius = Math.random() * 100 % 11 + 10;
  this.wert = Math.ceil(Math.random() * 100 % 10) + 1;
}

function erzeugeBubbleMenge(anzahl){
  bubbleListe.splice(0, bubbleListe.length);
  for (i = 0; < 10; i++){
    erzeugeEinzelneBubble();
  }
}

function erzeugeEinzelneBubble(){
  var randomX = Math.floor((Math.random() * 600) + 0);
  var randomY = Math.floor((Math.random() * 400) + 0);
  var col = "#FF0000";
  var bubble = new Bubble(randomX, randomY, col)
  bubbleListe.push(bubble);
}

function draw(){
  ctx.clearRect(0,0,600,400);
  for(j = 0; j < bubbleListe.length; j++ ){
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x,y,radius,0*Math.PI,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
  }

}
