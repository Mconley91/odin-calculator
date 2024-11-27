const displayScreen = document.querySelector('#screen');
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
const btnClear = document.querySelector('#clear');
const allKeys = document.querySelectorAll('.key');

let operationCompelte = false;
let operatorRegex = /[\+\-\*\/\(\)\^%]/g;

allKeys.forEach((key)=>{key.addEventListener('click',()=>{ //wipes the display after each successful computation
    if(operationCompelte){
        operationCompelte = false;
        displayScreen.textContent = '';
    }
})})

btnZero.addEventListener('click',()=>{displayScreen.textContent != '' ? displayScreen.textContent += '0' : ''});
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
    displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' + ';
});
btnSubtract.addEventListener('click',()=>{
    displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' - ';
});
btnMultiply.addEventListener('click',()=>{
    displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' * ';
});
btnDivide.addEventListener('click',()=>{
    displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' / ';
});
btnEquals.addEventListener('click',()=>{
    displayScreen.textContent.match('=') ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' = ';
    operate(displayScreen.textContent);
});

function operate(string){
    let splitString = string.split(' ');
    let first = parseInt(splitString[0]);
    let operator = splitString[1];
    let second = parseInt(splitString[2]);
    switch(operator){
        case '+': displayScreen.textContent += `${first + second}`;
            break;
        case '-': displayScreen.textContent += `${first - second}`;
            break;
        case '*': displayScreen.textContent += `${first * second}`;
            break;
        case '/': displayScreen.textContent += `${first / second}`;
            break;
    }
    operationCompelte = true;
};

btnClear.addEventListener('click',()=>{
    displayScreen.textContent = '';
});

