
//This is just the layout of the keyboard.  
const my_layout = {
  'default' : [
	"A B C", "D E F", "G H I",
	"J K L", "M N O",
	"P Q R S", "T U V", "W X Y Z", "spc bkspc clr"
  ],
  'shift' : [
    '~ ! @ # $ % ^ & * ) ( _ + {bksp}',
		'{tab} q w e r t y u i o p { } |',
		'{lock} a s d f g h j k l : " {enter}',
		'{shift} z x c v b n m , < > ? {shift}',
    '.com @ {space}'
  ]
}

//This is the quadrant representation of the keyboard.
//For example, if you tap in the top left corner of the window, and you are in quadrant 1,
// then you have just tapped on 'A'.
const quadrantLayout = [
	["A", "B", "C", ""],
	["D", "E", "F", ""],
	["G", "H", "I", ""],
	["J", "K", "L", ""],
	["M", "N", "O", ""],
	["P", "Q", "R", "S"],
	["T", "U", "V", ""],
	["W", "X", "Y", "Z"],
	["space", "back", "clr", "clr"]
]

//Initialize keyboard.
let Keyboard = window.SimpleKeyboard.default;

//One centimeter (real dimension from pixels) is approximately this value.
var oneCM = 96/2.54;

//This gives the current top left corner position of the keyboard in px.
//Keeping track of the original position of the keyboard allows us to move the keyboard and then back.
var currentKeyboardPositionX = $(".simple-keyboard").position().left;
var currentKeyboardPositionY = $(".simple-keyboard").position().top;

//Just a correction in pixels for where the interactive window should be positioned.
var correctionTop = 5;
var correctionLeft = -10;

//Place the interactive window in the center of the keyboard.
var centerOffsetY = $(".outer-box").height()/2 - oneCM;
var centerOffsetX = $(".outer-box").width()/2 - oneCM;
$("#keyboard_window").css({left: centerOffsetX + correctionLeft, 
	top: centerOffsetY + correctionTop});
$( "#keyboard_window" ).attr( "sector", 4); //Initialize to the center sector

/*
	What: Initialize default functions for keyboard javascript object.
	Where: https://github.com/hodgef/simple-keyboard
	Why: This ensures that clicking on a keyboard object we can 
		activate some javascript function.  Think of this as a connection to
		the keyboard js file.

*/
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


//Our code: Just makes sure that we can click 'through' the window, instead of being blocked by it.
$('#keyboard_window').on('touchstart', function(e){
  e.preventDefault();
});


/*
	What: This instantiates a swipe gesture from ZingTouch.
	Where: https://zingchart.github.io/zingtouch/#docs
	Why: Initializing the gesture allows us to use it later.
*/
var zt = new ZingTouch.Region(document.body);
var windowElement = document.getElementById("keyboard_window");
var customSwipe = new ZingTouch.Swipe({
  // threshold: 1
  escapeVelocity: 0.05,
  maxRestTime: 2000
});


