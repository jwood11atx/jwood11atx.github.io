
//Variables
var startButton = document.querySelector("#start-btn");
var guessButton = document.querySelector("#guess-btn");
var clearButton = document.querySelector("#clear-btn");
var resetButton = document.querySelector(".reset-btn");
var inputField = document.getElementById("inputbox");
var inputFieldMin = document.getElementById("inputboxMin");
var inputFieldMax = document.getElementById("inputboxMax");
var theGuess;

//Button listeners
startButton.addEventListener("click", function() {
 checkMinMax();
 document.querySelector("#resultMsg").innerText = "";
 document.querySelector("#textResult").innerText = "";
 document.getElementById("inputbox").value = "";
 clearButton.disabled = true
});

guessButton.addEventListener("click", function() {
 document.querySelector("#resultMsg").innerText = "Your last guess was";
 mainFunc();
 disableClearBtn();
});

clearButton.addEventListener("click", function() {
 clearGuess();
 disableClearBtn();
});

resetButton.addEventListener("click", function() {
 resetGame();
});


inputField.addEventListener("keyup", function() {
 if(inputField.value === ""){
     clearButton.disabled = true;
   } else {
     clearButton.disabled = false;
   };
});

//Main logic
function mainFunc(){
 if(inputCheck()) {
   compareGuess();
   guessDisplay();
 } else {
   badInputDisplay();
 }
};
//Compares user input to generated number
function compareGuess() {
 var input = getGuess();
 if(input === theGuess){
   correctNum();
 }
 else
   input > theGuess ? tooHigh() : tooLow();
};
//Generates number to be guessed
function randoNum() {
 return Math.floor(Math.random()*(getMax()-getMin())+getMin());
}
//Clears the guess inputfield
function clearGuess() {
 return document.getElementById("inputbox").value = "";
};
//Resets the game to initial state
function resetGame() {
  guessButton.style.display = "none";
  startButton.style.display = "inline-block";
  clearButton.style.display = "none";
  resetButton.style.display = "none";
  document.getElementById("inputbox").value = "";
  document.getElementById("inputboxMin").value = "";
  document.getElementById("inputboxMax").value = "";
  inputboxMin.disabled = false;
  inputboxMax.disabled = false;
  inputbox.disabled = true;
  document.querySelector("#resultMsg").innerText = "";
  document.querySelector("h2").innerText = "";
  document.querySelector("#textResult").innerText = "";
}
//Gets the user's guess as a number
function getGuess(){
 return Number(document.getElementById("inputbox").value);
}
//Gets the user's defined min range as a number
function getMin() {
 return Number(document.getElementById("inputboxMin").value);
}
//Gets the user's defined max range as a number
function getMax() {
 return Number(document.getElementById("inputboxMax").value);
}
//Returns a too high message to the user if guessed too high
function tooHigh() {
 return document.querySelector("#textResult").innerText = "That is too high";
};
//Returns a too low message to the user if guessed too low
function tooLow() {
 return document.querySelector("#textResult").innerText = "That is too low"
}
//Returns a correct message and replaces clear button and guess button with start button and increases range by -10min and +10max
function correctNum() {
 var newMin  = getMin() - 10;
 var newMax = getMax() + 10;
 document.getElementById("inputboxMin").value = newMin;
 document.getElementById("inputboxMax").value = newMax;
 guessButton.style.display = "none";
 clearButton.style.display = "none";
 startButton.style.display = "inline-block";
 inputbox.disabled = true;

 return document.querySelector("#textResult").innerText = "That is correct! Try to guess the number between the new range!";
};
//Displays the user's input guess into the large pink text
function guessDisplay() {
 document.querySelector("h2").innerText = getGuess();
};
//Removes h2 and displays not a number message if user inputs beyond the range
function badInputDisplay() {
 document.querySelector("h2").innerText = "";
 document.querySelector("#textResult").innerText = "NOT a number between " + getMin() + "-" + getMax() + "."
};
//Displays the min max error msg if the user tries to input an invalid range
function badMinMaxDisplay() {
 document.getElementById("errorMinMaxMsg").style.display = "block";
}
//Replaces start with guess and clear button and hides min max error field. Also displays the result section
function addResultSection() {
 document.getElementById("result").style.display = "block";
 document.getElementById("clear-btn").style.display = "inline-block";
 document.getElementById("errorMinMaxMsg").style.display = "none";
 resetButton.style.display = "block";
};
//Logic to check if the user input a valid min max that is max>min
function checkMinMax() {
 if(getMin() !== "" && getMax() !== "" && getMin()<getMax()) {
   guessButton.style.display = "inline-block";
   startButton.style.display = "none";
   errorMinMaxMsg.style.display = "none";
   inputboxMin.disabled = true;
   inputboxMax.disabled = true;
   inputbox.disabled = false;
   addResultSection();
   document.querySelector("h2").innerText = "BEGIN!";
   return theGuess = randoNum();
 } else {
   badMinMaxDisplay();
 }
};
//Disables the clear button when field is empty
function disableClearBtn(){
 if(inputField.value === ""){
   clearButton.disabled = true;
 } else {
   clearButton.disabled = false;
 };
}
//Logic to check if input is between min and max range
function inputCheck() {
 var input = getGuess();
 return (input>getMin()-1 && input<getMax()+1);
};
