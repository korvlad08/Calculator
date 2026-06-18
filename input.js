const input = document.getElementById("display");
const buttons = document.querySelectorAll(".num");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (input.value.length < 15) {
      input.value += button.innerText;
    }
  });
});
