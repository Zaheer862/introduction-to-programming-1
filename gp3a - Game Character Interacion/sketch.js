/*

The Game Project part 5 multiple interactables

Week 

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var isJumping;
var collectable;
var isFalling;
var canyon;
var isOverCanyon;
var isGameOver;
var controls_active ;

function setup()
{
  createCanvas(1024, 576);
  floorPos_y = height * 3/4;
  gameChar_x = width/2 ;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;
  isJumping = false;
  controls_active = true;

  canyon = {
    x_pos: 200,
    width: 100,
    height: floorPos_y + 500
  };
  collectable = {
    x_pos: 400,
    y_pos: floorPos_y - 30 ,
    size: 50,
    isFound : false
  };
  isOverCanyon = false;
  isGameOver = false;

}

function draw()
{
  ///////////DRAWING CODE//////////

  background(100,155,255); //fill the sky blue

  noStroke();
  fill(0,155,0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  if (gameChar_y < floorPos_y) {
    gameChar_y += 5; // adjust the value to make the character fall at the speed you want
    isFalling = true;
  } else {
    isFalling = false;
  }

  if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
    collectable.isFound = true;
  }

  if(collectable.isFound == false) {
    fill(255, 215, 0); //yellow color for the collectible
    ellipse(collectable.x_pos, collectable.y_pos , collectable.size, collectable.size );
  }

  
  //draw the canyon
  fill(80, 50, 20);
  rect(canyon.x_pos, 432, canyon.width, 144);
  fill(110, 70, 30);
  rect(canyon.x_pos + canyon.width / 2 - 25, 432, 50, 144);
  

  if (gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y < floorPos_y) {
    isOverCanyon = true;
  }
  if (gameChar_y < floorPos_y) {
    if (isOverCanyon) {
      isPlummeting = true;
    } else {
      gameChar_y += 5; // adjust the value to make the character fall at the speed you want
      isFalling = true;
    }
  } else {
    isFalling = false;
  }

	for (let i = 0; i <= 144; i++) {
		let gradient = lerpColor(color(80, 50, 20), color(110, 70, 30), i / 144);
		stroke(gradient);
		line(200, 432 + i, 308, 432 + i);
	}
	// check if the character is on or above the canyon
	if (gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width) {
	if (gameChar_y >= floorPos_y) {
	  // if the character is on the floor, check if they are over the canyon
	  if (gameChar_x - canyon.x_pos < 20 || canyon.x_pos + canyon.width - gameChar_x < 20) {
		// if the character is over the canyon, set the plummeting flag to true
		isPlummeting = true;
	  }
	} 
	else {
	  // if the character is in the air, set the plummeting flag to true
	  isPlummeting = true;
	}
	if (gameChar_y >= height - 50 && gameChar_x >= canyon.x_pos && gameChar_x <= canyon.x_pos + canyon.width) {
        fill(0);
        textSize(32);
        text("Game over!", 100, height / 2);
    }
	
	  

  	}
  
  // if the plummeting flag is true, make the character fall
  if (isPlummeting) {
	gameChar_y += 5;
	isFalling = true;
  }
  

	//the game character
	stroke(0)
	if(isLeft && isFalling)
	{
	// add your jumping-left code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	line(gameChar_x - 10, gameChar_y - 15, gameChar_x - 20, gameChar_y - 30); // arms
	line(gameChar_x + 5, gameChar_y - 15, gameChar_x - 5, gameChar_y - 30);
	rect(gameChar_x - 10, gameChar_y, 10, 20); // left leg
	rect(gameChar_x, gameChar_y, 10, 20); // right leg

	}
	else if(isRight && isFalling)
	{
	// add your jumping-right code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	line(gameChar_x + 10, gameChar_y - 15, gameChar_x + 20, gameChar_y - 30); // arms
	line(gameChar_x - 5, gameChar_y - 15, gameChar_x + 5, gameChar_y - 30);
	rect(gameChar_x - 10, gameChar_y, 10, 20); // left leg
	rect(gameChar_x, gameChar_y, 10, 20); // right leg

	}
	else if(isLeft)
	{
		// add your walking left code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	line(gameChar_x - 10, gameChar_y - 15, gameChar_x - 20, gameChar_y - 30); // left arm
	rect(gameChar_x - 10, gameChar_y, 10, 20); // left leg
	line(gameChar_x, gameChar_y + 20, gameChar_x - 10, gameChar_y + 40); // left foot
	line(gameChar_x - 10, gameChar_y + 30, gameChar_x - 5, gameChar_y + 40); // left foot detail
	line(gameChar_x, gameChar_y + 20, gameChar_x + 10, gameChar_y + 40); // right foot
	line(gameChar_x + 10, gameChar_y + 30, gameChar_x + 5, gameChar_y + 40); // right foot detail

	}
	else if(isRight)
	{
		// add your walking right code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	line(gameChar_x - 10, gameChar_y - 15, gameChar_x - 20, gameChar_y - 30); // arms
	line(gameChar_x + 5, gameChar_y - 15, gameChar_x - 5, gameChar_y - 30);
	rect(gameChar_x - 10, gameChar_y, 10, 20); // left leg
	rect(gameChar_x, gameChar_y, 10, 20); // right leg
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	line(gameChar_x - 10, gameChar_y - 15, gameChar_x - 20, gameChar_y - 30); // arms
	line(gameChar_x + 10, gameChar_y - 15, gameChar_x + 20, gameChar_y - 30);
	line(gameChar_x - 5, gameChar_y - 15, gameChar_x - 5, gameChar_y + 10); // body detail
	line(gameChar_x + 5, gameChar_y - 15, gameChar_x + 5, gameChar_y + 10);
	}
	else
	{
		// add your standing front facing code
	fill(255, 255, 0); // yellow
	ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
	rect(gameChar_x - 10, gameChar_y - 30, 20, 30); // body
	rect(gameChar_x - 10, gameChar_y, 20, 30); // legs


	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isLeft) {
		gameChar_x -= 5;
	}

	if (isRight) {
		gameChar_x += 5;
	}

	if (gameChar_y < floorPos_y) {
		isJumping = false;
		gameChar_y += 5;
	} else {
		isFalling = false;
		isJumping = false;
	}
	
    // check if the character has successfully jumped over the canyon
    if(gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width)
    {
        if(gameChar_y >= floorPos_y && gameChar_y < floorPos_y + 20)
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
            if(gameChar_x - canyon.x_pos > 20 && canyon.x_pos + canyon.width - gameChar_x > 20)
            {
                isJumping = true;
                gameChar_y -= 5;
            }
        }
    }
    
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
	

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
	
	if(keyCode == 37)
		{
			console.log ("left arrow");
			isLeft = true;
		
		}
	else if (keyCode == 39)
		{
			console.log("right arrow");
			isRight = true;
		}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if (keyCode === 32 && !isFalling) {
		gameChar_y -= 100;
		jumpSound.play();
	  }
	
	else if(keyCode == 37)
		{
			console.log ("left arrow");
			isLeft = false;
		
		}
	else if (keyCode == 39)
		{
			console.log("right arrow");
			isRight = false;
		}
		function keyPressed() {
			if (keyCode === 32) { // spacebar
			  if (!isPlummeting && character.position.y == height - 50) {
				character.jump();
			  }
			}
			
			// Code to handle falling down the canyon
			if (isPlummeting) {
			  character.position.y += character.velocity.y;
			  character.velocity.y += GRAVITY;
			  if (character.position.y > height) {
				noLoop();
				console.log("Game over");
			  }
			  
			} else {
			  // Code to handle moving left and right
			  if (keyCode === LEFT_ARROW) {
				character.moveLeft();
			  } else if (keyCode === RIGHT_ARROW) {
				character.moveRight();
			  }
			}
		  }
function drawClouds() {
  for(let i = 0; i < clouds.length; i++) {
    fill(255);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size);
  }
}

function drawMountains() {
  for(let i = 0; i < mountains.length; i++) {
    fill(160, 160, 160);
    triangle(mountains[i].x_pos, height, 
             mountains[i].x_pos + mountains[i].width, height,
             mountains[i].x_pos + mountains[i].width / 2, height - mountains[i].height);
  }
}

function drawTrees() {
  for(let i = 0; i < trees.length; i++) {
    fill(120, 60, 30);
    rect(trees[i].x_pos, height - trees[i].height, 
         trees[i].trunkWidth, trees[i].height);
    fill(0, 220, 20);
    triangle(trees[i].x_pos, height - trees[i].height,
             trees[i].x_pos + trees[i].width, height, 
             trees[i].x_pos, height);
  }
}

		  
}

