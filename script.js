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

display = document.querySelector("#display");
digits = document.querySelectorAll(".digit");
digits.forEach(button => {
  button.addEventListener("click", event => {
    display.textContent += button.textContent;
  })
})
