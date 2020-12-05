var player
var crash
var Edges
var HQgrp
var crawl
var lasergrp
var bombgrp
var HQhit=false
var HQlaser=0
var HQbomb=0
var lcount=0
var bomblmt=5
var gameState="begin"
var gameOver

function preload(){
playerImg=loadImage("images/player.png")
gameImg=loadImage("images/game over.jpg")
backgroundImg=loadImage("images/background.png")
bombImg=loadImage("images/bomb.png")
laserImg=loadImage("images/laser.png")
HQImg=loadImage("images/HQ.png")
crawlImg=loadImage("images/crawl.png")
crashImg=loadImage("images/crawl.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
bg=createSprite(displayWidth/2, displayHeight/2)
bg.addImage(backgroundImg)
bg.scale=4
gameOver=createSprite(displayWidth/2,displayHeight/2,5,5)
gameOver.visible=false
player=createSprite(400, 200, 50, 50);
player.setCollider("rectangle",0,0,300,100)
player.addImage(playerImg)
lasergrp=new Group()
HQgrp=new Group()
crawlgrp=new Group()
bombgrp=new Group()
}

function draw() {
  if(gameState==="begin"){
text("INVASION OF THE GALAXY",displayWidth/2-200,displayHeight/2)
if(keyDown("space")){
gameState="start"
}
  }
  else if(gameState==="over"){
    gameOver.visible=true
    gameOver.addImage(gameImg)
  }
  else if(gameState==="start"){
 background(0,0,0);
 Edges=createEdgeSprites()
 player.collide(Edges[1])
 player.collide(Edges[0])
 player.collide(Edges[2])
 player.collide(Edges[3])
if (keyIsDown(UP_ARROW)){
  player.y=player.y-5
}
if (keyIsDown(DOWN_ARROW)){
  player.y=player.y+5
}
if (keyIsDown(RIGHT_ARROW)){
 generateBullet()
}
if (keyIsDown(LEFT_ARROW)){
  if(bombgrp.length<5){
    generateBomb();

  }
 }
 if(player.isTouching(HQgrp)||player.isTouching(crawlgrp)){
gameState="over"
 }
 if (frameCount%200===0)
 generateHQ()
 if (frameCount%500===0)
 generateCrawl()
 if(HQgrp.isTouching(lasergrp)){
  // HQgrp.destroyEach()
  for(var i=0;i<HQgrp.length;i++){
if(HQgrp.get(i).isTouching(lasergrp)){
  lcount=lcount+1;
  lasergrp.get(i).destroy()
  console.log("count"+lcount)
  if(lcount===2){
    HQgrp.get(i).destroy()
    lcount=0
  }
}
  }
 }
 if(crawlgrp.isTouching(lasergrp)){
  crawlgrp.destroyEach()
}
if(crawlgrp.isTouching(bombgrp)){
  crawlgrp.destroyEach()
}
if(HQgrp.isTouching(bombgrp)){
  HQgrp.destroyEach()
}
  drawSprites();
  textSize(25)
  fill("white")
  text("bomb limit="+bomblmt-parseInt(bombgrp.length),50,50)
}
}
function generateBullet(){
  if (frameCount% 30===0){
  var laserSpawn=createSprite(350,200)
  laserSpawn.setCollider("rectangle",0,0,100,50)
  laserSpawn.addImage(laserImg)
laserSpawn.scale=0.5
laserSpawn.y=player.y
laserSpawn.x=player.x
laserSpawn.velocityX=+5
lasergrp.add(laserSpawn)
}
}
function generateBomb(){
  if (frameCount% 30===0){
  bomb=createSprite(400,200)
bomb.addImage(bombImg)
bomb.scale=0.3
bomb.y=player.y
bomb.x=player.x
bomb.velocityX=+5
bombgrp.add(bomb)
bombgrp.setColliderEach("circle",0,0,300)
  }
}
function generateHQ(){
  var HQ=createSprite(displayWidth,random(0,displayHeight))
  HQ.addImage(HQImg)
  HQ.velocityX=-2
  HQgrp.add(HQ)
  HQgrp.setColliderEach('circle',0,0,200)
}

function generateCrawl(){
  var crawl=createSprite(displayWidth,random(0,displayHeight))
  crawl.addImage(crawlImg)
  crawl.velocityX=-2
  crawlgrp.add(crawl) 
}
  
function keyPressed(){
  console.log("entering x")
  if((keyCode==120)){
  laserSpawn.velocityX=+5  
  }
}
function keyPressed(){
  console.log("entering x")
  if((keyCode==120)){
  bomb.velocityX=+5  
  }


}

























