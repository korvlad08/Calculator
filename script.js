const display = document.getElementById("display");
const operation = document.querySelectorAll(".operators");
const equals = document.getElementById("equals");
const square = document.getElementById("square");
const sqrt = document.getElementById("sqrt");

let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;

function formatResult(number) {
  const numStr = String(number);

  if (Math.abs(number) >= 1e15 || numStr.length > 15) {
    return number.toExponential(9);
  }

  return parseFloat(number.toFixed(14)).toString().slice(0, 14);
}

let equalation = () => {
  if (firstNum === null || operator === null) {
    return;
  }
  secondNum = parseFloat(display.value);
  display.value = "0";
  switch (operator) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "/":
      result = firstNum / secondNum;
      break;
    default:
      return;
  }

  display.value = formatResult(result);
  firstNum = null;
  secondNum = null;
  operator = null;

  return result;
};

operation.forEach((op) => {
  op.addEventListener("click", () => {
    let currentNum = parseFloat(display.value);
    if (!isNaN(currentNum)) {
      if (firstNum === null) {
        firstNum = currentNum;
        display.value = "0";
      } else {
        firstNum = equalation();
      }
    }
    operator = op.innerText;
  });
});

square.addEventListener("click", () => {
  let currentNum = parseFloat(display.value);
  if (!isNaN(currentNum)) {
    result = currentNum * currentNum;
    display.value = formatResult(result);
  }
  result = null;
  currentNum = null;
});

sqrt.addEventListener("click", () => {
  let currentNum = parseFloat(display.value);
  if (!isNaN(currentNum)) {
    result = Math.sqrt(currentNum);
    display.value = formatResult(result);
  }
  currentNum = null;
  result = null;
});

equals.addEventListener("click", equalation);
