/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){

  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP AND VARIABLES //////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 f/s)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  // constant variables
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
  
  // game item objects
  var ball = MakeGameItem (20, 20, 210, randomNum(1,2), 210, randomNum(1,2), 0, "#ball");   // creates ball object 
  var leftPaddle = MakeGameItem (20, 80, 10, 0, 180, 0, 0, "#leftPaddle");                  // creates left paddle object
  var rightPaddle = MakeGameItem (20, 80, 410, 0, 180, 0, 0, "#rightPaddle");               // creates right paddle object
  var scorePlayer1 = MakeGameItem (80, 80, 460, 0, 10, 0, 0, "#scorePlayer1");              // creates player 1 score object
  var scorePlayer2 = MakeGameItem (80, 80, 545, 0, 10, 0, 0, "#scorePlayer2");              // creates player 2 score object

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// CORE LOGIC ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // new frame drawn on each tick of timer by calling this fucntion and executing code inside
  function newFrame() {
      // calculate new position of ball and redraw ball
      repositionGameItem(ball);
      redrawGameItem(ball);
      // 
      doCollide(ball, leftPaddle, rightPaddle);
      // increase player score if made ball in
      increaseScore();
      // calculate new position of left paddle and redraw left paddle
      repositionGameItem(leftPaddle);
      redrawGameItem(leftPaddle);
      // calculate new position of right paddle and redraw right paddle
      repositionGameItem(rightPaddle);
      redrawGameItem(rightPaddle);
      // makes left or right paddle stop moving if touching box boundaries
      bouncePaddle();
  }
  
  
  // called in response to events
  function handleKeyDown(event) { 
    // move left paddle up 
    if (event.which === KEY.E) {
        leftPaddle.speedY = -3;
    }
    // move left paddle down
    if (event.which === KEY.D) {
        leftPaddle.speedY = 3;
    } 
    // move right paddle up
    if (event.which === KEY.UP) {  
        rightPaddle.speedY = -3;
    }
    // move right paddle down 
    if (event.which === KEY.DOWN) {  
        rightPaddle.speedY = 3;
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
  
  // bounces ball off surfaces 
  function doCollide(ball, leftPaddle, rightPaddle) {
    // ball position name assignments
    ball.leftX = ball.x - (ball.width / 2);
    ball.rightX = ball.x + (ball.width / 2);
    ball.topY = ball.y - (ball.height / 2);
    ball.bottomY = ball.y + (ball.height / 2);
    // left paddle position name assignments
    leftPaddle.leftX = leftPaddle.x;
    leftPaddle.rightX = leftPaddle.x + leftPaddle.width;
    leftPaddle.topY = leftPaddle.y;
    leftPaddle.bottomY = leftPaddle.y + leftPaddle.height;
    // right paddle position name assigments
    rightPaddle.leftX = rightPaddle.x;
    rightPaddle.rightX = rightPaddle.x + rightPaddle.width;
    rightPaddle.topY = rightPaddle.y;
    rightPaddle.bottomY = rightPaddle.y + rightPaddle.height;
    // returns true if overlapping, false otherwise
    var result = ((leftPaddle.leftX || rightPaddle.leftX < ball.rightX) && (leftPaddle.rightX || rightPaddle.rightX> ball.leftX) && (leftPaddle.topY || rightPaddle.topY < ball.bottomY) && (leftPaddle.bottomY || rightPaddle.bottomY > ball.topY)) ? true : false;
    return result;
    if (result === true) {
      ball.speedX *= -1;
      ball.speedY *=-1;
    }
  }

  // bounces ball off surfaces (paddles and walls)
  // function bounceBall() {
  //   // bounces ball off top and bottom walls
  //   if (ball.y < BOARD.Y || (ball.y + ball.height) > BOARD.HEIGHT) {
  //       ball.speedY *= -1;
  //   }
  //   // bounces ball off left paddle
  //   if (ball.x < leftPaddle.x && ball.x > leftPaddle.x + leftPaddle.width && ball.y < leftPaddle.y + leftPaddle.height && ball.y > leftPaddle.y) {
  //       ball.speedX *= -1;
  //       ball.speedY *= -1;
  //   }
  //   // bounces ball off right paddle
  //   if (ball.x < rightPaddle.x && ball.x < rightPaddle.x + rightPaddle.width && ball.y < rightPaddle.y + rightPaddle.height && ball.y > rightPaddle.y) {
  //       ball.speedX *= -1;
  //       ball.speedY *= -1;
  //   }
  //   return ball.speedX;
  // }

  function increaseScore() {
    // if ball runs into left wall, add 1 to player 2 score
    if (ball.x < BOARD.X) { 
        ball.x = 210;
        ball.y = 210;
        scorePlayer2 += 1;
        return scorePlayer2;
    }
    // if ball runs into right wall, add 1 to player 1 score
    if ((ball.x + ball.width) > BOARD.WIDTH) { 
        ball.x = 210;
        ball.y = 210;
        scorePlayer1 += 1;
        return scorePlayer1;
    }
  }

//   // make paddles stop moving if they go beyond top or bottom of board
//   function bouncePaddle() {                      
//     if ((leftPaddle.y < BOARD.Y) || (leftPaddle.height > BOARD.HEIGHT)) {
//         leftPaddle.speedY = 0;
//         return leftPaddle.speedY;
//     }
//     if ((rightPaddle.y < BOARD.Y) || (rightPaddle.height > BOARD.HEIGHT)) {
//         rightPaddle.speedY = 0;
//         return rightPaddle.speedY;
//     }
//   }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}