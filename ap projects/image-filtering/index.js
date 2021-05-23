// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilter(increaseGreenByBlue);


    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (outerCounter = 0; outerCounter < image.length; outerCounter++) {
        var innerList = image[outerCounter];
        for (innerCounter = 0; innerCounter < innerList.length; innerCounter++) {
          var rgbString = innerList[innerCounter];
          var rgbNumbers = rgbStringToArray(rgbString);
          filterFunction(rgbNumbers);
          rgbString = rgbArrayToString(rgbNumbers);
          image[outerCounter][innerCounter] = rgbString;
        }
    }
}
// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    for (outerCounter = 0; outerCounter < image.length; outerCounter++) {
        var innerList = image[outerCounter];
        for (innerCounter = 0; innerCounter < innerList.length; innerCounter++) {
          var rgbString = innerList[innerCounter];
          var rgbNumbers = rgbStringToArray(rgbString);
          filterFunction(rgbNumbers);
          rgbString = rgbArrayToString(rgbNumbers);
          if (image[outerCounter][innerCounter] != image[0][0]) {
            image[outerCounter][innerCounter] = rgbString;
          }
        }
    }
}

// TODO 2 & 4: Create filter functions
function reddify(array) {
    array[RED] = 255;
}
function decreaseBlue(array) {
    array[BLUE] = Math.max(0, array[BLUE] - 30);
}
function increaseGreenByBlue(array) {
    array[GREEN] = Math.min(array[GREEN] + array[BLUE], 255)
}
// CHALLENGE code goes below here
