const display = document.getElementById("display");
const operation = document.querySelectorAll(".operators");
const equals = document.getElementById("equals");
const square = document.getElementById("square");
const sqrt = document.getElementById("sqrt");
const clear = document.getElementById("clear");
const resultDisplay = document.getElementById("result");

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
  resultDisplay.textContent = "";
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
      resultDisplay.textContent =
        resultDisplay.textContent.slice(0, -1) + operator;
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

    if (operator === "*" || operator === "/") {
      resultDisplay.textContent =
        "(" + resultDisplay.textContent + ")" + operator;
    } else {
      resultDisplay.textContent += operator;
    }
  });
});

square.addEventListener("click", () => {
  let currentNum = parseFloat(display.value);

  if (!isNaN(currentNum)) {
    result = currentNum * currentNum;
    display.value = formatResult(result);

    let history = resultDisplay.textContent;

    if (history.endsWith(")")) {
      let depth = 0;
      let matchIndex = -1;

      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i] === ")") depth++;
        if (history[i] === "(") depth--;

        if (depth === 0) {
          if (i >= 3 && history.substring(i - 3, i) === "sqr") {
            matchIndex = i - 3;
          }
          break;
        }
      }
      if (matchIndex !== -1) {
        let before = history.substring(0, matchIndex);
        let lastSqr = history.substring(matchIndex);
        resultDisplay.textContent = before + "sqrt(" + lastSqr + ")";

        result = null;
        currentNum = null;
        return;
      }
    }

    let numStr = currentNum.toString();

    if (history.endsWith(numStr)) {
      history = history.substring(0, history.length - numStr.length);
    }

    resultDisplay.textContent = history + "sqr(" + currentNum + ")";
  }

  result = null;
  currentNum = null;
});

sqrt.addEventListener("click", () => {
  let currentNum = parseFloat(display.value);

  if (!isNaN(currentNum)) {
    result = Math.sqrt(currentNum);
    display.value = formatResult(result);

    let history = resultDisplay.textContent;

    if (history.endsWith(")")) {
      let depth = 0;
      let matchIndex = -1;

      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i] === ")") depth++;
        if (history[i] === "(") depth--;

        if (depth === 0) {
          if (i >= 4 && history.substring(i - 4, i) === "sqrt") {
            matchIndex = i - 4;
          }
          break;
        }
      }
      if (matchIndex !== -1) {
        let before = history.substring(0, matchIndex);
        let lastSqr = history.substring(matchIndex);
        resultDisplay.textContent = before + "sqrt(" + lastSqr + ")";

        result = null;
        currentNum = null;
        return;
      }
    }

    let numStr = currentNum.toString();

    if (history.endsWith(numStr)) {
      history = history.substring(0, history.length - numStr.length);
    }

    resultDisplay.textContent = history + "sqrt(" + currentNum + ")";
  }

  result = null;
  currentNum = null;
});

equals.addEventListener("click", () => {
  equalation();
  operator = null;
  firstNum = null;
  secondNum = null;
  resultDisplay.textContent = "";
});
