const display = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.innerText));
});

function handleInput(value) {

    if (value === "AC") {
        currentInput = "";
        display.value = "";
        return;
    }

    if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
        return;
    }

    if (value === "=") {
        try {
            currentInput = calculate(currentInput);
            display.value = currentInput;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
        return;
    }

    // Prevent double operators
    const operators = ["+", "-", "*", "/", "%"];
    const lastChar = currentInput.slice(-1);

    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    currentInput += value;
    display.value = currentInput;
}

function calculate(expression) {
    return Function('"use strict";return (' + expression + ')')();
}


document.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
        handleInput(e.key);
    }

    if (e.key === "Enter") handleInput("=");
    if (e.key === "Backspace") handleInput("DEL");
    if (e.key === "Escape") handleInput("AC");
});
