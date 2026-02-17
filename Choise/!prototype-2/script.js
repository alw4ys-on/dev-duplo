const result = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let firstValue = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText; 
        
    if (value === "c") {
        currentInput = "";
        operator = "";
        firstValue = "";
        result.innerText = "";
        return;
    }

    if (value === "=") {
        if (firstValue !== "" && operator !== "" && currentInput !== "") {
            let a = Number(firstValue);
            let b = Number(currentInput);
            let calculation = 0;

            if (operator === "+") calculation = a + b;
            if (operator === "-") calculation = a - b;
            if (operator === "*") calculation = a * b;
            if (operator === "/") calculation = a / b;
            result.innerText = calculation;
          
            currentInput = calculation.toString();
            operator = "";
            firstValue = "";
            }
        return;
    }

    if (value === "+" || value === "*" || value === "/" || value === "-") {
        if (currentInput === "")  return;
        
        firstValue = currentInput;
        operator = value;
        currentInput = "";
        return;
    }

    currentInput += value;
    result.innerText = currentInput;

    });
});