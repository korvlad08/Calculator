const inputElement = document.getElementById("display");
const button = document.getElementById("calculate");
const errorElement = document.getElementById("error");

function evaluateExpression(inputElement) {
  const expression = inputElement.value;

  const operator = expression.match(/[\+\-\*\/]/)[0];

  const operands = expression.split(operator).map(Number);

  return {
    operator,
    operand1: operands[0],
    operand2: operands[1],
  };
}

button.addEventListener("click", () => {
  const { operator, operand1, operand2 } = evaluateExpression(inputElement);
  switch (operator) {
    case "+":
      inputElement.value = operand1 + operand2;
      break;
    case "-":
      inputElement.value = operand1 - operand2;
      break;
    case "*":
      inputElement.value = operand1 * operand2;
      break;
    case "/":
      inputElement.value = operand1 / operand2;
      break;
    default:
      errorElement.textContent = "Invalid operator. Please use +, -, *, or /.";
      break;
  }
});
