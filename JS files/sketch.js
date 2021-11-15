const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var gameState = "play";
var fighterPlane, fighterPlaneIMG;
var enemyImg, enemy;
var bgImg, BackGround;
var building, building1, building2, building3, building4, building5, building;
var rand;
var bomb, bombImg, explosionImg;
var bombGroup, buildingsGroup, bulletGroup, planeGroup;
var bulletImg;
var enemieskilled = 0;
var buildingsdestroyed = 0;
var bulletSound, bombSound, explosionSound, bullet2;

function preload(){
  fighterPlaneIMG = loadImage("Images/Fighter Planes/Fighter.png");
  bgImg = loadImage("Images/bg.jpg");
  building1 = loadImage("Images/Buildings/Storage.png");
  building2 = loadImage("Images/Buildings/School.png");
  building3 = loadImage("Images/Buildings/House.png");
  building4 = loadImage("Images/Buildings/Construct.png");
  bombImg = loadImage("Images/bomb.png");
  enemyImg = loadImage("Images/Fighter Planes/Enemy.png");
  explosionImg = loadImage("Images/Buildings/Explosion.png");
  bulletImg = loadImage("Images/bullet.png")
  bulletSound = loadSound("Sounds/gunshot.mp3");
  bombSound = loadSound("Sounds/bombdrop.mp3");
  explosionSound = loadSound("Sounds/explosion.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  BackGround = createSprite(windowWidth,windowHeight/2,20,20);
  BackGround.addImage(bgImg);
  BackGround.x =  BackGround.width/2;
  BackGround.velocityX = -10;
  BackGround.scale = 5;

  fighterPlane = createSprite(100, 60, 50, 50);
  fighterPlane.shapeColor = "#267c21";
  fighterPlane.addImage(fighterPlaneIMG);
  fighterPlane.scale = 0.5;
  fighterPlane.setCollider("rectangle", 0, 0, 200, 150);

  bombGroup = new Group();
  buildingsGroup = new Group();
  fighterbulletGroup = new Group();
  enemybulletGroup = new Group();
  planeGroup = new Group();
}

function draw() {
  background("white"); 
  edges = createEdgeSprites();
  Engine.update(engine);

 if(gameState === "play"){
  if(BackGround.x < 300){
    BackGround.x = BackGround.width;
  }

  if(keyDown("DOWN_ARROW")){
    fighterPlane.y = fighterPlane.y + 20;
  }
  if(keyDown("UP_ARROW")){
    fighterPlane.y = fighterPlane.y - 15;
  }
  if(keyDown("LEFT_ARROW")){
    fighterPlane.x = fighterPlane.x - 30;
  }
  if(keyDown("RIGHT_ARROW")){
    fighterPlane.x = fighterPlane.x + 20;
  }

  fighterPlane.collide(edges);

  if(keyWentDown("space")){
    createBomb();
    bombSound.play();
  }
  if(keyWentDown("B")){
    createBullet();
    bulletSound.play();
  }

  if(bombGroup.isTouching(building)){
    building.destroy();
    buildingsdestroyed++;
    explosionSound.play();
  } 
 
  if(fighterbulletGroup.isTouching(planeGroup)){
    planeGroup.destroyEach();
    enemieskilled++;
    explosionSound.play();
  } 

  if(buildingsGroup.isTouching(fighterPlane) || enemybulletGroup.isTouching(fighterPlane) || planeGroup.isTouching(fighterPlane)){
    fighterPlane.visible = false;
    explosionSound.play();
    gameState = "end";
  }

  spawnEnemies();
  spawnBuildings();
 }

 if(gameState === "end"){
  BackGround.velocityX = 0;
  buildingsGroup.setVelocityXEach(0);
  buildingsGroup.setLifetimeEach(-1);
  planeGroup.setVelocityXEach(0);
  fighterbulletGroup.setVelocityXEach(0);
  enemybulletGroup.setVelocityXEach(0);
  fighterbulletGroup.setLifetimeEach(-1);
  enemybulletGroup.setLifetimeEach(-1);
  planeGroup.setLifetimeEach(-1);
  if(keyWentDown("R")){
    gameState = "play";
    planeGroup.destroyEach();
    buildingsGroup.destroyEach();
    BackGround.velocityX = -10;
    enemybulletGroup.destroyEach();
    bombGroup.destroyEach();
    fighterbulletGroup.destroyEach();
    buildingsdestroyed = 0;
    enemieskilled = 0;
    fighterPlane.visible = true;
  }
 }

 drawSprites();

 if(gameState === "end"){
  textSize(70);
  fill(0, 255, 221);
  text("GAME OVER", windowWidth/2 - 200 , windowHeight/2);
  textSize(20);
  text("Press R To Restart", windowWidth/2 - 80, windowHeight/2 + 40);
 }

 textSize(20);
 fill("white");
 text("Buildings Destroyed: " + buildingsdestroyed, windowWidth/2-400, 30);
 text("Enemies Killed: " + enemieskilled,  windowWidth/2+200, 30);
}

function spawnBuildings(){
  if(frameCount%120 === 0){
    building = createSprite(windowWidth, windowHeight-100, 200, 200);
    building.velocityX = -10;
    var rand = Math.round(random(1, 4));
    console.log(rand);
    switch(rand){
      case 1: building.addImage(building1);
      break;
      case 2: building.addImage(building2);
      break;
      case 3: building.addImage(building3);
      break;
      case 4: building.addImage(building4);
      break;
      default : break;
    }
    building.lifetime = 200;
    buildingsGroup.add(building); 
  }
}

function spawnEnemies(){
  if(frameCount%60 === 0){
      enemy = createSprite(windowWidth, random(40, 150), 20, 20);
      enemy.addImage(enemyImg);
      enemy.scale = 0.6;
      createEnemyBullet(enemy.x, enemy.y);
      enemy.setCollider("rectangle", 0, 0, 200, 200)
      enemy.velocityX = -6;
      enemy.lifetime = 300;
      planeGroup.add(enemy);
  }
}

function createEnemyBullet(x, y){
 if(frameCount%10 == 0){   
  bullet2 = createSprite(100, 20, 15, 4);
  bullet2.addImage(bulletImg);
  bullet2.scale = 0.04;
  bullet2.velocityX = -35;
  bullet2.lifetime = 100;
  bullet2.x = x;
  bullet2.y = y;
  bulletSound.play();
  enemybulletGroup.add(bullet2);
 } 
}