const bodyElement = document.querySelector('body');
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
const allBtns = document.querySelectorAll('.key');

let operationCompelte = false;
let operatorRegex = /[\+\-\*\/\(\)\^%]/g;
let result;
let triedToDivideByZero = false;

//wipes the display after trying to divide by zero after pressing any key
allBtns.forEach((key)=>{key.addEventListener('click',()=>{ 
    if(triedToDivideByZero){
        triedToDivideByZero = false;
        displayScreen.textContent = '';
    }
})});
bodyElement.addEventListener('keydown',()=>{
    if(triedToDivideByZero){
        triedToDivideByZero = false;
        displayScreen.textContent = '';
    }
})

//numpad support
btnDecimal.addEventListener('click',decimal);
btnZero.addEventListener('click',zero);
btnOne.addEventListener('click',one);
btnTwo.addEventListener('click',two);
btnThree.addEventListener('click',three);
btnFour.addEventListener('click',four);
btnFive.addEventListener('click',five);
btnSix.addEventListener('click',six);
btnSeven.addEventListener('click',seven);
btnEight.addEventListener('click',eight);
btnNine.addEventListener('click',nine);
btnAdd.addEventListener('click',addition);
btnSubtract.addEventListener('click',subtraction);
btnMultiply.addEventListener('click',multiplication);
btnDivide.addEventListener('click',division);
btnEquals.addEventListener('click',equals);
btnClear.addEventListener('click',clearDisplay);
btnDelete.addEventListener('click',backspace);

//keyboard support
bodyElement.addEventListener('keydown',(event)=>{
    event.key === '0' ? zero() :
    event.key === '1' ? one() :
    event.key === '2' ? two() :
    event.key === '3' ? three() :
    event.key === '4' ? four() :
    event.key === '5' ? five() :
    event.key === '6' ? six() :
    event.key === '7' ? seven() :
    event.key === '8' ? eight() :
    event.key === '9' ? nine() :
    event.key === '.' ? decimal() :
    event.key === '+' ? addition() :
    event.key === '-' ? subtraction() :
    event.key === '*' ? multiplication() :
    event.key === '/' ? division() :
    event.key === '=' ? equals() :
    event.key === 'Enter' ? equals() :
    event.key === 'Delete' ? clearDisplay() :
    event.key === 'Backspace' ? backspace() :
    ''
});

function zero(){
    let splitString = displayScreen.textContent.split(' ');
    if(splitString.length > 1){
        splitString[2] == '0' ? '' : splitString[2] += '0';
    }
    if(splitString.length <= 1){
        splitString[0] == '0' ? '' : splitString[0] += '0';
    }
    displayScreen.textContent = splitString.join(' ');
};
function one(){displayScreen.textContent += '1'};
function two(){displayScreen.textContent += '2'};
function three(){displayScreen.textContent += '3'};
function four(){displayScreen.textContent += '4'};
function five(){displayScreen.textContent += '5'};
function six(){displayScreen.textContent += '6'};
function seven(){displayScreen.textContent += '7'};
function eight(){displayScreen.textContent += '8'};
function nine(){displayScreen.textContent += '9'};
function decimal(){
    let decimalSplitString = displayScreen.textContent.split(' ');
    if(decimalSplitString.length > 1){
        decimalSplitString[2].match(/[\.]/) ? '' : decimalSplitString[2]  += '.';
    }
    if(decimalSplitString.length <= 1){
        decimalSplitString[0].match(/[\.]/) ? '' : decimalSplitString[0] += '.';
    }
    displayScreen.textContent = decimalSplitString.join(' ');
};
function addition(){
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '+'){
        splitString[1] = ' + ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString[0].split('')[0] == '-' && splitString.length < 2){ //identifies negative numbers and allows them to be computed
        displayScreen.textContent += ' + ';
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' + ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' + ';
    }
};
function subtraction(){
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '-'){ //swaps signs if prompted
        splitString[1] = ' - ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString[0].split('')[0] == '-' && splitString.length < 2){ //identifies negative numbers and allows them to be computed
        displayScreen.textContent += ' - ';
    }
    if(splitString.length < 2){ //prevents operators from being placed if one is present
        let firstEntrySplit = splitString[0].split('');
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' - ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' - ';
    }
};
function multiplication(){
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '*'){
        splitString[1] = ' * ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString[0].split('')[0] == '-' && splitString.length < 2){ //identifies negative numbers and allows them to be computed
        displayScreen.textContent += ' * ';
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' * ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        displayScreen.textContent += ' * ';
    }
};
function division(){
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 2 && splitString[1] != '/'){
        splitString[1] = ' / ';
        displayScreen.textContent = splitString.join('');
        return;
    }
    if(splitString[0].split('')[0] == '-' && splitString.length < 2){ //identifies negative numbers and allows them to be computed
        displayScreen.textContent += ' / ';
    }
    if(splitString.length < 2){
        displayScreen.textContent.match(operatorRegex) ? '' : displayScreen.textContent == '' ? '' : displayScreen.textContent += ' / ';
    }
    if(splitString.length == 3){
        operate(displayScreen.textContent);
        triedToDivideByZero ? '' : displayScreen.textContent += ' / ';
    }
};
function equals(){
    let splitString = displayScreen.textContent.split(' ').filter((entry)=>entry != '');
    if(splitString.length == 3){
        operate(displayScreen.textContent);
    }
};
function clearDisplay(){
    displayScreen.textContent = '';
};
function backspace(){
    let splitString = displayScreen.textContent.split('').filter((entry)=>entry != '')
    splitString.pop();
    splitString[splitString.length - 1] == ' ' ? splitString.pop() : ''; //removes whitespace if it is present
    displayScreen.textContent = splitString.join('');
};

function operate(string){
    if(displayScreen.textContent == '0 / 0'){ 
        displayScreen.textContent = 'please do not divide by zero';
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