const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the games
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //for making empty the box on UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialize box with css proprties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

//writing 'swapTurn' function
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;   //UI update
}

//writing the 'checkGameOver' function
function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should non empty and exactly same value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check if winner is 'X'
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer events when winner declers
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            });

            //now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner then return
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //if board is filled then game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game is Tied";
        newGameBtn.classList.add("active");
    }
}

//Writing 'handleclick' function
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;    //this line will changes in UI
        gameGrid[index] = currentPlayer;    //this line will changes in grid
        boxes[index].style.pointerEvents = "none";
        swapTurn(); //swap kro turn ko
        checkGameOver();    //check anyone wins the game 
    }
}

//Applying Event Listner on all the boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index); //calling the function passing the 'index' because we need to know which box is clicked 
    })
});

newGameBtn.addEventListener("click", initGame);