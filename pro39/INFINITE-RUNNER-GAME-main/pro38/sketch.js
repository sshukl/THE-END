var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;monkey
var gameOver;
var gameState=0;
var score=0;
var END=0;
var survialTime;

function preload(){
  backImage=loadImage("js/jungle.jpg");
  monkey_running = loadAnimation("js/Monkey_01.png","js/Monkey_02.png","js/Monkey_03.png","js/Monkey_04.png","js/Monkey_05.png","js/Monkey_06.png","js/Monkey_07.png","js/Monkey_08.png","js/Monkey_09.png","js/Monkey_10.png");
  
  bananaImage = loadImage("js/banana.png");
  obstacle_img = loadImage("js/stone.png"); 
  
}

function setup() {
  createCanvas(1000,500);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-2;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     // score=score-2;
    }
 
   
  
  drawSprites();
  if(gameState === "end"){
    textSize(30);
    fill("yellow");
    stroke("black")
    text("OOPS! GAME OVER!", camera.position.x,100);  
    text("MONKEY IS DEAD", camera.position.x,200);  
   // monkey.velocityX = 0;
   // camera.velocityX = 0;
    //ground.velocityX = 0;
    obstacle.visible = false;
    banana.visible = false;
    bananas = 0;
    survivalTime = 0;
    if(keyWentDown("space")){
      gameState = "play";
     // console.log("end is working");
    }
  }

  if(obstaclesGroup.isTouching(monkey)){
    gameState = "end";  
    
  }

  console.log(monkey.velocityX);

spawnObstacles();
spawnFood();
  
  stroke("black");
  textSize(30);
  fill("red");
  text("Score: "+ score, 100,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
