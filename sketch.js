//Create variables here
var dog, happyDog, database, foodS, foodStack;
var dog1;

function preload() {
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  dog1 = createSprite(250, 250, 5, 5);
  dog1.addImage(dog);

  database = firebase.database();

  foodStack = database.ref('Food');
  foodStack.on("value", readStock);
}



function draw() {
  background(46, 139, 87);
  drawSprites();
  //add styles here
  textSize(10);
  fill("red");
  stroke("black");
  text("Toatal food left:" + foodS, 250, 10);
  text("Note: to feed the dog press - UP_ARROW", 10, 10);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog1.addImage(happyDog);

  }

}

function readStock(data) {

  foodS = data.val();
}


function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })

}

