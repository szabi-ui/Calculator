'use strict';

// VARIBLES
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let isSecondNumber = false;

const lastNumber = document.querySelector('.screen__last');
const currentNumber = document.querySelector('.screen__current');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const clearAll = document.querySelector('[data-clear]');
const deleteNum = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equal]');
const decimal = document.querySelector('[data-decimal]');

// EVENT LISTENERS
numbers.forEach(number => {
    number.addEventListener('click', e => {
        if(currentNumber.innerText === '0' || isSecondNumber) {
            currentNumber.innerText = '';
            isSecondNumber = false;
        }
        currentNumber.innerText += e.target.innerText;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if(currentOperation) evaluate();
        // HERE
        firstOperand = currentNumber.innerText;
        currentOperation = e.target.innerText;
        isSecondNumber = true;
        lastNumber.innerText = `${firstOperand} ${currentOperation}`;
    })
})

equal.addEventListener('click', () => {
    secondOperand = currentNumber.innerText;
    lastNumber.innerText += ` ${secondOperand}`;
    currentNumber.innerText = operate(firstOperand, secondOperand, currentOperation);
    if(firstOperand.includes('.') || secondOperand.includes('.')) {
        return currentNumber.innerText = Number(currentNumber.innerText).toFixed(3);
    }
})

deleteNum.addEventListener('click', () => currentNumber.innerText = currentNumber.innerText.slice(0, -1));

clearAll.addEventListener('click', () => {
    currentNumber.innerText = '0';
    lastNumber.innerText = ''
    currentOperation = null;
})

decimal.addEventListener('click', (e) => {
    if(currentNumber.innerText.includes('.')) return
    currentNumber.innerText += '.';
})

// FUNCTIONS
function evaluate(item) {
// AND HERE
}

function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return null;
    } 

}

// SETS YEAR FOR COPYRIGHT
document.querySelector('.year').textContent = new Date().getFullYear();