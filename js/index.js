//import { my_layout } from "my_layout";

const my_layout = {
  'default' : [
	"A B C", "D E F", "G H I",
	"J K L", "M N O",
	"P Q R S", "T U V", "W X Y Z"
  ],
  'shift' : [
    '~ ! @ # $ % ^ & * ) ( _ + {bksp}',
		'{tab} q w e r t y u i o p { } |',
		'{lock} a s d f g h j k l : " {enter}',
		'{shift} z x c v b n m , < > ? {shift}',
    '.com @ {space}'
  ]
}

let Keyboard = window.SimpleKeyboard.default;

var currentDistanceX = 0;
var currentDistanceY = 0;

var previousX = 0;
var previousY = 0;


//Everything here from https://github.com/hodgef/simple-keyboard
let myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: my_layout
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
  //console.log("left: " + $(".simple-keyboard").position().left + " right: " + $(".simple-keyboard").position().left )
  //$(".simple-keyboard").css({ "z-index": -1 });

  console.log(e.detail.data[0]['currentDirection'])
  var swipe_direction = e.detail.data[0]['currentDirection'];
  var output = "";
  

  if (swipe_direction >= 67.5 && swipe_direction < 112.5) {
    console.log("Top");
	output = "TOP";
  } else if (swipe_direction >= 112.5 && swipe_direction < 157.5) {
    console.log("Top left");
	output = "Top Left";
	
  }else if (swipe_direction >= 157.5 && swipe_direction < 202.5) {
    console.log("Left"); 
	output = "Left" ;
  } else if (swipe_direction >= 202.5 && swipe_direction < 247.5) {
    console.log("Bottom left");
	output = "bottom left";
  }else if (swipe_direction >= 337.5 && swipe_direction < 22.5) {
    console.log("Right");
	output = "Right";
  } else if (swipe_direction >= 22.5 && swipe_direction < 67.5) {
    console.log("Top Right");
	output = "Top right";
  } else if (swipe_direction >= 247.5 && swipe_direction < 292.5) {
    console.log("Bottom");
	output = "Bottom";
  } else if (swipe_direction >= 292.5 && swipe_direction < 337.5) {
    console.log("Bottom right");
	output = "Bottom Right";
  }

  $(".outputstuff").text(output);

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