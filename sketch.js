
var monkey , monkey_running;
var ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500)
  

  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
   
  fill("brown")
  ground=createSprite(400,350,900,10);
  ground.shapeColor="green"
  ground.velociyX = -4;
  ground.x=ground.width/2;
  console.log(ground.x)
    
   
  
 FoodGroup = new Group();
 obstacleGroup=new Group();
  
  invisibleGround = createSprite(410, 352, 900, 10);
  invisibleGround.x = ground.width / 2;
  invisibleGround.visible = false;
}


function draw() {

  
  background("lightblue");
  if(gameState === PLAY){
    spawnObstacles();
    spawnBananas();
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
    if(keyDown("space")&&monkey.isTouching(ground) ) {
        monkey.velocityY = -20;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
 
  
  if(FoodGroup.isTouching(monkey)){
   
   FoodGroup.destroyEach();
    }
   stroke("black")
  textSize(20)
  fill("red")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime, 150,50)

  }
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
   }
   if(gameState === END){
  
      
     
     obstacleGroup.setVelocityEach(0);
     FoodGroup.setVelocityEach(0);
     obstacleGroup.setLifetimeEach(-1)
     FoodGroup.setLifetimeEach(-1)
      stroke("black")
      textSize(30)
      fill("black")
      text ("Gameover",180,210);
 }
 
  
  
 
   monkey.collide(invisibleGround)
  drawSprites();

  
  
  
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 120;
    
 
     FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(390, 310, 23, 32);
    obstacle.velocityX=-4
    obstacle.addImage( obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.lifetimeEach=100;
    
  }

  
  
  
  }




  
  
  
  



