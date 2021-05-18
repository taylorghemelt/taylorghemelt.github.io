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
  var leftPaddle = MakeGameItem (20, 80, 10, 0, 180, 0, 0, "#leftPaddle");
  var rightPaddle = MakeGameItem (20, 80, 410, 0, 180, 0, 0, "#rightPaddle");
  var ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), 0, "#ball");
  var player1 = MakeGameItem (80, 80, 460, 0, 10, 0, 0, "#player1");
  var player2 = MakeGameItem (80, 80, 545, 0, 10, 0, 0, "#player2");


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
    // handle player scoring and reset ball
    madeBallIn();
    // increasePlayerScore();
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
  function MakeGameItem (width, height, x, speedX, y, speedY, score, id) {
    var gameItem = {};
    gameItem.width = width;
    gameItem.height = height;
    gameItem.x = x;
    gameItem.speedX = speedX; 
    gameItem.y = y;
    gameItem.speedY = speedY;
    gameItem.score = score;
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

  // handles player scoring and resets ball
  function madeBallIn() {
    // if ball runs into left wall, add 1 to player 2 score
    if (ball.x < BOARD.X) { 
      ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), 0, "#ball");
      player2.score += 1;
      return player2;
    }
    // if ball runs into right wall, add 1 to player 1 score
    if ((ball.x + ball.width) > BOARD.WIDTH) { 
      ball = MakeGameItem (20, 20, 210, randomNum(-2,2), 210, randomNum(-2,2), 0, "#ball");
      player1.score += 1;
      return player1;
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
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}