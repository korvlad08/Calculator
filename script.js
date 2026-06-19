const display = document.getElementById("display");
const operation = document.querySelectorAll(".operators");
const equals = document.getElementById("equals");
const square = document.getElementById("square");
const sqrt = document.getElementById("sqrt");
const clear = document.getElementById("clear");

let firstNum = null;
let secondNum = null;
export let operator = null;
let result = null;
export let isOperatorClicked = false;

export function resetOperatorFlag() {
  isOperatorClicked = false;
}

function formatResult(number) {
  const numStr = String(number);

  if (Math.abs(number) >= 1e15) {
    return number.toExponential(9);
  }

  return parseFloat(number.toFixed(14)).toString().slice(0, 14);
}

let equalation = () => {
  if (firstNum === null || operator === null) {
    return;
  }
  secondNum = parseFloat(display.value);
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

  return result;
};

clear.addEventListener("click", () => {
  display.value = "0";
  firstNum = null;
  secondNum = null;
  operator = null;
  result = null;
});

operation.forEach((op) => {
  op.addEventListener("click", () => {
    const currentNum = parseFloat(display.value);

    if (isOperatorClicked) {
      operator = op.innerText;
      console.log("Оператор змінено на:", operator);
      return;
    }

    if (!isNaN(currentNum)) {
      if (firstNum === null) {
        firstNum = currentNum;
      } else if (operator) {
        firstNum = equalation();
        display.value = firstNum;
      }
    }

    isOperatorClicked = true;
    operator = op.innerText;

    console.log("Поточний оператор:", operator, "Перше число:", firstNum);
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

equals.addEventListener("click", () => {
  equalation();
  operator = null;
  firstNum = null;
  secondNum = null;
});
