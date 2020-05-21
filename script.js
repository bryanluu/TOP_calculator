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

// add digit to display when clicked
digits.forEach(button => {
  button.addEventListener("click", event => {
    if (display.classList.contains("clear")) {
      display.textContent = ""; // clear display
      display.classList.remove("clear");
    }
    if(display.textContent.length > 10){
      return;
    }
    display.textContent += button.textContent;
  })
})

// save display data with operator when clicked (as CSV list)
const opButtons = document.querySelectorAll(".operator");
opButtons.forEach(button => {
  button.addEventListener("click", event => {
    display.dataset.numbers += ","+display.textContent; // save number
    display.dataset.operators += ","+button.textContent; // save operator
    display.classList.add("clear");
  })
})

const equals = document.querySelector("#equals");
// operate on the saved numbers and the current answer and display it when clicked
equals.addEventListener("click", event => {
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
});

const clear = document.querySelector("#clear");
// clear display if clicked
clear.addEventListener("click", event => {
  display.classList.add("clear");
  display.dataset.numbers = "";
  display.dataset.operators = "";
  display.textContent = "0";
});


