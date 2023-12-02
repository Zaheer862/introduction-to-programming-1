/*

The Game Project LEVEL 6


Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var character = {
  velocity: {
	
    y: 2
  }
};
var GRAVITY = 1;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var isJumping;
var canyons 

var isGameOver;
var controls_active ;
var mountains;
var collectables 
var game_score;
var flagpole;
var lives;

function setup()
{
createCanvas(1524, 576);
backgroundX = 0;
floorPos_y = height * 3/4;
lives = 3;
startGame();
function startGame(){
gameChar_x = width/2 ;
gameChar_y = floorPos_y;

let isLeft = false;
let isRight = false;
let isPlummeting = false;
let isFalling = false;
let isJumping = false;
let controls_active = true;
game_score = 0;
canyons = [
{x_pos: 1000, width: 50, height: floorPos_y + 500},
{x_pos: 200, width: 50, height: floorPos_y + 500},
{x_pos: 700, width: 50, height: floorPos_y + 500},
// Add more canyons as needed
];
collectables= [
{x_pos: 600, y_pos: floorPos_y - 30, size: 50, isFound: false},
{x_pos: 800, y_pos: floorPos_y - 30, size: 50, isFound: false},
{x_pos: 1000, y_pos: floorPos_y - 30, size: 50, isFound: false},
// Add more collectables as needed
];
isOvercanyons = false;
isGameOver = false;

mountains  = [
{x_pos: 800, width: 100, height: 300},
{x_pos: 600, width: 120, height: 220},
{x_pos: 400, width: 100, height: 400},
{x_pos: 200, width: 100, height: 300},
{x_pos: 100, width: 50, height: 100},
{x_pos: 1000, width: 70, height: 200},
{x_pos: 1200, width: 120, height: 400},
{x_pos: 1400, width: 100, height: 250},
{x_pos: 1600, width: 60, height: 100},
// Add more mountains as needed
];


trees = [
{x_pos: 500, height: 200, trunkWidth: 30, width: 50}, // Tree between the mountains
{x_pos: 900, height: 150, trunkWidth: 20, width: 40}, // Tree on the side
{x_pos: 300, height: 180, trunkWidth: 25, width: 45}, // Additional tree
{x_pos: 700, height: 160, trunkWidth: 28, width: 48}, // Additional tree
{x_pos: 1100, height: 170, trunkWidth: 27, width: 47}, // Additional tree
{x_pos: 1300, height: 190, trunkWidth: 29, width: 49},// Add more trees as needed
];
}

flagpole = {x_pos: width * 3, isReached: false};


}
function draw()
  {
///////////DRAWING CODE//////////

background(100,155,255); //fill the sky blue

noStroke();
fill(0,155,0);
rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
for (let x = 0; x < width; x += width) {
    rect((x - gameChar_x) % width, floorPos_y, width, height - floorPos_y);
}

fill(255);
text("Score: " + game_score, 20, 20);


    if (gameChar_y < floorPos_y) {
  gameChar_y += 2; // adjust the value to make the character fall at the speed you want
  isFalling = true;
} 
else {
  isFalling = false;
}




//draw the canyons
  drawcanyons();
for(let i = 0; i < width; i+= width/3){
drawMountains(i);  
}
for(let i = 0; i < width; i+=width/2) {
drawClouds(i); 
}
drawTrees();

for(let i = 0; i < collectables.length; i++) {
  if (!collectables[i].isFound)

  {drawcollectables(collectables[i]);
  checkcollectables(collectables[i]);};
}
for(let i = 0; i < canyons.length; i++) {
  drawcanyons(canyons[i]);
  checkcanyons(canyons[i]);
}
renderFlagpole();

if (gameChar_y < floorPos_y) {
  if (isOvercanyons) {
    isPlummeting = true;
  } 
  else {
    gameChar_y += 2; // adjust the value to make the character fall at the speed you want
    isFalling = true;
  }
} 
else {
  isFalling = false;
}

if (!flagpole.isReached)
{
    checkFlagpole();
}
for (let i = 0; i <= 144; i++) {
  let gradient = lerpColor(color(80, 50, 20), color(110, 70, 30), i / 144);
  stroke(gradient);
  line(200, 432 + i, 308, 432 + i);
}
checkPlayerDie();
for (var i = 0; i < lives; i++)
{
    fill(255, 0, 0); // Red color
    ellipse( 100 + i * 40, 20, 30); // Draw a circle for each life
}
if (lives < 1)
{
    fill(255);
    textSize(25);
    text("Game over. Press space to continue.", width / 2, height / 2);
    return;
}

if (flagpole.isReached)
{
    fill(255);
    textSize(25);
    text("Level complete. Press space to continue.", width / 2, height / 2);
    return;
}

// check if the character is on or above the canyons
if (gameChar_x > canyons.x_pos && gameChar_x < canyons.x_pos + canyons.width) {
if (gameChar_y >= floorPos_y) {
  // if the character is on the floor, check if they are over the canyons
  if (gameChar_x - canyons.x_pos < 20 || canyons.x_pos + canyons.width - gameChar_x < 20) {
  // if the character is over the canyons, set the plummeting flag to true
  isPlummeting = true;
  }
} 
else {
  // if the character is in the air, set the plummeting flag to true
  isPlummeting = true;
}
if (gameChar_y >= height - 50 && gameChar_x >= canyons.x_pos && gameChar_x <= canyons.x_pos + canyons.width) {
      fill(0);
      textSize(32);
      text("Game over!", 100, height / 2);
    }

  

  }

// if the plummeting flag is true, make the character fall
if (isPlummeting) {
gameChar_y += 2;
isFalling = true;
}


//the game character
stroke(0)
if(isLeft && isFalling)
{
// add your jumping-left code
fill(255, 255, 0); // yellow
ellipse(gameChar_x, gameChar_y - 60, 30, 30); // head
fill(0, 0, 255); // blue
rect(gameChar_x - 15, gameChar_y - 40, 30, 40); // body
fill(255, 0, 0); // red
rect(gameChar_x - 20, gameChar_y - 30, 5, 15); // left hand
rect(gameChar_x + 10, gameChar_y - 30, 5, 15); // right hand
rect(gameChar_x - 15, gameChar_y, 5, 15); // left leg
rect(gameChar_x + 5, gameChar_y, 5, 15); // right leg
// fingers
for(let i = 0; i < 5; i++) {
    line(gameChar_x - 20, gameChar_y - 30 + i * 3, gameChar_x - 25, gameChar_y - 30 + i * 3); // left hand fingers
    line(gameChar_x + 15, gameChar_y - 30 + i * 3, gameChar_x + 20, gameChar_y - 30 + i * 3); // right hand fingers
}
// feet
triangle(gameChar_x - 15, gameChar_y + 15, gameChar_x - 20, gameChar_y + 20, gameChar_x - 10, gameChar_y + 20); // left foot
triangle(gameChar_x + 10, gameChar_y + 15, gameChar_x + 5, gameChar_y + 20, gameChar_x + 15, gameChar_y + 20); // right foot
}
else if(isRight && isFalling)
{
// add your jumping-right code
fill(255, 255, 0); // yellow
ellipse(gameChar_x, gameChar_y - 60, 30, 30); // head
fill(0, 0, 255); // blue
rect(gameChar_x - 15, gameChar_y - 40, 30, 40); // body
fill(255, 0, 0); // red
rect(gameChar_x - 15, gameChar_y - 30, 5, 15); // left hand
rect(gameChar_x + 5, gameChar_y - 30, 5, 15); // right hand
rect(gameChar_x - 10, gameChar_y, 5, 15); // left leg
rect(gameChar_x, gameChar_y, 5, 15); // right leg
// fingers
for(let i = 0; i < 5; i++) {
    line(gameChar_x - 15, gameChar_y - 30 + i * 3, gameChar_x - 20, gameChar_y - 30 + i * 3); // left hand fingers
    line(gameChar_x + 10, gameChar_y - 30 + i * 3, gameChar_x + 15, gameChar_y - 30 + i * 3); // right hand fingers
}
// feet
triangle(gameChar_x - 10, gameChar_y + 15, gameChar_x - 15, gameChar_y + 20, gameChar_x - 5, gameChar_y + 20); // left foot
triangle(gameChar_x, gameChar_y + 15, gameChar_x - 5, gameChar_y + 20, gameChar_x + 5, gameChar_y + 20); // right foot
}
else if(isLeft)
{
  // add your walking left code
  fill(255, 255, 0); // yellow
  ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
  fill(0, 0, 255); // blue
  rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
  fill(255, 0, 0); // red
  rect(gameChar_x - 15, gameChar_y, 5, 15); // left leg
  rect(gameChar_x - 5, gameChar_y, 5, 15); // right leg
  // Hands
  fill(255, 0, 0); // red
  rect(gameChar_x - 20, gameChar_y - 30, 5, 15); // left hand
  rect(gameChar_x - 5, gameChar_y - 30, 5, 15); // right hand
  // Feet
  triangle(gameChar_x - 15, gameChar_y + 15, gameChar_x - 20, gameChar_y + 20, gameChar_x - 10, gameChar_y + 20); // left foot
  triangle(gameChar_x, gameChar_y + 15, gameChar_x - 5, gameChar_y + 20, gameChar_x + 5, gameChar_y + 20); // right foot
}
else if(isRight)
{
  // add your walking right code
  fill(255, 255, 0); // yellow
  ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
  fill(0, 0, 255); // blue
  rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
  fill(255, 0, 0); // red
  rect(gameChar_x - 10, gameChar_y, 5, 15); // left leg
  rect(gameChar_x, gameChar_y, 5, 15); // right leg
  // Hands
  fill(255, 0, 0); // red
  rect(gameChar_x - 15, gameChar_y - 30, 5, 15); // left hand
  rect(gameChar_x, gameChar_y - 30, 5, 15); // right hand
  // Feet
  triangle(gameChar_x - 10, gameChar_y + 15, gameChar_x - 15, gameChar_y + 20, gameChar_x - 5, gameChar_y + 20); // left foot
  triangle(gameChar_x + 5, gameChar_y + 15, gameChar_x, gameChar_y + 20, gameChar_x + 10, gameChar_y + 20); // right foot
}
else if(isFalling || isPlummeting)
{
  // add your jumping facing forwards code
  fill(255, 255, 0); // yellow
  ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
  fill(0, 0, 255); // blue
  rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
  fill(255, 0, 0); // red
  rect(gameChar_x - 10, gameChar_y, 5, 15); // left leg
  rect(gameChar_x, gameChar_y, 5, 15); // right leg
  // Hands
  fill(255, 0, 0); // red
  rect(gameChar_x - 15, gameChar_y - 30, 5, 15); // left hand
  rect(gameChar_x, gameChar_y - 30, 5, 15); // right hand
  // Feet
  triangle(gameChar_x - 10, gameChar_y + 15, gameChar_x - 15, gameChar_y + 20, gameChar_x - 5, gameChar_y + 20); // left foot
  triangle(gameChar_x + 5, gameChar_y + 15, gameChar_x, gameChar_y + 20, gameChar_x + 10, gameChar_y + 20); // right foot
}
else
{
// add your standing front facing code
fill(255, 255, 0); // yellow
ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
fill(0, 0, 255); // blue
rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
fill(255, 0, 0); // red
rect(gameChar_x - 10, gameChar_y, 5, 15); // left leg
rect(gameChar_x, gameChar_y, 5, 15); // right leg
// Hands
fill(255, 0, 0); // red
rect(gameChar_x - 15, gameChar_y - 30, 5, 15); // left hand
rect(gameChar_x, gameChar_y - 30, 5, 15); // right hand
// Feet
triangle(gameChar_x - 10, gameChar_y + 15, gameChar_x - 15, gameChar_y + 20, gameChar_x - 5, gameChar_y + 20); // left foot
triangle(gameChar_x + 5, gameChar_y + 15, gameChar_x, gameChar_y + 20, gameChar_x + 10, gameChar_y + 20); // right foot
}


///////////INTERACTION CODE//////////
//Put conditional statements to move the game character below here
if (isLeft) {
  gameChar_x -= 5;
}

if (isRight) {
  gameChar_x += 5;
}
gameChar_x = gameChar_x % width;
if(gameChar_x > width) {
  gameChar_x = 0;
  }

if(isJumping) {
  gameChar_y -= 5; // Character goes up
  
  if(gameChar_y < floorPos_y) {
    isFalling = true; // Start falling
  } 
  else {
    isJumping = false; // Landed
  }
  
} 
else if(isFalling) {
  gameChar_y += 2; // Fall down
  
  if(gameChar_y >= floorPos_y) {
    isFalling = false; // Landed
  }
}

  // check if the character has successfully jumped over the canyons
  if(gameChar_x > canyons.x_pos && gameChar_x < canyons.x_pos + canyons.width)
  {
      if(gameChar_y >= floorPos_y && gameChar_y < floorPos_y + 10)
      {
          if(!isJumping && !isFalling)
          {
              fill(0);
              textSize(32);
              text("Game over!", 100, height / 2);
          }
      }
      else if(gameChar_y < floorPos_y && gameChar_y > floorPos_y - 100)
      {
          if(gameChar_x - canyons.x_pos > 20 && canyons.x_pos + canyons.width - gameChar_x > 20)
          {
              isJumping = true;
              gameChar_y -= 5;
          }
      }
  }
  if (abs(gameChar_x - flagpole.x_pos) < 5)
{
  flagpole.isReached = true;
}
  
}


function keyPressed() {
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);

  if (keyCode === 65) { // 'a' key
      console.log("left key");
      isLeft = true;
  } 
  else if (keyCode === 68) { // 'd' key
      console.log("right key");
      isRight = true;
  } 
  else if (keyCode === 32) { // spacebar
      if (!isFalling && !isPlummeting) {
          character.position.y -= 500;  // Adjust this value as needed
          isJumping = true;
      }
  
  }

  if (isPlummeting) {
      character.position.y += character.velocity.y;
      character.velocity.y += GRAVITY;
      if (character.position.y > height) {
          noLoop();
          console.log("Game over");
      }
  } 
  else {
      if (keyCode === 65) { // 'a' key
          character.isLeft();
      } 
      else if (keyCode === 68) { // 'd' key
          isRight();
      }
  }
}

function keyReleased() {
  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);

  if (keyCode === 32 && !isFalling) {
      gameChar_y -= 300;
  } 
  else if (keyCode === 65) { // 'a' key
      console.log("left key");
      isLeft = false;
  } 
  else if (keyCode === 68) { // 'd' key
      console.log("right key");
      isRight = false;
  }
}



function drawcollectables(t_collectables) {
  if(t_collectables.isFound == false) {
  fill(255, 215, 0); //yellow color for the collectible
  ellipse(t_collectables.x_pos, t_collectables.y_pos , t_collectables.size);
  fill(255,0,255);
  stroke(255);
  strokeWeight(1);
  quad( t_collectables.x_pos -5, t_collectables.y_pos -40,
        t_collectables.x_pos -10, t_collectables.y_pos -55,
        t_collectables.x_pos +10, t_collectables.y_pos -55,
        t_collectables.x_pos +5, t_collectables.y_pos -40);
  }

}
function checkcollectables(t_collectables) {
if (dist(gameChar_x, gameChar_y, t_collectables.x_pos, t_collectables.y_pos) < 50) 
{
  t_collectables.isFound = true;
  game_score += 1;
}
}

function drawClouds() {
  // This is a simple cloud drawing function. You might want to customize it.
  fill(255);
  for(let i = 0; i < 5; i++) {
  let x = 100 + i * 200; // Adjust the starting position and interval as needed
  ellipse(x, 100, 50, 50);
  ellipse(x + 50, 100, 50, 50);
  ellipse(x + 25, 75, 50, 50);
  }
}

function drawMountains() {
  for(let i = 0; i < mountains.length; i++) {
    fill(160, 160, 160);
    triangle(mountains[i].x_pos - gameChar_x, floorPos_y, 
        mountains[i].x_pos + mountains[i].width * 2 - gameChar_x, // Increase the width of the mountains
        floorPos_y,
        mountains[i].x_pos + mountains[i].width * 1.5 / 2 - gameChar_x, // Adjust the peak of the mountain
        floorPos_y - mountains[i].height);

    // If the mountain is off the left edge of the screen
    if (mountains[i].x_pos - gameChar_x < -mountains[i].width * 2) {
      // Move it to the right edge of the screen
      mountains[i].x_pos += width;
    }

    // If the mountain is off the right edge of the screen
    if (mountains[i].x_pos - gameChar_x > width) {
      // Move it to the left edge of the screen
      mountains[i].x_pos -= width;
    }
  }
}


function drawTrees() {
  for(let i = 0; i < trees.length; i++) {
    // Draw the trunk
    fill(120, 60, 30);
    rect(trees[i].x_pos - gameChar_x, floorPos_y - trees[i].height, 
      trees[i].trunkWidth, trees[i].height);

    // Calculate the size of the triangles
    let foliageWidth = trees[i].trunkWidth * 8; // Increase the size of the triangles

    // Draw the lower triangle
    fill(0, 220, 20);
    triangle(trees[i].x_pos + trees[i].trunkWidth/2 - foliageWidth/3 - gameChar_x, floorPos_y - trees[i].height, // Increase the size of the lower triangle
        trees[i].x_pos + trees[i].trunkWidth/2 + foliageWidth/3 - gameChar_x, floorPos_y - trees[i].height, 
        trees[i].x_pos + trees[i].trunkWidth/2 - gameChar_x, floorPos_y - trees[i].height - foliageWidth/3);

    // Draw the upper triangle
    fill(0, 220, 20);
    triangle(trees[i].x_pos + trees[i].trunkWidth/2 - foliageWidth/4 - gameChar_x, floorPos_y - trees[i].height - foliageWidth/4, // Lower the position and increase the size of the upper triangle
        trees[i].x_pos + trees[i].trunkWidth/2 + foliageWidth/4 - gameChar_x, floorPos_y - trees[i].height - foliageWidth/4, 
        trees[i].x_pos + trees[i].trunkWidth/2 - gameChar_x, floorPos_y - trees[i].height - foliageWidth);

    // If the tree is off the left edge of the screen
    if (trees[i].x_pos - gameChar_x < -trees[i].trunkWidth) {
      // Move it to the right edge of the screen
      trees[i].x_pos += width;
    }

    // If the tree is off the right edge of the screen
    if (trees[i].x_pos - gameChar_x > width) {
      // Move it to the left edge of the screen
      trees[i].x_pos -= width;
    }
  }
}

function drawcanyons() {
for(let i = 0; i < canyons.length; i++) {
  fill(80, 50, 20);
  rect(canyons[i].x_pos, 432, canyons[i].width, 144);
  fill(110, 70, 30);
  rect(canyons[i].x_pos + canyons[i].width / 2 - 25, 432, 50, 144);
}
}

function checkcanyons(t_canyons) {
if (gameChar_x > t_canyons.x_pos && gameChar_x < t_canyons.x_pos + t_canyons.width && gameChar_y >= floorPos_y) {
  isPlummeting = true;
}
}
function renderFlagpole()
{
  push();
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 300); // Draw the pole

  if (flagpole.isReached)
  {
      fill(255, 0, 0); // Red flag when reached
  }
  else
  {
      fill(0, 255, 0); // Green flag when not reached
  }

  noStroke();
  rect(flagpole.x_pos, floorPos_y - 300 , 50, 30); // Draw the flag
  pop();
}
function checkFlagpole()
{
  var d = abs(gameChar_x - flagpole.x_pos);
  if(d < 10)
  {
      flagpole.isReached = true;
  }
}
function checkPlayerDie()
{
  if (gameChar_y > height)
  {
      lives -= 1;
      if (lives > 0)
      {
          startGame();
      }
      else
      {
          console.log("Game Over");
          // Here you can add any other code you want to execute when the game is over
      }
  }
}

