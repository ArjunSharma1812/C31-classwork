const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var backgroundImg, melonImg, rabbitImg;
var bunny;
var button;
var blink, sad, eat;

function preload(){
  backgroundImg = loadImage("./Imgs/background.png");
  melonImg = loadImage("./Imgs/melon.png");
  rabbitImg = loadImage("./Imgs/Rabbit-01.png");
  blink = loadAnimation("./Imgs/blink_1.png", "./Imgs/blink_2.png", "./Imgs/blink_3.png");
  eat = loadAnimation("./Imgs/eat_0.png", "./Imgs/eat_1.png", "./Imgs/eat_2.png", "./Imgs/eat_3.png",  "./Imgs/eat_4.png");
  sad = loadAnimation("./Imgs/sad_1.png", "./Imgs/sad_2.png", "./Imgs/sad_3.png");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(7, {x: 250, y:30});
  var fruit_options = {
    isStatic: false,
    density:0.001,
  }
  fruit = Bodies.circle(300, 300, 15, fruit_options);

  Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny = createSprite(width/2, height-50, 100, 100);
 // bunny.addImage(rabbitImg);
  bunny.scale = 0.2;
  bunny.addAnimation("blink",blink);
  bunny.addAnimation("eat",eat);
  bunny.addAnimation("sad", sad);
  bunny.changeAnimation("blink");

  button = createImg("./Imgs/cut_btn.png");
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, width, height);
  if(fruit != null){
  image(melonImg, fruit.position.x, fruit.position.y, 70, 70);
  }
  
  ground.show();
  rope.show();

  if(collide(fruit, bunny) == true){
     bunny.changeAnimation("eat");
  }
  if(collide(fruit, ground.body)== true){
    bunny.changeAnimation("sad")
  }

  
  Engine.update(engine);
  

 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;

}

function collide(body, sprite){
  if(body != null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    //console.log(d);
    if(d <= 80){
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else{
     return false;
    }
  }
}