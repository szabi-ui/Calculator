'use strict';
/*****************************
       VARIABLES
*****************************/
const currentOperationScreen = document.querySelector('.screen__current-calculation');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const clearAll = document.querySelector('[data-clear]');
const deleteNum = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equal]');
// vars used for strings
const lastOperationScreen = document.querySelector('.screen__last-calculation');
const firstOperandSpan = lastOperationScreen.querySelector('.firstOperand')
const secondOperandSpan = lastOperationScreen.querySelector('.secondOperand');
const operatorSpan = lastOperationScreen.querySelector('.operator-span')
/*****************************
       EVENT LISTENERS
*****************************/
numbers.forEach(number => {
    number.addEventListener('click', e => {
        if(operatorSpan.innerText == '') {
            if(firstOperandSpan.innerText.includes('.') && e.target.innerText == '.') {
                return
            }
            else {
                firstOperandSpan.innerText += e.target.innerText;
            }
        } else {
            if(secondOperandSpan.innerText.includes('.') && e.target.innerText == '.') {
                return
            }
            else {
                secondOperandSpan.innerText += e.target.innerText;
            }
        }
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if(firstOperandSpan.innerText != '' && secondOperandSpan.innerText == '') {
            operatorSpan.innerText = e.target.innerText;
        }
        else if(firstOperandSpan != '' && secondOperandSpan.innerText != '') {
            let calculation = operate(firstOperandSpan.innerText, secondOperandSpan.innerText, operatorSpan.innerText)
            havesDot(calculation);
            calculation.toString().includes('.') ? 
                    firstOperandSpan.innerText = calculation.toFixed(3) :
                    firstOperandSpan.innerText = calculation; 
            operatorSpan.innerText = e.target.innerText;
            secondOperandSpan.innerText = '';
        }
        else if(firstOperandSpan.innerText == '' && currentOperationScreen.innerText != '') {
            firstOperandSpan.innerText = currentOperationScreen.innerText;
            operatorSpan.innerText = e.target.innerText
        }
    })
})

deleteNum.addEventListener('click', () => {
    if(secondOperandSpan.innerText != '') {
        secondOperandSpan.innerText = secondOperandSpan.innerText.slice(0, -1);
    }
    else if(operatorSpan.innerText != '') {
        operatorSpan.innerText = '';
    }else if(firstOperandSpan.innerText != '') {
        firstOperandSpan.innerText = firstOperandSpan.innerText.slice(0, -1);
    }
});
equal.addEventListener('click', compute)

clearAll.addEventListener('click', resetAll)
/*****************************
       FUNCTIONS
*****************************/
function compute() {
    if(firstOperandSpan.innerText != '' && operatorSpan.innerText != '' && secondOperandSpan.innerText != '') {
        let result = operate(firstOperandSpan.innerText, secondOperandSpan.innerText, operatorSpan.innerText)
        havesDot(result);
        firstOperandSpan.innerText = ''
        secondOperandSpan.innerText = ''
        operatorSpan.innerText = ''
    }
    else {
        return alert('Wot you doing mon?');
    } 
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
    if(b == '0') {
        alert('Division by 0 is not possible ma dude!');
        return '';
    }
    else {
        return a / b;
    }
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        default:
            return;
    }
    return result;
}

function resetAll() {
    firstOperandSpan.innerText = ''
    secondOperandSpan.innerText = ''
    operatorSpan.innerText = ''
    currentOperationScreen.innerText = '';
}

function havesDot(item) {
    if(item.toString().includes('.')) {
        currentOperationScreen.innerText = item.toFixed(3)
    }
    else {
        currentOperationScreen.innerText = item;
    }
}

document.querySelector('.year').textContent = new Date().getFullYear();