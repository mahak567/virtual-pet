var feed;
var addFood;
var foodObj,foodS;
var dog,happyDog,sadDog;
var feedTime;
var lastFed;
var petName;
var input;
var changeName;
function preload(){
happyDog=loadImage("images/happy dog.png")
sadDog=loadImage("images/Dog.png")
}
function setup(){
  createCanvas(1000,400)
  database=firebase.database();
  foodObj=new Food();
  dog = createSprite(800,200)
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  input=createInput();
  changeName=createButton("new name");
  input.position(700,150);
  changeName.position(570,150)
  changeName.mousePressed(updateName);
  database.ref("petName").on("value", function(data){
    petName = data.val();
   });
}
function draw(){
  background("green")
  foodObj.display()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text(petName+" Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text(petName+" Last Feed : 12 AM",350,30);
   }else{
     text(petName+" Last Feed : "+ lastFed + " AM", 350,30);
   }
drawSprites();
}
function feedDog(){
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){

  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function updateName(){
    database.ref('/').update({
      petName:input.value()
    })


    

}