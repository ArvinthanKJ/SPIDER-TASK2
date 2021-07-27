var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function floor(x, height) {
  this.x = x;
  this.m=0
  this.width = 840;
  this.height = height;
  this.obstr1 =1220+(Math.floor(Math.random()*140)*5);
  this.obstr2 =1220+(Math.floor(Math.random()*140)*5);
  this.obstr3 =1220+(Math.floor(Math.random()*140)*5);
  this.random1=(Math.floor(Math.random()*570))+20;
  this.random2=(Math.floor(Math.random()*570))+20;
  this.random3=(Math.floor(Math.random()*570))+20;
  this.l=0
}
var flag0=1
var l=0
var n=1
var bad=450
var flagBad=1
var boost=100
var world = {
  height: 620,
  width: 840,
  gravity: 4,
  speed: 5,
  speed2:3.5,
  distanceTravelled: 0,
  points:0,
  floorTiles: [
    new floor(0, 110)
  ],
  moveFloor: function() {
    for(index in this.floorTiles) {
      var tile = this.floorTiles[index];
      tile.x -= this.speed;
      tile.obstr1 -= this.speed;
      tile.obstr2 -= this.speed;
      tile.obstr3 -= this.speed2;
     this.distanceTravelled += this.speed;
      
      if(bad!=110&&flagBad==1){
      bad=bad-0.5}else{
        bad=bad+0.5
        flagBad=0
        if(bad==510){flagBad=1}
      }
    }
    },
  addFutureTiles: function() {
    if(this.floorTiles.length >= 3) {
      return;
    }
    var previousTile = this.floorTiles[this.floorTiles.length - 1];
    var randomHeight = 110;
    var leftValue = (previousTile.x + previousTile.width);
    var next = new floor(leftValue, randomHeight);
    this.floorTiles.push(next);
  },
  cleanOldTiles: function() {
    for(index in this.floorTiles) {
      if(this.floorTiles[index].x <= -this.floorTiles[index].width) {
        this.floorTiles.splice(index, 1);
      }
      
    }
  },
  tick: function() {
    this.cleanOldTiles();
    this.addFutureTiles();
    this.moveFloor();
  },
  
  draw: function() {
    ctx.fillStyle = "#B0E0E6";
    ctx.fillRect (0, 0, this.width, this.height);
    for(index in this.floorTiles) {
      var tile = this.floorTiles[index];
      ctx.fillStyle = "#FFB6C1";
      ctx.fillRect(tile.obstr1,tile.random1, 30, 30);

      if(tile.obstr1<=player.x+60&&tile.obstr1+30>=player.x&&tile.random1+30>=player.y-50&&tile.random1<=player.y)
      flag0--

      ctx.fillStyle = "#FFB6C1";
      ctx.fillRect(tile.obstr2,tile.random2, 30, 30);
      
      if(tile.obstr2<=player.x+60&&tile.obstr2+30>=player.x&&tile.random2+30>=player.y-50&&tile.random2<=player.y)
      flag0--

        
      if(n==1){
        tile.laser=60+player.x
        tile.laser1=player.y
         n=0
        }
        if(tile.laser>750){tile.laser=60+player.x
          tile.laser1=player.y
           n=0}
        
        else{
        ctx.fillStyle = "red";
        ctx.fillRect(tile.laser,tile.laser1-23, 4, 4); 
        tile.laser=tile.laser+8
        }
        if((tile.laser+4>=tile.obstr1)&&(tile.laser<=tile.obstr1+30)&&(tile.laser1-19>=tile.random1)&&(tile.laser1-23<=tile.random1+30))
        {world.distanceTravelled=world.distanceTravelled+10000
          tile.obstr1=tile.obstr1-1500
          console.log("hit")
        }

        if(tile.laser+4>=tile.obstr2&&tile.laser<=tile.obstr2+30&&tile.laser1-19>=tile.random2&&tile.laser1-23<=tile.random2+30)
        {world.distanceTravelled=world.distanceTravelled+10000
          tile.obstr2=tile.obstr2-1500
          console.log("hit")
        }
         
        
         }
  },
 

};

var player = {
    x: 160,
    y: 330,
    height: 50,
    width: 60,
    flagLaser:0,
    gravity1:0,
    draw: function() {
       
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.height);
    ctx.lineTo(player.x, player.y);
    ctx.lineTo(player.x+player.width, player.y-(player.height)/2);
    ctx.closePath();
    ctx.fillStyle = "#00CC99";
    ctx.fill();
    }
    
  };

function tick() {
    world.tick();
    world.draw();
    //world.draw1();
    function tick1() {window.setTimeout("tick()", 1000/60);}
    player.draw();
    if(flag0>=1){
    tick1()
    }else{
      var score=world.points+Math.floor(Math.round(world.distanceTravelled/100))
      console.log(score) 
      var HighScore = localStorage.getItem("HighScore");
      if(HighScore==null){HighScore=score}
      if(score>=HighScore){
      localStorage.setItem("HighScore",score);
      }
      ctx.font = "26px Arial";
      ctx.fillText("HighScore:",200,250)
      ctx.fillText(HighScore, 334, 250);
      ctx.fillText("YourScore:",200,280)
      ctx.fillText(score,334,280)
    }}
    tick();

    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 32:
            n=1
          break; 
        case 37:
              if(player.x>20)
              player.x=player.x-20
          break;
         case 38:
              if(player.y>50)     
              player.y=player.y-20
          break;
         case 39:
              if(player.x<740)
              player.x=player.x+20
          break;
         case 40:
              if(player.y<600)
               player.y=player.y+20
          break;
      }
  };
 