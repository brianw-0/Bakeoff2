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

var windowWidth = $("#keyboard_window").width();
var windowHeight = $("#keyboard_window").height();
console.log("Width: " + windowWidth + " Height: " + windowHeight);

zt.bind(windowElement, customPan, function(e) {
  console.log("swiped/pan on window");
  $(".simple-keyboard").css({ "z-index": -1 });

  var distance = Math.floor(e.detail.data[0].distanceFromOrigin);
  var OriginDirection = Math.floor(e.detail.data[0].directionFromOrigin);
  var currentDirection = Math.floor(e.detail.data[0].currentDirection);
  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  
  var x = e.detail.events[0].x // - windowElement.style.left;
  var y = e.detail.events[0].y // - windowElement.style.top;
 
  
  //console.log("x: " + (x-$("#keyboard_window").position().left - windowWidth) + " y: " + (y - $("#keyboard_window").position().top - windowHeight));
  
  //As an example, x-$("#keyboard_window").position().left) gives you the position of the cursor relative to inside the window
  //So (x-$("#keyboard_window").position().left) > windowWidth is checking if the cursor has moved outside the right side of the window
  //And (x-$("#keyboard_window").position().left) < 0 is checking if the cursor has moved outside the left side of the window
  if((x-$("#keyboard_window").position().left) > windowWidth || (y - $("#keyboard_window").position().top) > windowHeight) {
	  return;
  }
  if((x-$("#keyboard_window").position().left) < 0 || (y - $("#keyboard_window").position().top) < 0) {
	  return;
  }
  
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
  //console.log("X: " + distanceX + " Y: " + distanceY);
  //console.log("C_X: " + currentDistanceX + " C_Y: " + currentDistanceY);
  
  //console.log("X: " + currentDistanceX + " Y: " + currentDistanceY);
  
  //currentDistanceX += distanceX;
  //currentDistanceY += distanceY;
  
  $(".simple-keyboard").css({left: currentDistanceX + distanceX + "px", top: currentDistanceY + distanceY + "px"});
  
  currentDistanceX = $(".simple-keyboard").position().left;
  currentDistanceY = $(".simple-keyboard").position().top;
  
});

zt.bind(windowElement, 'tap', function(e) {
	console.log("Tapped on window");
	$(".simple-keyboard").css({ "z-index": 1 });
});