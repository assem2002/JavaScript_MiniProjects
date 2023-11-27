
function createGameGrid(){
    let temp = document.querySelector(".gameBoard")
    for(let row =1;row<=10;row++){
        let currentRow = document.createElement("div");
        currentRow.className= "r"+row;
        for(let column = 1 ;column <=10 ;column++){
            let currentColumn  = document.createElement("div");
            currentColumn.className = "c"+column;
            currentRow.append(currentColumn);
        }
        temp.append(currentRow)
    }
}
function createSnake(){
    for (let i = 1 ; i <=2;i++){
        let currentBlock = document.querySelector(`.r1 .c${i}`);
        currentBlock.classList.add("body")
    }
    document.querySelector(`.r1 .c3`).classList.add("head");
}

let applePosition;
let snakeBody = [(1,3),(1,2),(1,1)];

function createApple(){
    while(snakeBody.length !=100){ //loops till it finds an empty position
        let randomrow = Math.floor(Math.random()*(10-1)+1); // 10 is the max random number to get, 1 is the minimum number to get
        let randomcolumn = Math.floor(Math.random()*(10-1)+1);
        for(let snakePiece = 0 ; snakePiece<snakeBody.length ; snakePiece++){
            if (snakeBody[snakePiece][0] === randomrow && snakeBody[snakePiece][1] === randomcolumn) continue;
        }
        applePosition = (randomrow,randomcolumn);
        document.querySelector(`.r${randomrow} .c${randomcolumn}`).classList.add("apple")
        return;
    }
    window.alert("The Grid is full");
}

//button start functionality
let theButton = document.querySelector("button");
theButton.addEventListener("click",()=>{
    document.querySelector(".gameBoard").innerHTML = "";
    createGameGrid()
    createSnake()
    createApple()
})
//TO DO : figure out how to move the snake on the grid (how to traverse in the grid and how to eat the apple).



