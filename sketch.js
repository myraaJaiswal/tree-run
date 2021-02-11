  //var Engine = Matter.Engine,
 // World = Matter.World,
  //Events = Matter.Events,
  //Bodies = Matter.Bodies;
  var PLAY = 1;
  var END = 0;
  var gameState=PLAY;
  var tree, treeImg;
  var rain, rainImg,rainGrp
  var axe,axeImg,axeGrp
  var background1,bgImg;
  var invisibleGround;
  var score;

function preload(){
treeImg=loadImage("tree.png")
axeImg=loadImage("axe.png")
rainImg=loadImage("rain.png")
bgImg=loadImage("background.jpg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  //engine = Engine.create();
  //world = engine.world;   

  background1=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  background1.scale=1.5;
  background1.addImage(bgImg);

  invisibleGround = createSprite(displayWidth/2,displayHeight,displayWidth,displayHeight-200);
  invisibleGround.visible = false;

  tree = createSprite(displayWidth/4-50,displayHeight-330,20,50);
  tree.addImage(treeImg);

  rainGrp=createGroup();
  axeGrp=createGroup();

  tree.setCollider("circle",0,20,100);
  tree.debug = false;

  score = 0;
  
}
 
function draw() {
  background("yellow");

  if(gameState===PLAY){
   
  if (background1.x < 0){
  background1.x = background1.width/2;
}

  spawnAxe();
  spawnRain();

  if(keyDown("space") && tree.y >= 100) {
    tree.velocityY = -12;
  }

    tree.velocityY = tree.velocityY + 0.8

    console.log(tree.y);

    if(rainGrp.isTouching(tree)){
      score=score+1;
    }



 if(axeGrp.isTouching(tree)){
  gameState = END;
}
  }
  else if(gameState===END){

    

    background1.velocityX = 0;
      tree.velocityY = 0
      

   // axeGrp.setLifetimeEach(-1);
   // rainGrp.setLifetimeEach(-1);
     
     axeGrp.setVelocityXEach(0);
     rainGrp.setVelocityXEach(0);  
     
if(keyDown("r")){
  reset();
}
     
  }
  tree.collide(invisibleGround);
  
   drawSprites();
   textSize(16);
   fill("black");
   text("SCORE"+score,displayWidth/2,displayHeight/2);
   text("Win points by touching rain lose if you touch the axe. Press R to restart",displayWidth/2,displayHeight-400);
}

function spawnAxe(){
   if(frameCount % 300===0){
   axe=createSprite(800,400,10,50);
   axe.scale=0.8;
axe.velocityX=-3;
axe.y = Math.round(random(250,300));
   var rand=Math.round(random(1,6));
     console.log(rand);
     axeGrp.add(axe);
    axe.addImage(axeImg);
   
   } 
    
 }
 
 function spawnRain(){
  if(frameCount % 200===0){
  rain=createSprite(800,160,10,50);
  rain.scale=0.8;
rain.velocityX=-3;
rain.lifetime=200;
rain.y = Math.round(random(100,300));
  var rand=Math.round(random(1,6));
    console.log(rand);
    rainGrp.add(rain)
   rain.addImage(rainImg);
  
  } 
   
}
function reset(){
  
    gameState=PLAY;
    axeGrp.destroyEach();
  rainGrp.destroyEach();
    score=0;
  }      
  

 