/*
	What: Binds the swipe gesture to the interactive window.
	Where: https://zingchart.github.io/zingtouch/#docs
	Why:  Binding the swipe gesture allows us to control what
		happens whenever the user swipes on the interactive window.
		The original code allowed us to take data from parameter 'e',
		but our code extends it to allow for swipe directions, movement of objects, etc.

*/
zt.bind(windowElement, customSwipe, function(e) {

  //This variable tells us how much to move the interactive window by.
  var changeInX = 0;
  var changeInY = 0;
  
  //This gives us the direction of the swipe (0 - 359 degrees)
  var swipe_direction = e.detail.data[0]['currentDirection'];
  var output = "";
  
  //This is all out of order, but essentially these are all 
  // a bunch of if statements for determining what direction the user has swiped.
  // That way, we can decide how much to move the interactive box by, as well as
  // give it the attribute for determine what 'sector' it is in (i.e. we have 9 sectors on the keyboard)
  if (swipe_direction >= 67.5 && swipe_direction < 112.5) {
    console.log("Top");
	output = "TOP";
	
	changeInY = -(oneCM*2);
	$( "#keyboard_window" ).attr("sector", 7);
	
  } else if (swipe_direction >= 112.5 && swipe_direction < 157.5) {
    console.log("Top left");
	output = "Top Left";
	
	changeInX = -oneCM*2;
	changeInY = -oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 8);
	
  }else if (swipe_direction >= 157.5 && swipe_direction < 202.5) {
    console.log("Left"); 
	output = "Left" ;
	
	changeInX = -oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 5);
	
  } else if (swipe_direction >= 202.5 && swipe_direction < 247.5) {
    console.log("Bottom left");
	output = "bottom left";
	
	changeInX = -oneCM*2;
	changeInY = oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 2);
	
  }else if ((swipe_direction >= 337.5 && swipe_direction < 360) || (swipe_direction >= 0 && swipe_direction < 22.5)) {
    console.log("Right");
	output = "Right";
	
	changeInX = oneCM*2;
	$( "#keyboard_window" ).attr( "sector", 3);
	
  } else if (swipe_direction >= 22.5 && swipe_direction < 67.5) {
    console.log("Top Right");
	output = "Top right";
	
	changeInX = oneCM*2;
	changeInY = -oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 6);
	
  } else if (swipe_direction >= 247.5 && swipe_direction < 292.5) {
    console.log("Bottom");
	output = "Bottom";
	
	changeInY = oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 1);
	
  } else if (swipe_direction >= 292.5 && swipe_direction < 337.5) {
    console.log("Bottom right");
	output = "Bottom Right";
	
	changeInX = oneCM*2;
	changeInY = oneCM*2;
	
	$( "#keyboard_window" ).attr( "sector", 0);
  }
  else {
	//Does nothing.
  }


	
  console.log("Box moved: " + changeInX + "," + changeInY);
  
  //If we are moving the box, then animate its movement.
  if(changeInX != 0 || changeInY != 0) {
	  $(".simple-keyboard").animate({
		left: currentKeyboardPositionX + changeInX,
		top: currentKeyboardPositionY + (-2*oneCM) + changeInY
	  }, 100, function() {
		// Animation complete.
	  });
  }
 
  
});

//This is what the current sentence says.
var currentString = "";

/*
	Similar to the previous function, we extended the original code
	to actually provide some functionality when the window is tapped.
	In this case, we figure out what letter the user wants to press,
	 and update the top sentence accordingly.
*/
zt.bind(windowElement, 'tap', function(e) {

	
	//$(".outputstuff").text("Tapped on window");
	var x = e.detail.events[0].x - $("#keyboard_window").offset().left;
	var y = e.detail.events[0].y - $("#keyboard_window").offset().top;
	var quadrant = -1;
	//Checks the four quadrants of the current window box
	if(x < oneCM) {  //Left side of the window
		if(y < oneCM) {  //Top of the window
			quadrant = 0;
		}
		else {  //Bottom of window
			quadrant = 2;
		}
	}
	else {  //Right side of window
		if(y < oneCM) {
			quadrant = 1;
		}
		else {
			quadrant = 3;
		}
	}
	
	//What sector is the current window in?
	var sector = $("#keyboard_window").attr("sector");
	
	//Get the current string represented by this corner of the tapped window.
	var currentStr = quadrantLayout[sector][quadrant];
	
	if(currentStr == "space") {
		currentString += " ";
	}
	else if(currentStr == "back") {
		currentString = currentString.substring(0, currentString.length-1);
	}
	else if(currentStr == "clr") {
		currentString = "";
	}
	else {
		currentString += currentStr;
	}
	
	$(".input-box").text(currentString + "_");
	
	//If the user has clicked on a character or command, then we move the keyboard back to the center.
	if(currentStr.length > 0) {
		$( "#keyboard_window" ).attr( "sector", 4); //Initialize to the center sector
		
		$(".simple-keyboard").animate({
			left: currentKeyboardPositionX,
			top: currentKeyboardPositionY + (-2*oneCM)
		  }, 100, function() {
			// Animation complete.
		  });
	}
	
	console.log("X: " + x + " Y: " + y + " Quadrant: " + quadrant);
	console.log("You just clicked on " + quadrantLayout[sector][quadrant]);
});