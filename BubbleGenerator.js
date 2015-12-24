/*var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.width  = 600;
ctx.height = 400;

function init(){

}

function erzeugeBubbleMenge(anzahl){

}

function erzeugeEinzelneBubble(){

}

function draw(){
  x = Math.floor((Math.random() * 600) + 0);
  y = Math.floor((Math.random() * 400) + 0);
  radius = Math.random() * 100 % 11 + 10;
  ctx.beginPath();
  ctx.arc(x,y,radius,0,2*Math.PI);
  ctx.closePath();
  ctx.stroke();
}
*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = c.width;
var H = c.height;
var beginx = 0;
var beginy = 0;
var bubbleListe = [];
var i, j;

function myFunction() {
    alert(W);
}

function draw(){
  ctx.fillStyle = '#729ECE';
  ctx.fillRect(beginx,beginy,c.width,c.height);
  for(j = 0; j < bubbleListe.length; j++ ){
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.arc(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius,0,2*Math.PI);
    ctx.font = "20px Georgia";
    ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x, bubbleListe[j].y);
    ctx.fill();
    update(j)
    ctx.closePath();


  }

}

function init(){
  var bubbleListe = [];
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var W = c.width;
  var H = c.height;
  var velox = 0;
  var veloy = 0;
  erzeugeBubbleMenge(10);
  setInterval(draw, 26);


}

function Bubble(x, y, col, vx, vy){
  this.x = x;
  this.y = y;
  this.vx = vx
  this.vy = vy
  this.col = col;
  this.radius = Math.random() * 100 % 11 + 10;
  this.wert = Math.ceil(Math.random() * 100 % 10) + 1;
}

function erzeugeBubbleMenge(anzahl){
  bubbleListe.splice(0, bubbleListe.length);
  for (i = 0; i < 10; i++){
    erzeugeEinzelneBubble();
  }
}

function erzeugeEinzelneBubble(){
  var randomX = Math.floor((Math.random() * 600) + 0);
  var randomY = Math.floor((Math.random() * 400) + 0);
  var col = '#'+Math.floor(Math.random()*16777215).toString(16);
  var velox = Math.ceil(Math.random() * 100 % 3) + 1;
  var veloy = Math.ceil(Math.random() * 100 % 3) + 1;
  var bubble = new Bubble(randomX, randomY, col, velox, veloy);
  bubbleListe.push(bubble);
}

function update(j){
  if((bubbleListe[j].x + bubbleListe[j].radius + bubbleListe[j].vx > c.width ) || (bubbleListe[j].x - bubbleListe[j].radius + bubbleListe[j].vx < 0)){
    bubbleListe[j].vx = -bubbleListe[j].vx;
  }
  if((bubbleListe[j].y + bubbleListe[j].radius + bubbleListe[j].vy > c.height) || (bubbleListe[j].y - bubbleListe[j].radius + bubbleListe[j].vy < 0)){
    bubbleListe[j].vy = -bubbleListe[j].vy;
  }
  bubbleListe[j].x += bubbleListe[j].vx;
  bubbleListe[j].y += bubbleListe[j].vy;
}
