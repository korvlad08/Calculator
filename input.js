import {
  operator,
  isOperatorClicked,
  resetOperatorFlag,
  firstNum,
} from "./script.js";

const input = document.getElementById("display");
const buttons = document.querySelectorAll(".num");
const changeSign = document.getElementById("changeSign");
const dot = document.getElementById("dot");
const resultDisplay = document.getElementById("result");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (input.value === "0") {
      input.value = "";
    }
    if (isOperatorClicked) {
      input.value = "";
    }
    if (resultDisplay.textContent.endsWith(")")) {
      resultDisplay.textContent = resultDisplay.textContent.slice(
        0,
        resultDisplay.textContent.indexOf("sqr"),
      );
      input.value = "";
    }
    if (firstNum === null && input.value.length < 15) {
      input.value += button.innerText;
    } else if (input.value.length < 15) {
      input.value += button.innerText;
      resultDisplay.textContent += button.innerText;
    }
    resetOperatorFlag();
  });
});

changeSign.addEventListener("click", () => {
  if (input.value === "0" || input.value === "Infinity") {
    return;
  } else if (input.value.startsWith("-")) {
    input.value = input.value.slice(1);
  } else {
    input.value = "-" + input.value;
  }
  resultDisplay.textContent += input.value;
});

dot.addEventListener("click", () => {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
  resultDisplay.textContent += input.value;
});
