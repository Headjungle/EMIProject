/*things to do:
1.prevent the blind trust in the user input
2.add function description
3.add comments and popups for getting or losing points*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var bubbleListe = [];
var wertListe = [];
var i, j, s, start;
var interval = 0;
var score = 0;

Array.prototype.min = function() {
  return Math.min.apply(null, this);
}

function gamelogic(j){
  if(bubbleListe[j].wert == wertListe.min()){
    score = score + bubbleListe[j].wert;
  }else{
    score = score - bubbleListe[j].wert;
  }

  bubbleListe.splice(j, 1);
  wertListe.splice(j, 1);

  if(score < 0){
    document.getElementById('sco').style.color = 'red';
  }else{
      document.getElementById('sco').style.color = 'black';
  }
  if(score > 0){
    document.getElementById('sco').style.color = 'green';
  }

  document.getElementById('sco').innerHTML = score.toString();
  if (bubbleListe == undefined || bubbleListe.length == 0) {
    endofgame();
  }
}

function endofgame(){
  var n = new Date();
  var end = n.getTime();
  var time = (end - start);
  var min = parseInt(time/60000);
  var sec = Math.round((time/1000-min*60)* 100) / 100;

  document.getElementById('tim').innerHTML = min.toString()+ 'min ' +sec.toString() + 's';
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
  document.getElementById('settings').style.visibility = 'hidden';
  var x = event.x;
  var y = event.y;

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

  x -= c.offsetLeft;
  y -= c.offsetTop;

  for(j = 0; j < bubbleListe.length; j++){
    var hypo = Math.hypot(Math.abs(x-bubbleListe[j].x), Math.abs(y-bubbleListe[j].y));
    if(hypo <= bubbleListe[j].radius){
      gamelogic(j);
    }
  }
}

function Bubble(x, y, col){
  this.col = col;
  this.radius = Math.random() * 100 % 11 + 10;
  this.wert = Math.floor(Math.random() * 100 % 10) + 1;

  if (x + this.radius > c.width)
    x -= this.radius;
  if (y + this.radius > c.height)
    y -= this.radius;
  if (x - this.radius < 0)
    x += this.radius;
  if (y - this.radius < 0)
    y += this.radius;

  this.x = x;
  this.y = y;
  this.vx = (Math.random() * 2) + 1;
  this.vy = (Math.random() * 2) + 1;
}

function erzeugeBubbleMenge(anzahl){
  bubbleListe.splice(0, bubbleListe.length);
  wertListe.splice(0, wertListe.length);
  for (i = 0; i < anzahl; i++){
    erzeugeEinzelneBubble(i);
    wertListe.push(bubbleListe[i].wert);
  }
}

function erzeugeEinzelneBubble(i){
  var randomX = Math.floor((Math.random() * 600) + 1);
  var randomY = Math.floor((Math.random() * 400) + 1);
  var col = '#D69620';
  var bubble = new Bubble(randomX, randomY, col);
  bubbleListe.push(bubble);
}

function update(j){
  var bubbleRborder = bubbleListe[j].x + bubbleListe[j].radius;
  var bubbleLborder = bubbleListe[j].x - bubbleListe[j].radius;

  var bubbleDborder =  bubbleListe[j].y + bubbleListe[j].radius;
  var bubbleUborder =  bubbleListe[j].y - bubbleListe[j].radius;

  if((bubbleRborder > c.width ) || (bubbleLborder < 0)){
    bubbleListe[j].vx = -bubbleListe[j].vx;

  }
  if((bubbleDborder > c.height) || (bubbleUborder < 0)){
    bubbleListe[j].vy = -bubbleListe[j].vy;
  }
}

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  for(j = 0; j < bubbleListe.length; j++ ){
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.arc(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius,0,2*Math.PI);
    ctx.fill();

    bubbleListe[j].x += bubzbleListe[j].vx;
    bubbleListe[j].y += bubbleListe[j].vy;
    update(j);

    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x, bubbleListe[j].y)
    ctx.closePath;
    ctx.fill();
  }
}

function bubblenumber(){
  var number = parseInt(document.getElementById('bubnumber').value);
  init(number);
}

function init(num){
  s = new Date();
  start = s.getTime();
  clearInterval(interval);
  document.getElementById('begin').innerHTML = 'Neustarten';
  score = 0;
  document.getElementById('sco').innerHTML = score.toString();
  document.getElementById('tim').innerHTML = 'is a flat Circle';
  document.getElementById('sco').style.color = 'black';
  document.getElementById('settings').style.visibility = 'hidden';
  erzeugeBubbleMenge(num);
  interval = setInterval(draw, 26);
  c.addEventListener("click", beiClick, false);
}
