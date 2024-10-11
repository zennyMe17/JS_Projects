const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//intilaise game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes[position[0]].classList.remove("win");
    boxes[position[1]].classList.remove("win");
    boxes[position[2]].classList.remove("win");

}

initGame();

boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position)=>{
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
        
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "0";
                boxes.forEach(box=>{
                    box.style.pointerEvents = "none";
                })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0"
    }
    else{
        currentPlayer = "X";
    }      
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

newGameBtn.addEventListener("click",initGame);