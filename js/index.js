// import my_layout from './my_layout';
let Keyboard = window.SimpleKeyboard.default;

var currentDistanceX = 0;
var currentDistanceY = 0;

var previousX = 0;
var previousY = 0;


//Everything here from https://github.com/hodgef/simple-keyboard
let myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  // layout: my_layout
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
var customSwipe = new ZingTouch.Swipe({
  // threshold: 1
  escapeVelocity: 0.05,
  maxRestTime: 2000
});


var windowWidth = $("#keyboard_window").width();
var windowHeight = $("#keyboard_window").height();
console.log("Width: " + windowWidth + " Height: " + windowHeight);

zt.bind(windowElement, customSwipe, function(e) {
  console.log("swiped/pan on window");
  console.log(e.detail);
  console.log("left: " + $(".simple-keyboard").position().left + " right: " + $(".simple-keyboard").position().left )
  $(".simple-keyboard").css({ "z-index": -1 });

  console.log(e.detail.data[0]['currentDirection'])
  var swipe_direction = e.detail.data[0]['currentDirection']

  if (swipe_direction >= 0 && swipe_direction < 60) {
    console.log("Top right");
    $(".simple-keyboard").css({left: currentDistanceX + distanceX + "px", 
                              top: currentDistanceY + distanceY + "px"});
  } else if (swipe_direction >= 60 && swipe_direction < 120) {
    console.log("Top");
  } else if (swipe_direction >= 120 && swipe_direction < 180) {
    console.log("Top left");
  } else if (swipe_direction >= 180 && swipe_direction < 240) {
    console.log("Bottom left");
  } else if (swipe_direction >= 240 && swipe_direction < 300) {
    console.log("Bottom");
  } else {
    console.log("Bottom right");
  }



  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  //console.log("Origin: " + OriginDirection + " Current: " + currentDirection + " N: " + (currentDirection-OriginDirection));
  
  var x = e.detail.events[0].x // - windowElement.style.left;
  var y = e.detail.events[0].y // - windowElement.style.top;
 
  
  //console.log("x: " + (x-$("#keyboard_window").position().left - windowWidth) + " y: " + (y - $("#keyboard_window").position().top - windowHeight));
  
  //As an example, x-$("#keyboard_window").position().left) gives you the position of the cursor relative to inside the window
  //So (x-$("#keyboard_window").position().left) > windowWidth is checking if the cursor has moved outside the right side of the window
  //And (x-$("#keyboard_window").position().left) < 0 is checking if the cursor has moved outside the left side of the window
  // if((x-$("#keyboard_window").position().left) > windowWidth || (y - $("#keyboard_window").position().top) > windowHeight) {
	 //  return;
  // }
  // if((x-$("#keyboard_window").position().left) < 0 || (y - $("#keyboard_window").position().top) < 0) {
	 //  return;
  // }
  
  // var distanceX = 0;
  // var distanceY = 0;
  
  // distanceX = x - previousX;
  // distanceY = y - previousY;
  // if(Math.abs(distanceX) > 50 || Math.abs(distanceY) > 50)  {
	 //  distanceX = 0;
	 //  distanceY = 0;
  // }
  // previousX = x;
  // previousY = y;
  
  //console.log("X: " + distanceX + " Y: " + distanceY);
  
  //distanceX = Math.cos(currentDirection) * distance;
  //distanceY = Math.sin(currentDirection) * distance;
  //console.log("X: " + distanceX + " Y: " + distanceY);
  //console.log("C_X: " + currentDistanceX + " C_Y: " + currentDistanceY);
  
  //console.log("X: " + currentDistanceX + " Y: " + currentDistanceY);
  
  //currentDistanceX += distanceX;
  //currentDistanceY += distanceY;
  
  // $(".simple-keyboard").css({left: currentDistanceX + distanceX + "px", top: currentDistanceY + distanceY + "px"});
  
  // currentDistanceX = $(".simple-keyboard").position().left;
  // currentDistanceY = $(".simple-keyboard").position().top;
  
});

zt.bind(windowElement, 'tap', function(e) {
	console.log("Tapped on window");
	$(".simple-keyboard").css({ "z-index": 1 });
});