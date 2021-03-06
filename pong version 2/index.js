/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "E": 69,
    "D": 68,
    "UP": 38,
    "DOWN": 40,
  };
  var BOARD = {
    "X": 0,
    "Y": 0,
    "WIDTH": 440,
    "HEIGHT": 440, 
  };

  // Game Item Objects
  var leftPaddle = MakeGameItem (20, 80, 10, 0, 180, 0, "#leftPaddle");
  var rightPaddle = MakeGameItem (20, 80, 410, 0, 180, 0, "#rightPaddle");
  var ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), "#ball");

  var score1 = 0;
  var score2 = 0;

  $("#player1Score").text(score1);
  $("#player2Score").text(score2);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 f/s)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // handle paddle-wall collisions
    paddleWallCollision();
    // calculate new position of left paddle and redraw left paddle
    repositionGameItem(leftPaddle);
    redrawGameItem(leftPaddle);
    // calculate new position of right paddle and redraw right paddle
    repositionGameItem(rightPaddle);
    redrawGameItem(rightPaddle);
    // handle ball-wall collisions
    bounceBall();
    // handle paddle-ball collisions
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
    // handle player scoring and reset ball
    increasePlayerScore();
    // ends the game if player score is 11
    endGame();
    // redraw and calculate new position of ball
    repositionGameItem(ball);
    redrawGameItem(ball);
  }
  
  // called in response to events
  function handleKeyDown(event) { 
    // move left paddle up 
    if (event.which === KEY.E) {
        leftPaddle.speedY = -5;
    }
    // move left paddle down
    if (event.which === KEY.D) {
        leftPaddle.speedY = 5;
    } 
    // move right paddle up
    if (event.which === KEY.UP) {  
        rightPaddle.speedY = -5;
    }
    // move right paddle down 
    if (event.which === KEY.DOWN) {  
        rightPaddle.speedY = 5;
    }
  }
  // makes paddles stop moving when no keys are held down
  function handleKeyUp(event){
      leftPaddle.speedY = 0;
      rightPaddle.speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // factory function for creating new game item objects
  function MakeGameItem (width, height, x, speedX, y, speedY, id) {
    var gameItem = {};
    gameItem.width = width;
    gameItem.height = height;
    gameItem.x = x;
    gameItem.speedX = speedX; 
    gameItem.y = y;
    gameItem.speedY = speedY;
    gameItem.id = id;
    return gameItem;
  }

  // calculates random number with min and max
  function randomNum(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // handles paddle-wall collisions
  function paddleWallCollision () {
    if ((leftPaddle.y + leftPaddle.height >= BOARD.Y + BOARD.HEIGHT) || (leftPaddle.y <= BOARD.Y)) {
    leftPaddle.speedY *= -1;
    }
    if ((rightPaddle.y + rightPaddle.height >= BOARD.Y + BOARD.HEIGHT) || (rightPaddle.y <= BOARD.Y)) {
    rightPaddle.speedY *= -1;
    }
  }

  // handles ball-wall collisions
  function bounceBall() {
    if (ball.y < BOARD.Y || (ball.y + ball.height) > BOARD.HEIGHT) {
      ball.speedY *= -1;
    }
  }

  // function paddleBallCollision () {
  //   // bounces ball off left paddle
  //   if (ball.x < leftPaddle.x + leftPaddle.width && ball.x + ball.width > leftPaddle.x && ball.y < leftPaddle.y + leftPaddle.height && ball.y + ball.height > leftPaddle.y) {
  //       ball.speedX *= -1;

  //   }
  //   // bounces ball off right paddle
  //   if (ball.x < rightPaddle.x + rightPaddle.width && ball.x + ball.width < rightPaddle.x + rightPaddle.width && ball.y < rightPaddle.y + rightPaddle.height && ball.y + ball.height > rightPaddle.y) {
  //       ball.speedX *= -1;

  //   }
  //   return ball.speedX;
  // }

  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.rightX = square1.x + square1.width;
    square1.topY = square1.y;
    square1.bottomY = square1.y + square1.height;
    
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.rightX = square2.x + square2.width;
    square2.topY = square2.y;
    square2.bottomY = square2.y + square2.height;
  
    // TODO: Return true if they are overlapping, false otherwise
    var result = ((square1.leftX < square2.rightX) && (square1.rightX > square2.leftX) && (square1.topY < square2.bottomY) && (square1.bottomY > square2.topY)) ? true : false;
    if (result === true) {
      square1.speedX *= -1;
    }
	// Hint: use the following conditions:
    // red left < blue right
    // red right > blue left
    // red top < blue bottom
    // red bottom > blue top
}


  // handles player scoring and resets ball
  function increasePlayerScore() {
    // if ball runs into left wall, add 1 to player 2 score
    if (ball.x < BOARD.X) { 
      ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), "#ball");
      if (ball.speedX === 0) {
        ball.speedX = 4;
      }
      score2 += 1;
      $("#player2Score").text(score2);
    }
    // if ball runs into right wall, add 1 to player 1 score
    if ((ball.x + ball.width) > BOARD.WIDTH) { 
      ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), "#ball");
      score1 += 1;
      if (ball.speedX === 0) {
        ball.speedX = 4;
      }
      $("#player1Score").text(score1);
    }
  }
  // calculates game item's new position
  function repositionGameItem(gameItem) {
    gameItem.x += gameItem.speedX; 
    gameItem.y += gameItem.speedY; 
  }

  // redraws game item on screen
  function redrawGameItem(gameItem) {
    $(gameItem.id).css("left", gameItem.x);
    $(gameItem.id).css("top", gameItem.y);
  }

  // stops timer and turns off event handlers
  function endGame() {
    if (score1 || score2 === 11) {
      // stop the interval timer
      clearInterval(interval);

      // turn off event handlers
      $(document).off();
    }
  }
  
}