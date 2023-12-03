let snakeBody = [[1,3],[1,2],[1,1]];
let applePosition;
const moveY = [0,-1,1,0];
const moveX = [-1,0,0,1];
let currentMove =[2,2,2];
let score;
let scoreElement = document.querySelector(".score span");
const gameOverSound = new Audio('sounds/mixkit-arcade-retro-game-over-213.wav')
const stepSound = new Audio("sounds/zapsplat_multimedia_game_sound_retro_arcade_jump_hop_bright_92279.mp3")
const winSound = new Audio("sounds/mixkit-instant-win-2021.wav")


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
    document.querySelector(`.r${snakeBody[0][0]} .c${snakeBody[0][1]}`).classList.add("head");
    for (let i = 1 ; i <snakeBody.length;i++){
        let currentBlock = document.querySelector(`.r${snakeBody[i][0]} .c${snakeBody[i][1]}`);
        currentBlock.classList.add("body")
    }
}


function createApple(){
    while(snakeBody.length !=100){ //loops till it finds an empty position
        let randomrow = Math.floor(Math.random()*(10-1)+1); // 10 is the max random number to get, 1 is the minimum number to get
        let randomcolumn = Math.floor(Math.random()*(10-1)+1);
        let flag =0;
        for(let snakePiece = 0 ; snakePiece<snakeBody.length ; snakePiece++){
            if (snakeBody[snakePiece][0] === randomrow && snakeBody[snakePiece][1] === randomcolumn){
                flag =1;
                break;
            }
        }
        if (flag) continue;
        applePosition = [randomrow,randomcolumn];
        document.querySelector(`.r${randomrow} .c${randomcolumn}`).classList.add("apple")
        return;
    }
    window.alert("The Grid is full,You cracked my game!!");
}

//button start functionality
let intervalID = 0;
let theButton = document.querySelector("button");
theButton.addEventListener("click",()=>{
    stepSound.play()
    currentMove =[2,2,2];
    snakeBody = [[1,3],[1,2],[1,1]];
    score =0;
    scoreElement.innerHTML =`${score}`;
    document.querySelector(".gameBoard").innerHTML = "";
    createGameGrid()
    createSnake()
    createApple()
    // if (intervalID) clearTimeout(intervalID)
    window.clearInterval(intervalID)
    intervalID = setInterval(moveSnake,500)
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
function gameover(){
    let message = document.createElement("div");
    message.className = "message";
    let text = document.createElement("span")
    text.innerHTML ="GameOver!";
    gameOverSound.play()
    message.append(text);
    document.querySelector(".gameBoard").appendChild(message);
    clearTimeout(intervalID)

} 

function moveSnake(){
    stepSound.play()
    if (snakeBody[0][0] +moveX[currentMove[0]] === applePosition[0] && snakeBody[0][1]+moveY[currentMove[0]] === applePosition[1]){
        winSound.play()
        let dd = document.querySelector(`.r${applePosition[0]} .c${applePosition[1]}`);
        dd.classList.remove("apple");
        dd.classList.add("head");
        let a = document.querySelector(`.r${snakeBody[0][0]} .c${snakeBody[0][1]}`);
        a.classList.remove("head");
        a.classList.add("body")
        snakeBody.unshift(applePosition);
        currentMove.unshift(currentMove[0]);
        createApple();
        score++;
        scoreElement.innerHTML =`${score}`;
        return;
    }

    for(let i = 0 ; i<snakeBody.length ; i++){
        let currentElement = document.querySelector(`.r${snakeBody[i][0]} .c${snakeBody[i][1]}`);
        snakeBody[i][0]+=moveX[currentMove[i]];
        snakeBody[i][1]+=moveY[currentMove[i]];

        //if i hit wall
        if (snakeBody[0][0] >10 ||snakeBody[0][1]>10 || snakeBody[0][0] <1 || snakeBody[0][1]<1 ) {
            gameover()
            console.log("Hit Wall")
        }

        //If i ate myself
        let isItMe = document.querySelector(`.r${snakeBody[0][0]} .c${snakeBody[0][1]}`);
        if (isItMe.classList.contains("body")) gameover()
        //moving no next block, based on currentmove array.
        let nextElement = document.querySelector(`.r${snakeBody[i][0]} .c${snakeBody[i][1]} `);
        nextElement.classList.add( currentElement.classList[1]);
        currentElement.classList.remove("head","body");
    }

    //shift the movement of the snake along the body.
    for(let i = currentMove.length-1 ; i>=1 ; i--){
        currentMove[i] =currentMove[i-1];
    }

        
    

}






