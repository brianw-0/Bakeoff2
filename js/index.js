let Keyboard = window.SimpleKeyboard.default;

var currentDistanceX = 0;
var currentDistanceY = 0;

var previousX = 0;
var previousY = 0;


//Everything here from https://github.com/hodgef/simple-keyboard
let myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
}


//Everything here from https://zingchart.github.io/zingtouch/#docs

var zt = new ZingTouch.Region(document.body);
var windowElement = document.getElementById("keyboard_window");
var customPan = new ZingTouch.Pan({
  threshold: 1
});

zt.bind(windowElement, customPan, function(e) {
    /*['currentDirection', Math.floor(e.detail.data[0].currentDirection) + "°"],
    ['directionFromOrigin', Math.floor(e.detail.data[0].directionFromOrigin) + "°"],
    ['distanceFromOrigin', Math.floor(e.detail.data[0].distanceFromOrigin) + "px"]*/
  
  var distance = Math.floor(e.detail.data[0].distanceFromOrigin);
  var OriginDirection = Math.floor(e.detail.data[0].directionFromOrigin);
  var currentDirection = Math.floor(e.detail.data[0].currentDirection);
  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  
  var x = e.detail.events[0].x // - windowElement.style.left;
  var y = e.detail.events[0].y // - windowElement.style.top;
  
  var distanceX = 0;
  var distanceY = 0;
  
  distanceX = x - previousX;
  distanceY = y - previousY;
  if(Math.abs(distanceX) > 50 || Math.abs(distanceY) > 50)  {
	  distanceX = 0;
	  distanceY = 0;
  }
  previousX = x;
  previousY = y;
  
  //console.log("X: " + distanceX + " Y: " + distanceY);
  
  //distanceX = Math.cos(currentDirection) * distance;
  //distanceY = Math.sin(currentDirection) * distance;
  console.log("X: " + distanceX + " Y: " + distanceY);
  console.log("C_X: " + currentDistanceX + " C_Y: " + currentDistanceY);
  
  //console.log("X: " + currentDistanceX + " Y: " + currentDistanceY);
  
  //currentDistanceX += distanceX;
  //currentDistanceY += distanceY;
  
  $(".simple-keyboard").css({left: currentDistanceX + distanceX + "px", top: currentDistanceY + distanceY + "px"});
  
  currentDistanceX = $(".simple-keyboard").position().left;
  currentDistanceY = $(".simple-keyboard").position().top;
  
  
});