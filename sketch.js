//Hungry monkey

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
 
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 bananaImage = loadImage("banana.png");

 obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  
  createCanvas(600,370);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;

  score = 0;
 
}

function draw() {

  background ("lightblue");

    stroke("black");
    fill("black");
    textSize(20);
    text("Score:"+  score, 250, 50);
  
  monkey.collide(ground);

  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
       
    
    if (ground.x < 0){
      ground.x = ground.width/2;
      ground.lifetime=800;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
   monkey.velocityY = monkey.velocityY + 0.8;
      
    obstacleGroup.setLifetimeEach(-1);
 
   food();
   obstacles();
    
      
    
   if(obstacleGroup.isTouching(monkey)){
      gameState = END;
          }
  }
 
   if (gameState === END) {
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     

    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 110, 200);
     
    stroke("black");
    fill("black");
    textSize(30);
    text("Monkey is dead", 100, 240);
     
   }
 
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
  }

}


 
 


