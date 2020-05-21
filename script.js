function add(x, y) {
  return x+y;
}

function subtract(x, y) {
  return x-y;
}

function multiply(x, y) {
  return x*y;
}

function divide(x, y) {
  return x/y;
}

function operate(operator, x, y) {
  switch(operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "x":
    case "*":
      return multiply(x, y);
    case "/":
    case "÷":
      return divide(x, y);
  }
}

function getOperatorName(operator) {
  switch(operator) {
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "x":
    case "*":
      return "multiply";
    case "/":
    case "÷":
      return "divide";
  }
}


function clearDisplay() {
  const clear = document.querySelector("#clear");
  clear.classList.add("clicked");
  display.classList.add("clear");
  display.dataset.numbers = "";
  display.dataset.operators = "";
  display.textContent = "0";
}

// operate on the saved numbers and the current answer and display the result
function computeResult() {
  const equals = document.querySelector("#equals");
  equals.classList.add("clicked");
  // convert CSV list to array of numbers
  const numbers = display.dataset.numbers.split(',').splice(1).map(str => Number(str));
  // remove leading comma and convert to array
  const operators = display.dataset.operators.split(',').splice(1);
  const currentNumber = Number(display.textContent);

  if(operators.length === 0) {
    return; // do nothing
  }

  // keep operating until only 1 number is saved
  while(numbers.length > 1){
    let x = numbers.shift();
    let y = numbers[0];
    numbers[0] = operate(operators.shift(), x, y);
  }

  // ensure the display is rounded to 5 decimals
  const result = operate(operators.shift(), numbers.shift(), currentNumber);
  let strResult = result.toString();
  if (result === Infinity) {
    strResult = "Divided by 0!";
  } else if (strResult.length > 5) {
    // round to 5 decimal places
    strResult = (Math.round(result*100000)/100000).toString();
  }

  display.classList.add("clear");
  display.dataset.numbers = "";
  display.dataset.operators = "";
  display.textContent = strResult;
}

// save display with operator (as CSV list)
function operatorPressed(operator) {
  const button = document.querySelector(`.${getOperatorName(operator)}`);
  button.classList.add("clicked");
  display.dataset.numbers += ","+display.textContent; // save number
  display.dataset.operators += ","+operator; // save operator
  display.classList.add("clear");
}

// add digit to display
function digitPressed(digit) {
  button = document.querySelector(`.number${digit}`);
  button.classList.add("clicked");
  if (display.classList.contains("clear")) {
    display.textContent = ""; // clear display
    display.classList.remove("clear");
  }
  if(display.textContent.length > 10){
    return;
  }
  display.textContent += digit;
}

// run corresponding function when keyboard is pressed
function keyPressed(event) {
  const digits = "0123456789";
  const operators = "+-x*/";
  if (digits.indexOf(event.key) !== -1) {
    digitPressed(event.key);
  } else if (operators.indexOf(event.key) !== -1) {
    operatorPressed(event.key);
  } else if (event.key === "=" || event.key === "Enter") {
    computeResult();
  } else if (event.key === "c" || event.key === "C") {
    clearDisplay();
  }
}

// remove the pressed transition
function removeTransition(event) {
  if(event.propertyName !== "transform") {
    return;
  }
  this.classList.remove("clicked");
}

const numbers = document.createAttribute("data-numbers");
const operators = document.createAttribute("data-operators");
const display = document.querySelector("#display");

// initialize arrays
numbers.value = [];
operators.value = [];

// add attributes to the display
display.setAttributeNode(numbers);
display.setAttributeNode(operators);

const digits = document.querySelectorAll(".digit");

// add ids and events for digit buttons
digits.forEach(button => {
  button.classList.add("number" + button.textContent);
  button.addEventListener("click", event => {
    digitPressed(button.textContent);
  });
})

// add ids and click events for operators
const opButtons = document.querySelectorAll(".operator");
opButtons.forEach(button => {
  button.classList.add(getOperatorName(button.textContent));
  button.addEventListener("click", event => {
    operatorPressed(button.textContent);
  });
})

const equals = document.querySelector("#equals");

// compute result when clicked
equals.addEventListener("click", event => {
  computeResult();
});

const clear = document.querySelector("#clear");
// clear display if clicked
clear.addEventListener("click", event => {
  clearDisplay();
});

// add event handlers for keyboard presses
window.addEventListener("keydown", event => {
  keyPressed(event);
});

// add event listener to end transition
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener('transitionend', removeTransition);
});
