const input = document.getElementById("display");
const buttons = document.querySelectorAll(".num");
const clear = document.getElementById("clear");
const changeSign = document.getElementById("changeSign");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (input.value.length < 15) {
      input.value += button.innerText;
    }
  });
});

clear.addEventListener("click", () => {
  input.value = null;
});

changeSign.addEventListener("click", () => {
  if (input.value.startsWith("-")) {
    input.value = input.value.slice(1);
  } else {
    input.value = "-" + input.value;
  }
});
