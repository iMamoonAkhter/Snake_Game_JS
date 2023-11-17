// Game Constant
let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio("./music/food.mp3");
const gameOver = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let score = 0;
let speed = 5;
let lastPastTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};

//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if((ctime - lastPastTime)/1000 < 1/speed){
        return;
    }
    lastPastTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let index = 1; index < snakeArr.length; index++) {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    // If you bump in the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
        
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over, Press any key to play again!");
        score = 0;
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
    }

    // If you have eaten food and increment score
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
        score +=1;
        if(score > Highscore){
            HighscoreBox = score;
            localStorage.setItem("HighscoreBox", JSON.stringify(Highscore));
            document.getElementById("HighscoreBox1").innerHTML = "HighScore: " + HighscoreBox;


        }
        scoreBox.innerHTML = "Score: " + score;
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and food
    // Display Snake
    let bor = document.querySelector('#board');
    bor.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        musicSound.play();
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        bor.appendChild(snakeElement);
    })
    
    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    bor.appendChild(foodElement)
}









//Main logic start
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1} // Start the game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})


//Local Storage
let HighscoreBox = localStorage.getItem('HighscoreBox');
if(HighscoreBox === null){
    Highscore = 0;
    localStorage.setItem("HighscoreBox", JSON.stringify(Highscore))

}
else{
    Highscore = JSON.parse(HighscoreBox);
    HighscoreBox.innerHTML = "HighScore: " + HighscoreBox;
}