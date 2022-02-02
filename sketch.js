var runner,runnerimg,ground,groundimg,runnerjump,runnerslide,invis,low,high,lowexplode,lowimg,highimg,restart;


function preload()
{
  runnerimg = loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png");
  groundimg = loadImage("ground.png");
  runnerjump = loadAnimation("Jump__000.png","Jump__001.png","Jump__002.png","Jump__003.png","Jump__004.png","Jump__005.png","Jump__006.png","Jump__007.png","Jump__008.png","Jump__009.png")
  runnerslide = loadAnimation("Slide__000.png","Slide__001.png","Slide__002.png","Slide__003.png","Slide__004.png","Slide__005.png","Slide__006.png","Slide__007.png","Slide__008.png","Slide__009.png")
  lowimg = loadImage("spike.png")
  lowGroup = new Group();
  lowGroup.add(low)
}

function setup() 
{
  createCanvas(600,600)
  runner = createSprite(100,465)
  runner.addAnimation("runner",runnerimg)
  runner.scale=0.275;
  ground = createSprite(300,555)
  ground.addImage("ground",groundimg)
  ground.scale=0.5;
  runner.addAnimation("jump",runnerjump)
  runner.addAnimation("slide",runnerslide)
  invis = createSprite(100,525,100000000,1)
  low = createSprite(620,500)
  low.addImage("bomb",lowimg)
  low.velocityX=-3;
  low.scale=0.05;
}

function draw() 
{
 background(200);
 low.setCollider("rectangle",0,0,65,65,0)
 runner.setCollider("rectangle",0,0,200,400,0)
 frameRate(50);
 ground.velocityX=-2;
 if(ground.x<90)
 {
     ground.x=500;
 }
 console.log(runner.y)
 if(keyDown("space")||keyDown(UP_ARROW))
 {
     runner.changeAnimation("jump");
 }else{
     runner.changeAnimation("runner")
 }
 if(keyDown(DOWN_ARROW))
 {
     runner.changeAnimation("slide");
 }else{
     runner.changeAnimation("runner")
 }
 if(keyDown("space")&&runner.y>=450||keyDown(UP_ARROW)&&runner.y>=450)
 {
     runner.velocityY=-8;
 }
 if(runner.y<=465)
 {
     runner.changeAnimation("jump")
 }
 if(low.isTouching(runner))
 {
     ground.velocityX=0;
     lowGroup.setVelocityXEach(0)
     low.velocityX=0;
     textFont("Impact");
     fill("yellow");
     stroke("red");
     textSize(50)
     strokeWeight(5)
     textAlign(CENTER)
     text("Game Over!",300,300)
     allSprites.destroy();
     
 }else
 {
     low.changeAnimation("bomb")
 }
 runner.velocityY=runner.velocityY+0.3;
 ground.depth=runner.depth;
 runner.depth=runner.depth+1;
 runner.collide(invis);
 bomb();
 drawSprites();
}

function bomb()
{
    if(frameCount%Math.round(random(100,350))===0)
    {

  low = createSprite(620,500)
  low.addAnimation("explode",lowexplode);
  low.addImage("bomb",lowimg);
  low.scale=0.05;
  low.velocityX=-3;
    }
}

function reload()
{
    window.location.reload()
}

document.title="Jump!"