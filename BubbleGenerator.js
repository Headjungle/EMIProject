var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var bubbleListe = [];
var i, j, t;
var interval = 0;

/*function box(){
  var op1, op2;
  op1 = 1 < 4;
  op2 = 2 < 3;
  if (op1 && op2 == true){
    alert("Hello");

  }
}*/

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  for(j = 0; j < bubbleListe.length; j++ ){
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.arc(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius,0,2*Math.PI);
    ctx.fill();
    bubbleListe[j].x += bubbleListe[j].vx;
    bubbleListe[j].y += bubbleListe[j].vy;
    update(j);
    /*for(t = 0; t < bubbleListe.length; t++){
      if(j != t){
        var h, d;
        h = Math.hypot(Math.abs(bubbleListe[j].x-bubbleListe[t].x), Math.abs(bubbleListe[j].y-bubbleListe[t].y));
        d = h - bubbleListe[j].radius - bubbleListe[t].radius;
        if(d <= 0){
          bubbleListe[j].vx = -vx2;
          bubbleListe[t].vx = -vx1;
          bubbleListe[j].vy = -vy2;
          bubbleListe[t].vy = -vy1;
        }
      }
    }*/

    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x, bubbleListe[j].y)
    ctx.closePath;
    ctx.fill();
  }
}

function init(num){
  clearInterval(interval);
  erzeugeBubbleMenge(num);
  interval = setInterval(draw, 26);
  c.addEventListener("click", beiClick, false);
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
  var col = '#D69620';
  var velox = Math.round(Math.random()) * 4 - 2;
  var veloy = Math.round(Math.random()) * 4 - 2;
  var wert = i+1;
  var bubble = new Bubble(randomX, randomY, col, velox, veloy, wert);
  bubbleListe.push(bubble);
}

function update(j){
  var bubbleRborder = bubbleListe[j].x + bubbleListe[j].radius;
  var bubbleLborder = bubbleListe[j].x - bubbleListe[j].radius;

  var bubbleDborder =  bubbleListe[j].y + bubbleListe[j].radius;
  var bubbleUborder =  bubbleListe[j].y - bubbleListe[j].radius;

  if((bubbleRborder > c.width ) || (bubbleLborder < 1)){
    bubbleListe[j].vx = -bubbleListe[j].vx;
    bubbleListe[j].vy = -bubbleListe[j].vy;

  }
  if((bubbleDborder > c.height) || (bubbleUborder < 1)){
    bubbleListe[j].vy = -bubbleListe[j].vy;
    bubbleListe[j].vx = -bubbleListe[j].vx;

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

function beiClick(event){
  var x = event.x;
  var y = event.y;

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

  x -= c.offsetLeft;
  y -= c.offsetTop;

  for(j = 0; j < bubbleListe.length; j++ ){
    var hypo = Math.hypot(Math.abs(x-bubbleListe[j].x), Math.abs(y-bubbleListe[j].y));
    var score = 0;
    if(hypo <= bubbleListe[j].radius){
      bubbleListe.splice(j, 1);
      score = score + j;
    }

  }

  //alert("x:" + x + " y:" + y);
}

function bubblenumber(){
  var number = parseInt(document.getElementById('bubnumber').value);
  init(number);
}
