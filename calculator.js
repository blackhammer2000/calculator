class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearAll();
    }

    clearAll() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        let currentOperandArray = Array.from(this.currentOperand);
        currentOperandArray.pop();
        this.currentOperand = currentOperandArray.join('');
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    selectOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.evaluate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    evaluate() {
        let returnedResult;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case '÷':
                returnedResult = previous / current;
                break;
            case '×':
                returnedResult = previous * current;
                break;
            case '+':
                returnedResult = previous + current;
                break;
            case '-':
                returnedResult = previous - current;
                break;
            default:
                return;
        }
        this.currentOperand = returnedResult;
        this.operation = undefined;
        this.previousOperand = '';
    }

    retrieveDisplayedNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en',
                { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.retrieveDisplayedNumber(this.currentOperand);
        this.previousOperandTextElement.textContent =
            this.operation == undefined ? this.operation = '' : `${this.retrieveDisplayedNumber(this.previousOperand)} ${this.operation}`;
    }
}
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.textContent);
        //console.log(numberButton.textContent)
        calculator.updateDisplay();
    })
});

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        calculator.selectOperation(operationButton.textContent);
        //console.log(operationButton.textContent)
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.evaluate();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clearAll();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

