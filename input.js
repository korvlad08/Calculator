import { operator, isOperatorClicked, resetOperatorFlag } from "./script.js";

const input = document.getElementById("display");
const buttons = document.querySelectorAll(".num");
const changeSign = document.getElementById("changeSign");
const dot = document.getElementById("dot");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (input.value === "0") {
      input.value = "";
    }
    if (isOperatorClicked) {
      input.value = "";
    }
    if (input.value.length < 15) {
      input.value += button.innerText;
    }
    console.log(button.innerText);

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
});

dot.addEventListener("click", () => {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
});
