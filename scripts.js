const displayScreen = document.querySelector('#screen');
const btnDecimal = document.querySelector('#decimal')
const btnZero = document.querySelector('#zero');
const btnOne = document.querySelector('#one');
const btnTwo = document.querySelector('#two');
const btnThree = document.querySelector('#three');
const btnFour = document.querySelector('#four');
const btnFive = document.querySelector('#five');
const btnSix = document.querySelector('#six');
const btnSeven = document.querySelector('#seven');
const btnEight = document.querySelector('#eight');
const btnNine = document.querySelector('#nine');
const btnAdd = document.querySelector('#add');
const btnSubtract = document.querySelector('#subtract');
const btnMultiply = document.querySelector('#multiply');
const btnDivide = document.querySelector('#divide');
const btnEquals = document.querySelector('#equals');
const btnDelete = document.querySelector('#delete');
const btnClear = document.querySelector('#clear');
const allKeys = document.querySelectorAll('.key');

let operationCompelte = false;
let operatorRegex = /[\+\-\*\/\(\)\^%]/g;
let result;
let triedToDivideByZero = false;

allKeys.forEach((key)=>{key.addEventListener('click',()=>{ //wipes the display after trying to divide by zero
    if(triedToDivideByZero){
        triedToDivideByZero = false;
        displayScreen.textContent = '';
    }
})})

btnDecimal.addEventListener('click',()=>{ 
    let decimalSplitString = displayScreen.textContent.split(' ');
    if(decimalSplitString.length > 1){
        decimalSplitString[2].match(/[\.]/) ? '' : decimalSplitString[2]  += '.';
    }
    if(decimalSplitString.length <= 1){
        decimalSplitString[0].match(/[\.]/) ? '' : decimalSplitString[0] += '.';
    }
    displayScreen.textContent = decimalSplitString.join(' ');
})

btnZero.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ');
    if(decimalSplitString.length > 1){
        decimalSplitString[2] == '0' ? '' : decimalSplitString[2] += '0';
    }
    if(decimalSplitString.length <= 1){
        decimalSplitString[0] == '0' ? '' : decimalSplitString[0] += '0';
    }
    displayScreen.textContent = decimalSplitString.join(' ');
});

btnOne.addEventListener('click',()=>{displayScreen.textContent += '1'});
btnTwo.addEventListener('click',()=>{displayScreen.textContent += '2'});
btnThree.addEventListener('click',()=>{displayScreen.textContent += '3'});
btnFour.addEventListener('click',()=>{displayScreen.textContent += '4'});
btnFive.addEventListener('click',()=>{displayScreen.textContent += '5'});
btnSix.addEventListener('click',()=>{displayScreen.textContent += '6'});
btnSeven.addEventListener('click',()=>{displayScreen.textContent += '7'});
btnEight.addEventListener('click',()=>{displayScreen.textContent += '8'});
btnNine.addEventListener('click',()=>{displayScreen.textContent += '9'});

btnAdd.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(decimalSplitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' + ';
    }
    if(decimalSplitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' + ';
    }
});
btnSubtract.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    // if(decimalSplitString[1] != '+'){

    // }
    if(decimalSplitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' - ';
    }
    if(decimalSplitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' - ';
    }
});
btnMultiply.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(decimalSplitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' * ';
    }
    if(decimalSplitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' * ';
    }
});
btnDivide.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(decimalSplitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' / ';
    }
    if(decimalSplitString.length == 3){
        operate(displayScreen.textContent);
        triedToDivideByZero ? '' : displayScreen.textContent += ' / ';
    }
});
btnEquals.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(decimalSplitString.length == 3){
        operate(displayScreen.textContent);
    }
});

function operate(string){
    if(displayScreen.textContent == '0 / 0'){ //don't divide by zero plz
        displayScreen.textContent = 'ha ha ha';
        triedToDivideByZero = true;
        return;
    }
    let splitString = string.split(' ');
    let first = parseFloat(splitString[0]);
    let operator = splitString[1];
    let second = parseFloat(splitString[2]);

    switch(operator){
        case '+': result = `${Math.round(((first + second) + Number.EPSILON) * 100) / 100}`;
            break;
        case '-': result = `${Math.round(((first - second) + Number.EPSILON) * 100) / 100}`;
            break;
        case '*': result = `${Math.round(((first * second) + Number.EPSILON) * 100) / 100}`;
            break;
        case '/': result = `${Math.round(((first / second) + Number.EPSILON) * 100) / 100}`;
            break;
    }
    displayScreen.textContent = result;
    operationCompelte = true;
};

btnClear.addEventListener('click',()=>{
    displayScreen.textContent = '';
});

btnDelete.addEventListener('click',()=>{
    let decimalSplitString = displayScreen.textContent.split('').filter((entry)=>entry != '')
    decimalSplitString.pop();
    decimalSplitString[decimalSplitString.length - 1] == ' ' ? decimalSplitString.pop() : ''; //removes whitespace if it is present
    displayScreen.textContent = decimalSplitString.join('');
})

