/**
 * Core logic for the calculator app
 * Contains basic operations like addition and multiplication
 */

// Get the result div that outputs the sum
const resultDiv = document.getElementById("result_div")
var result = null

// Const values for operation values
const operatorValues = ['+', '-', '/', '*']

var calcQueue = []
document.body.onload = createButtons;
console.log("Hello world");

var calcButton = document.getElementById("calc_button");
calcButton.addEventListener("click", calculateClicked);
var clearButton = document.getElementById("clear_button")
clearButton.addEventListener("click", clearClicked)


function createButtons(){
    createOperationButtons()
    createNumberButtons()
}

/**
 * Creates the operation buttons and adds a listener. 
 */
function createOperationButtons(){

    const body = document.getElementById("operations_div")
    for(let i=0;i<operatorValues.length;i++){
        const newDiv = document.createElement("button-div");
        const newOperatorButton = document.createElement("button");
        newOperatorButton.textContent = String(operatorValues[i]);
        newOperatorButton.addEventListener("click", function (e) {
            if(calcQueue.length == 0 || typeof(calcQueue[calcQueue.length-1]) === "string") {
                console.log("No number added or operator already exists")
                return
            }
            calcQueue.push(this.textContent);
            resultDiv.textContent += this.textContent
        })
        newDiv.appendChild(newOperatorButton)
        body.appendChild(newDiv)
 
    }
}


/**
 * Creates the number buttons and adds a listener. 
 */
function createNumberButtons() {
    const body = document.getElementById("numbers_div")
    for(let num=0;num<10;num++){
        const newDiv = document.createElement("button-div");
        const newNumButton = document.createElement("button");
        newNumButton.textContent = String(num);
        newNumButton.addEventListener("click", function (e) {
            if(calcQueue.length == 0 || typeof(calcQueue[calcQueue.length-1]) === "string"){
                calcQueue.push(Number(this.textContent));
                resultDiv.textContent += this.textContent
                return
            }
            
            else if(typeof(calcQueue[calcQueue.length-1])==="number"){
                curr_num = calcQueue[calcQueue.length-1];
                curr_num *= 10;
                curr_num += Number(this.textContent);
                calcQueue[calcQueue.length-1] = curr_num
                resultDiv.textContent += this.textContent
            }
        })
        newDiv.appendChild(newNumButton)
        body.appendChild(newDiv)
 
    }
}


function calculateClicked() {
    console.log(calcQueue)
    curr_oper = ''
    while(calcQueue.length > 0){
        console.log("Result %s", result)
        popped = calcQueue.shift()
        console.log("Current value %s", popped)
        
        if(typeof(popped) === "number"){
            if(result === null){
                result = popped
                continue
            }
            console.log("Curr oper %s", curr_oper)
            switch(curr_oper) {
                case '+':
                    result+=popped
                    break
                case '-':
                    result-=popped
                    break
                case '/':
                    result/=popped
                    break
                case '*':
                    result*=popped
                    break
                default:
                    console.log("Invalid operator")
            }
        }
        else{curr_oper=popped}

    }
    calcQueue = [result]
    resultDiv.textContent = String(result)
}

function clearClicked(){
    calcQueue = []
    resultDiv.textContent = ""
    result = null

}