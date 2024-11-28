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
    let splitString = displayScreen.textContent.split(' ');
    if(splitString.length > 1){
        splitString[2] == '0' ? '' : splitString[2] += '0';
    }
    if(splitString.length <= 1){
        splitString[0] == '0' ? '' : splitString[0] += '0';
    }
    displayScreen.textContent = splitString.join(' ');
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
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '+'){
        splitString[1] = ' + ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' + ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' + ';
    }
});
btnSubtract.addEventListener('click',()=>{
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    
    if(splitString.length == 3 && splitString[2] != '-'){// executes operate if equation is complete(confirmed working)
        operate(displayScreen.textContent);
        displayScreen.textContent += ' - ';
        return;
    }
    if(splitString.length == 2 && splitString[1] != '-'){ //switches operator if not minus and before second number entry (confirmed working)
        splitString[1] = ' - ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString.length == 2 && splitString[2] == undefined){ //makes the second number negative if it is empty
        displayScreen.textContent += '-';
    }
    if(splitString.length == 0 && splitString[0] == undefined){ //WIP, makes first number negative if it is empty
        displayScreen.textContent += '-';
    }
    if(splitString.length == 1 && splitString[1] == undefined && splitString[0] != '-'){ //makes operator subtraction if it is empty
        displayScreen.textContent += ' - ';
    }
});
btnMultiply.addEventListener('click',()=>{
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '*'){
        splitString[1] = ' * ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' * ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' * ';
    }
});
btnDivide.addEventListener('click',()=>{
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '/'){
        splitString[1] = ' / ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' / ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        triedToDivideByZero ? '' : displayScreen.textContent += ' / ';
    }
});
btnEquals.addEventListener('click',()=>{
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 3){
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
    let splitString = displayScreen.textContent.split('').filter((entry)=>entry != '')
    splitString.pop();
    splitString[splitString.length - 1] == ' ' ? splitString.pop() : ''; //removes whitespace if it is present
    displayScreen.textContent = splitString.join('');
})

