/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {               //contains constants for key codes
      "LEFT": 37,           //left arrow key code
      "RIGHT": 39,          //right arrow key code
      "UP": 38,             //up arrow key code
      "DOWN": 40,           //down arrow key code
  }
  
  // Game Item Objects
  var positionX = 0;    // the x-coordinate location for the box
  var positionY = 0;    // the y-coordinate location for the box
  var speedX = 0;       // the speed for the box along the x-axis
  var speedY = 0;       // the speed for the box along the y-axis

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);             //keydown event handler
  $(document).on('keyup', handleKeyUp);                 //keydown event handler
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
//this function prints which arrow key was pressed to the console//
  function handleKeyDown(event) { 
    if (event.which === KEY.LEFT) {         //left key speed
        speedX = -5;
    }
    if (event.which === KEY.RIGHT) {        //right key speed
        speedX = 5;
    } 
    if (event.which === KEY.UP) {           //up key speed
        speedY = -5;
    }
    if (event.which === KEY.DOWN) {         //down key speed
        speedY = 5;
    }
  }

  //This function makes the cirlce stop moving when the arrows are released
  function handleKeyUp(event) {
      speedX = 0;
      speedY = 0;
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    positionX += speedX; // update the position of the box along the x-axis
    positionY += speedY; // update the position of the box along the y-axis
  }

  function redrawGameItem() {
    $("#gameItem").css("left", positionX);    // draw the box in the new location, positionX pixels away from the "left"
    $("#gameItem").css("top", positionY);    // draw the box in the new location, positionY pixels away from the "top"
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
