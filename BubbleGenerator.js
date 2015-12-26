var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var bubbleListe = [];
var i, j;
var interval = 0;

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  for(j = 0; j < bubbleListe.length; j++ ){
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.arc(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius,0,2*Math.PI);
    ctx.font = "20px Georgia";
    ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x, bubbleListe[j].y);
    ctx.fill();
    update(j);
    bubbleListe[j].x += bubbleListe[j].vx;
    bubbleListe[j].y += bubbleListe[j].vy;
    ctx.closePath();
  }
}

function init(num){
  clearInterval(interval);
  erzeugeBubbleMenge(num);
  interval = setInterval(draw, 26);
}

function Bubble(x, y, col, vx, vy, w){
  this.x = x;
  this.y = y;
  this.vx = vx
  this.vy = vy
  this.col = col;
  this.radius = Math.random() * 100 % 11 + 10;
  this.wert = w;
}

function erzeugeBubbleMenge(anzahl){
  bubbleListe.splice(0, bubbleListe.length);
  for (i = 0; i < anzahl; i++){
    erzeugeEinzelneBubble(i);
  }
}

function erzeugeEinzelneBubble(i){
  var randomX = Math.floor((Math.random() * 300) + 100);
  var randomY = Math.floor((Math.random() * 200) + 100);
  var col = '#'+Math.floor(Math.random()*16777215).toString(16);
  var velox = Math.round(Math.random()) * 4 - 2;
  var veloy = Math.round(Math.random()) * 4 - 2;
  var wert = i+1;
  var bubble = new Bubble(randomX, randomY, col, velox, veloy, wert);
  bubbleListe.push(bubble);
}

function update(j){
  var bubbleRborder = bubbleListe[j].x + bubbleListe[j].radius + bubbleListe[j].vx;
  var bubbleLborder = bubbleListe[j].x - bubbleListe[j].radius + bubbleListe[j].vx;

  var bubbleDborder =  bubbleListe[j].y + bubbleListe[j].radius + bubbleListe[j].vy;
  var bubbleUborder =  bubbleListe[j].y - bubbleListe[j].radius + bubbleListe[j].vy;

  if((bubbleRborder > c.width ) || (bubbleLborder < 0)){
    bubbleListe[j].vx = -bubbleListe[j].vx;
  }
  if((bubbleDborder > c.height) || (bubbleUborder < 0)){
    bubbleListe[j].vy = -bubbleListe[j].vy;
  }
}

function settings(){
  if(document.getElementById('settings').style.visibility == 'hidden'){
    document.getElementById('settings').style.visibility = 'visible';
  }
  else{
    document.getElementById('settings').style.visibility = 'hidden';
  }
}

function bubblenumber(){
  var number = parseInt(document.getElementById('bubnumber').value);
  init(number);
}
