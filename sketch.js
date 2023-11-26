/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var character = {
  velocity: {
	
    y: 0
  }
};
var GRAVITY = 0.5;
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

  canyons = [
  {x_pos: 1000, width: 50, height: floorPos_y + 500},
  {x_pos: 200, width: 100, height: floorPos_y + 500},
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
  // Add more mountains as needed
];

  
trees = [
  {x_pos: 500, height: 200, trunkWidth: 30, width: 50}, // Tree between the mountains
  {x_pos: 900, height: 150, trunkWidth: 20, width: 40}, // Tree on the side
  // Add more trees as needed
	];
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

  
 
  
  //draw the canyons
  	drawcanyons();
	drawMountains();
	drawClouds();
	drawTrees();
	
  for(let i = 0; i < collectables.length; i++) {
    drawcollectables(collectables[i]);
    checkcollectables(collectables[i]);
  }
  for(let i = 0; i < canyons.length; i++) {
    drawcanyons(canyons[i]);
    checkcanyons(canyons[i]);
  }
	
  if (gameChar_y < floorPos_y) {
    if (isOvercanyons) {
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
    
}

function keyPressed() {
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if (keyCode === 65) { // 'a' key
        console.log("left key");
        isLeft = true;
    } else if (keyCode === 68) { // 'd' key
        console.log("right key");
        isRight = true;
    } else if (keyCode === 32) { // spacebar
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
    } else {
        if (keyCode === 65) { // 'a' key
            character.isLeft();
        } else if (keyCode === 68) { // 'd' key
            isRight();
        }
    }
}

function keyReleased() {
    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (keyCode === 32 && !isFalling) {
        gameChar_y -= 100;
    } else if (keyCode === 65) { // 'a' key
        console.log("left key");
        isLeft = false;
    } else if (keyCode === 68) { // 'd' key
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
  if (dist(gameChar_x, gameChar_y, t_collectables.x_pos, t_collectables.y_pos) < 50) {
    t_collectables.isFound = true;
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
    triangle(mountains[i].x_pos, floorPos_y, 
             mountains[i].x_pos + mountains[i].width * 2, // Increase the width of the mountains
             floorPos_y,
             mountains[i].x_pos + mountains[i].width * 1.5 / 2, // Adjust the peak of the mountain
             floorPos_y - mountains[i].height);
  }
}


	function drawTrees() {
  for(let i = 0; i < trees.length; i++) {
    // Draw the trunk
    fill(120, 60, 30);
    rect(trees[i].x_pos, floorPos_y - trees[i].height, 
         trees[i].trunkWidth, trees[i].height);

    // Calculate the size of the triangles
    let foliageWidth = trees[i].trunkWidth * 8; // Increase the size of the triangles

    // Draw the lower triangle
    fill(0, 220, 20);
    triangle(trees[i].x_pos + trees[i].trunkWidth/2 - foliageWidth/3, floorPos_y - trees[i].height, // Increase the size of the lower triangle
             trees[i].x_pos + trees[i].trunkWidth/2 + foliageWidth/3, floorPos_y - trees[i].height, 
             trees[i].x_pos + trees[i].trunkWidth/2, floorPos_y - trees[i].height - foliageWidth/3);

    // Draw the upper triangle
    fill(0, 220, 20);
    triangle(trees[i].x_pos + trees[i].trunkWidth/2 - foliageWidth/4, floorPos_y - trees[i].height - foliageWidth/4, // Lower the position and increase the size of the upper triangle
             trees[i].x_pos + trees[i].trunkWidth/2 + foliageWidth/4, floorPos_y - trees[i].height - foliageWidth/4, 
             trees[i].x_pos + trees[i].trunkWidth/2, floorPos_y - trees[i].height - foliageWidth);
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
