const otherButtons = document.querySelectorAll('.other-buttons');
const textAreaElement = document.getElementById('textAreaElement');
const clearBtn = document.querySelector('.clear-button');
const operatorButton = document.querySelectorAll('.operator-button');
const resultButton = document.getElementById('result-button');
const backspaceButton = document.getElementById('backspace-button');
const historyButton = document.getElementById('history-button');
const unOrderedList = document.querySelector('.ul-styles');
const historyDiv = document.querySelector('.history');
const outerContainer =document.querySelector('.outer');
const closeIcon = document.querySelector('.icon-styling');
const errorDisplay = document.querySelector('.errorDisplay-div');

const globalArray = [];
const historyArray =[];
let currentValue = '';


const handleOtherButtons = (event) =>{
    let oldValue;    
    
  oldValue = textAreaElement.value;
 // console.log(oldValue);
 
  textAreaElement.innerHTML = oldValue + event.target.value;

  currentValue = currentValue + event.target.value;
  //console.log(currentValue);
 }

 const handleOperatorButtons = (event) =>{

     globalArray.push(currentValue);
    // console.log(currentValue);
     currentValue = '';
     globalArray.push(event.target.value);
     const oldValue = textAreaElement.value;
     //console.log(textAreaElement.value);
     textAreaElement.innerHTML = oldValue + event.target.value;
 }

otherButtons.forEach((nodeList)=>{
    nodeList.addEventListener('click',handleOtherButtons);

});

operatorButton.forEach((nodeList)=>{
    nodeList.addEventListener('click',handleOperatorButtons);

})
clearBtn.addEventListener('click',()=>{
     textAreaElement.innerHTML=' ';
});

function validateInput(input) {
    const regex = /^[+-]?\d+(\.\d+)?$/;
    console.log(regex.test(input));
    return regex.test(input);
  }

const calculateResult = () =>{
    //console.log(currentValue)
    globalArray.push(currentValue);
    console.log(globalArray);
    currentValue = '';
    let a = globalArray.shift();
    let operator = globalArray.shift();
    console.log(operator);
    let b = globalArray.shift();
    console.log(a,b);
    if (!validateInput(a) || !validateInput(b)) {
        displayErrors();
        return;
      }
      a=parseFloat(a);
      b=parseFloat(b);
    let result;
    switch (operator) {
        case '+':
            result= a+b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a/b;
            break;
        case '%':
            result = a%b;
            break;
        default:
            return;
    }

 


  textAreaElement.innerHTML = result;
  let temp = `${a} ${operator} ${b} = ${result}`;
  if(historyArray.length == 5)
  {
    console.log('Array has reached 5 elements');
    historyArray.shift();
    historyArray.push(temp);
  }
  else  historyArray.push(temp);
  //console.log(historyArray);

}

const backspaceFunction = () =>{
    let currentValue = textAreaElement.value;
    textAreaElement.innerHTML = currentValue.slice(0,-1); 
}

const historyFunction = () =>{
    if(historyDiv.style.display == 'block')
    return;
    else if(historyArray.length === 0 ) 
    { outerContainer.className = 'outer-later'
    historyDiv.style.display='block';
        unOrderedList.innerHTML = `<li>No past calculations to   display</li>`
    }
    else
    {
    outerContainer.className = 'outer-later'
    historyDiv.style.display='block';
    historyArray.forEach((arr)=>(
        unOrderedList.innerHTML += `<li>${arr}</li>`
    ));
}}

const closeHistoryFunction = () =>{
    outerContainer.className = 'outer';
    historyDiv.style.display = 'none';
    unOrderedList.innerHTML='';
}

const displayErrors = () =>{
    errorDisplay.style.display='block';
 setTimeout(()=>{
    errorDisplay.style.display='none';
 },3000)


}
resultButton.addEventListener('click',calculateResult);
backspaceButton.addEventListener('click',backspaceFunction);
historyButton.addEventListener('click',historyFunction);
closeIcon.addEventListener('click',closeHistoryFunction);
