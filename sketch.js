var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,invisibleground
var monkey , monkey_running
var bananaImage,  obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400);  

// To create the monkey
  monkey = createSprite(60,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;

// To create the ground
  ground = createSprite(300,380,600,10)
  //ground.x = ground.width /2;

//
  invisibleground = createSprite(300,360,600,10)
  
//collider box for the monkey  
  monkey.setCollider("circle", 0,0,200);
  monkey.debug = true;
  
//Creating groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0
  
  
invisibleground.visible = false
}


function draw() {
background("white");

//To display the score
  text("Score: "+ score, 500,50);
  
if(gameState === PLAY){
  
//To calculate the score
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
//jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 280){
        monkey.velocityY = -12; 
  }
    
//add gravity
  monkey.velocityY = monkey.velocityY + 0.3

//To spawn bananas
  spawnBanana();
  
//To spawn obstacles
  spawnObstacles();

if(obstacleGroup.isTouching(monkey)){
  gameState = END;
}  
}  
else if(gameState === END){
  
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(0);
     
     obstacleGroup.setVelocityXEach(0);
  
     monkey.velocityY = 0;
      
     reset();
  
  
}  
   
  
//To stop monkey from falling down
   monkey.collide(invisibleground);

  
  
drawSprites();  
}

function spawnBanana(){
  
  if (frameCount % 150 === 0){
   var banana = createSprite(600,165,10,40);
   banana.addImage(bananaImage); 
   banana.velocityX = -2
   banana.y = Math.round(random(50,150));
    
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 300;
   
   //add each obstacle to the group
    FoodGroup.add(banana);
 }
  
}

function spawnObstacles(){

  if (frameCount % 280 === 0){
   var obstacles = createSprite(600,330,10,40);
   obstacles.addImage(obstacleImage); 
   obstacles.velocityX = -3
  
    
   
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.25;
    obstacles.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacles);
 }  
    
}

function reset(){
  
  if(keyWentDown("R")){
     
     gameState = PLAY ;    
  }  
 
  
  
}

