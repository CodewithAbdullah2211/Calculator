document.addEventListener("DOMContentLoaded", function() {
    const screen = document.querySelector(".screen");
    const buttons = document.querySelectorAll(".calc-button");

    let currentNumber = "";
    let firstOperand = null;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.type;
            const value = button.dataset.value;

            if (type === "number") {
                appendNumber(value);
            } else if (type === "operator") {
                handleOperator(value);
            } else if (type === "special") {
                if (value === "C") {
                    clearScreen();
                } else if (value === "delete") {
                    deleteLastCharacter();
                } else if (value === "equals") {
                    calculate();
                }
            }
        });
    });

    function clearScreen() {
        screen.textContent = "0";
        currentNumber = "";
        firstOperand = null;
        operator = null;
    }

    function deleteLastCharacter() {
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber === "") {
            currentNumber = "0";
        }
        screen.textContent = currentNumber;
    }

    function appendNumber(number) {
        if (currentNumber === "0") {
            currentNumber = "";
        }
        currentNumber += number;
        screen.textContent = currentNumber;
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentNumber);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = operate(firstOperand, inputValue, operator);
            screen.textContent = result;
            firstOperand = result;
        }

        operator = nextOperator;
        currentNumber = "";
    }

    function operate(a, b, operation) {
        switch(operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "×":
                return a * b;
            case "÷":
                if (b === 0) {
                    return "Error";
                } else {
                    return a / b;
                }
        }
    }

    function calculate() {
        const inputValue = parseFloat(currentNumber);
        if (operator) {
            const result = operate(firstOperand, inputValue, operator);
            screen.textContent = result;
            firstOperand = null;
            operator = null;
            currentNumber = result.toString();
        }
    }
});
