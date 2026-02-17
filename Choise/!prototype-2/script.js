const result = document.querySelector(".result");
const expression = document.querySelector(".expression");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let firstValue = "";

const MAX_DIGITS = 18;

function updateDisplay() {
  result.innerText = currentInput || "";

  expression.innerText =
    firstValue !== "" && operator !== ""
      ? `${firstValue} ${operator}`
      : "";
}

function resetCalculator() {
  currentInput = "";
  firstValue = "";
  operator = "";
  updateDisplay();
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;

  if (op === "/") {
    if (b === 0) return "Erro";
    return a / b;
  }
}

function canAddDigit() {
  const digits = currentInput.replace(".", "");
  return digits.length < MAX_DIGITS;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (value === "c") {
      resetCalculator();
      return;
    }

    if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
      return;
    }

    if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput = currentInput === "" ? "0." : currentInput + ".";
      }
      updateDisplay();
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput === "" && firstValue !== "") {
        operator = value;
        updateDisplay();
        return;
      }

      if (currentInput === "") return;

      if (firstValue !== "" && operator !== "") {
        let calc = calculate(
          Number(firstValue),
          Number(currentInput),
          operator
        );

        if (calc === "Erro") {
          result.innerText = "Erro";
          expression.innerText = "";
          currentInput = "";
          firstValue = "";
          operator = "";
          return;
        }

        firstValue = calc.toString();
        currentInput = "";
      } else {
        firstValue = currentInput;
        currentInput = "";
      }

      operator = value;
      updateDisplay();
      return;
    }

    if (value === "=") {
      if (firstValue === "" || operator === "" || currentInput === "") return;

      let calc = calculate(
        Number(firstValue),
        Number(currentInput),
        operator
      );

      if (calc === "Erro") {
        result.innerText = "Erro";
        expression.innerText = "";
        currentInput = "";
        firstValue = "";
        operator = "";
        return;
      }

      expression.innerText = `${firstValue} ${operator} ${currentInput} =`;
      result.innerText = calc;

      currentInput = calc.toString();
      firstValue = "";
      operator = "";
      return;
    }

    if (!isNaN(value)) {
      if (!canAddDigit()) return;

      if (currentInput === "0") currentInput = "";
      currentInput += value;
      updateDisplay();
    }
  });
});

updateDisplay();
