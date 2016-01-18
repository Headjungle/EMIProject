/*
things to do:
3.add comments and popups for getting or losing points
4.add more shapes to bubbles(squares(done), bees, flowers, circles(done))
5. better results screen
*/
var c = document.getElementById("myCanvas"),
    ctx = c.getContext("2d"),
    bubbleListe = [],
    wertListe = [],
    i, j, s, start,
    interval = 0,
    score;

Array.prototype.min = function() {
  return Math.min.apply(null, this);
}

function reset() {                                                              //to reset the game menu
  score = 0;
  clearInterval(interval);
  bubbleListe.splice(0, bubbleListe.length);
  wertListe.splice(0, wertListe.length);
  document.getElementById('myCanvas').style.visibility = 'visible';
  document.getElementById('sco').innerHTML = 'JUST DO IT!';
  document.getElementById('tim').innerHTML = 'is a flat Circle';
  document.getElementById('sco').style.color = 'black';
  document.getElementById('settings').style.visibility = 'hidden';
  document.getElementById('desc').style.visibility = 'hidden';
}

function endofgame() {                                                          //to initialize the result screen of the match
  var n = new Date(),
      end = n.getTime(),
      min = parseInt((end - start)/60000),
      sec = Math.round(((end - start)/1000-min*60)* 100) / 100;

  document.getElementById('tim').innerHTML = min.toString()+ 'min '
                                              + sec.toString() + 's';

  if(score < 0)                                                                 //determines which color the scoreboard gets according to negative, neutral and positive score
    document.getElementById('sco').style.color = 'red';
  else
    document.getElementById('sco').style.color = 'black';
  if(score > 0)
    document.getElementById('sco').style.color = 'green';

  document.getElementById('sco').innerHTML = score.toString();
}

function gamelogic(j) {                                                         //to change the score of the match
  var points, history;
  if(bubbleListe[j].wert == wertListe.min()) {
    score += bubbleListe[j].wert;
    points = bubbleListe[j].wert;
    bubbleListe.splice(j, 1);
    wertListe.splice(j, 1);
  } else {
    score -= bubbleListe[j].wert;
    points = -bubbleListe[j].wert;
  }

  if(points < 0)                                                                //to create a history of incrementation or decrementation of the score
    history = points.toString().fontcolor('red');
  else
    history = ("+"+points.toString()).fontcolor('green');

  document.getElementById('sco').innerHTML = score.toString() + "   |     |   "
                                            + history;

  if (bubbleListe == undefined || bubbleListe.length == 0)
    endofgame();
}

function beiClick(event) {                                                      //EventListener for determining the user click coordinates on the canvas
  var x = event.x,
      y = event.y;

  x = event.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
  y = event.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;

  x -= c.offsetLeft;
  y -= c.offsetTop;

  for(j = 0; j < bubbleListe.length; j++) {                                     //to check if one bubble of bubbleListe is in the range of the user mouseclick
    var hypo = Math.hypot(Math.abs(x-bubbleListe[j].x),
                Math.abs(y-bubbleListe[j].y));

    if(bubbleListe[j].s == 2) {
      if(hypo <= bubbleListe[j].radius)
        gamelogic(j);

      } else {
      if(hypo <= bubbleListe[j].radius+7)
        gamelogic(j);
      }

  }
}

function Bubble(x, y, col) {
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
  this.vx = 0;
  this.vy = 0;

  while(this.vx == 0 && this.vy == 0) {                                         //to exclude the movement 0, 0 from the random number generation
    this.vx = Math.floor(Math.random() * (2 + 2 + 1)) - 2;
    this.vy =  Math.floor(Math.random() * (2 + 2 + 1)) - 2;
  }

  this.s = Math.floor(Math.random() * (2 - 1 + 1)) + 2;                         //to randomly generate the bubble shape(see line 160 for details)
}

function update(j) {                                                            //to determine if the bubble is near a canvas border, if true, invert the vector direction
  var bubbleRborder = bubbleListe[j].x + bubbleListe[j].radius,
      bubbleLborder = bubbleListe[j].x - bubbleListe[j].radius,
      bubbleDborder = bubbleListe[j].y + bubbleListe[j].radius,
      bubbleUborder = bubbleListe[j].y - bubbleListe[j].radius;

  if((bubbleRborder > c.width ) || (bubbleLborder < 0))
    bubbleListe[j].vx = -bubbleListe[j].vx;
  if((bubbleDborder > c.height) || (bubbleUborder < 0))
    bubbleListe[j].vy = -bubbleListe[j].vy;
}

function draw() {
  ctx.clearRect(0,0,c.width,c.height);
  for(j = 0; j < bubbleListe.length; j++ ) {
    shapes(j);

    bubbleListe[j].x += bubbleListe[j].vx;
    bubbleListe[j].y += bubbleListe[j].vy;
    update(j);

    ctx.fillStyle = 'black';
    ctx.beginPath();

    if(bubbleListe[j].s == 2) {
      ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x-bubbleListe[j].vx-3,
                    bubbleListe[j].y-bubbleListe[j].vy+3);
    } else {
      ctx.fillText(bubbleListe[j].wert, bubbleListe[j].x-bubbleListe[j].vx+8,
                    bubbleListe[j].y-bubbleListe[j].vy+14);
    }                                                                           //ends the older .beginPath()

    ctx.fill();                                                                 //contains .closePath()
  }
}

function shapes(j) {
  if(bubbleListe[j].s == 2) {
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.arc(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius,0,
            2*Math.PI);
    ctx.fill();
  } else {
    ctx.fillStyle = bubbleListe[j].col;
    ctx.beginPath();
    ctx.fillRect(bubbleListe[j].x,bubbleListe[j].y,bubbleListe[j].radius+5,
                  bubbleListe[j].radius+5);
  }
}

function erzeugeEinzelneBubble() {
  var randomX = Math.floor((Math.random() * 600) + 1),
      randomY = Math.floor((Math.random() * 400) + 1),
      col = '#D69620',
      bubble = new Bubble(randomX, randomY, col);
  bubbleListe.push(bubble);
}

function erzeugeBubbleMenge(anzahl) {
  for (i = 0; i < anzahl; i++) {
    erzeugeEinzelneBubble();
    wertListe.push(bubbleListe[i].wert);
  }
}

function init(num) {                                                            //initial start of the game
  reset();
  s = new Date();
  start = s.getTime();
  document.getElementById('begin').innerHTML = 'Neustarten';
  document.getElementById('sco').innerHTML = '0';

  erzeugeBubbleMenge(num);
  interval = setInterval(draw, 26);
  c.addEventListener("click", beiClick, false);
}

function bubblenumber() {                                                       // to prevent unallowed user input
  var number = parseInt(document.getElementById('bubnumber').value);

  if(isNaN(number) || number == 0 || number > 1000) {                           //isNaN(number) returns true or false
    alert("Error! Please enter an integer value from 1 to 1000\n"
          + "Fehler! Bitte gebe eine ganze Zahl zwischen 1 bis 1000 ein.");
    document.getElementById('bubnumber').value = 10;
  } else {
    init(number);
  }
}

function settings() {
  reset();
  document.getElementById('settings').style.visibility = 'visible';
}

function description() {
  reset();
  document.getElementById('begin').innerHTML = 'Starten';
  document.getElementById('myCanvas').style.visibility = 'hidden';
  document.getElementById('desc').style.visibility = 'visible';
}
