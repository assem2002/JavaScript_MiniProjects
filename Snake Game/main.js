
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
let snakeBody = [[1,3],[1,2],[1,1]];
let applePosition;
function createSnake(){
    snakeBody = [[1,3],[1,2],[1,1]];
    for (let i = 1 ; i <=2;i++){
        let currentBlock = document.querySelector(`.r1 .c${i}`);
        currentBlock.classList.add("body")
    }
    document.querySelector(`.r1 .c3`).classList.add("head");
}


function createApple(){
    while(snakeBody.length !=100){ //loops till it finds an empty position
        let randomrow = Math.floor(Math.random()*(10-1)+1); // 10 is the max random number to get, 1 is the minimum number to get
        let randomcolumn = Math.floor(Math.random()*(10-1)+1);
        for(let snakePiece = 0 ; snakePiece<snakeBody.length ; snakePiece++){
            if (snakeBody[snakePiece][0] === randomrow && snakeBody[snakePiece][1] === randomcolumn) continue;
        }
        applePosition = [randomrow,randomcolumn];
        document.querySelector(`.r${randomrow} .c${randomcolumn}`).classList.add("apple")
        return;
    }
    window.alert("The Grid is full");
}

let moveY = [0,-1,1,0];
let moveX = [-1,0,0,1];
let currentMove =[2,2,2];
//button start functionality
let intervalID = 0;
let theButton = document.querySelector("button");
theButton.addEventListener("click",()=>{
    document.querySelector(".gameBoard").innerHTML = "";
    createGameGrid()
    createSnake()
    createApple()
    // if (intervalID) clearTimeout(intervalID)
    window.clearInterval(intervalID)
    intervalID = setInterval(moveSnake,200)
})


window.addEventListener("keydown",(event)=> {
    switch(event.key){
        case "ArrowUp":
            if (currentMove[0] != 0 && currentMove[0] != 3)
                currentMove[0] = 0;
            break;
        case "ArrowLeft":
            if (currentMove[0] != 1 && currentMove[0] != 2)
                currentMove[0]=  1;
            break;
        case "ArrowRight":
            if (currentMove[0] != 1 && currentMove[0] != 2)
                currentMove[0]=  2;
            break;
        case "ArrowDown":
            if (currentMove[0] != 0 && currentMove[0] != 3)
                currentMove[0]=  3;
            break;
    }

})

function moveSnake(){
    for(let i = 0 ; i<snakeBody.length ; i++){
        let currentElement = document.querySelector(`.r${snakeBody[i][0]} .c${snakeBody[i][1]}`);
        snakeBody[i][0]+=moveX[currentMove[i]];
        snakeBody[i][1]+=moveY[currentMove[i]];
        if (snakeBody[i][0] >10 ||snakeBody[i][1]>10) console.error("Wall hit!");
        let nextElement = document.querySelector(`.r${snakeBody[i][0]} .c${snakeBody[i][1]} `);
        nextElement.classList.add( currentElement.classList[1]);
        currentElement.classList.remove("head","body");
    }
    for(let i = currentMove.length-1 ; i>=1 ; i--){
        currentMove[i] =currentMove[i-1];
    }

}

//TO DO : write a function to handle the eating of the apple (color the apple block and place its position in the begining of snakeBody array)
//and then call create apple function.
//TO DO : handle eating yourself and hiting the wall.
//TO DO : Keep score.
//TO DO : Make sounds.





