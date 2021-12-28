let inpuDirection = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let board = document.getElementById("board");
let scoreDiv=document.getElementById("score");
let highScoreId=document.getElementById("highScore");
let speed = 10;
let lastPaintTime = 0;
let score = 0;
// console.log(0);
snakeArr = [
  {
    x: 13,
    y: 15,
  },
];
food = { x: 6, y: 7 };

//GAme function
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    //screen render time
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snakeArr) {
  // if you bump into your self
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //part1:updating the snakeArr and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inpuDirection = { x: 0, y: 0 };

    alert("game over. press Enter key to start agian!");
    snakeArr = [
      {
        x: 13,
        y: 15,
      },
    ];
    score = 0; 
    scoreDiv.innerHTML=`Score: ${score}`;
    highScoreId.innerHTML=`High Score: ${JSON.parse( localStorage.getItem('highScore'))}`;
    food = { x: 6, y: 7 };
    
    musicSound.play();
  }


  //if snake have etten the food , increment the score and regenerate the food.
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score += 1;
    if(score>highScoreVal){
      highScoreVal=score;
      localStorage.setItem("highScore",JSON.stringify( highScoreVal))
      highScoreId.innerHTML=`High Score: ${highScoreVal}`;

    }
    scoreDiv.innerHTML=`Score: ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inpuDirection.x,
      y: snakeArr[0].y + inpuDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //moving the snake
  for (let index = snakeArr.length - 2; index >= 0; index--) {
    snakeArr[index + 1] = { ...snakeArr[index] };
  }

  snakeArr[0].x += inpuDirection.x;
  snakeArr[0].y += inpuDirection.y;
  //   --------------------// display the snakeArr and food------------
  // display the snake head or snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //display the food element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

musicSound.play();
//main logic starts here
let highScore=localStorage.getItem("highScore");
if (highScore===null){
  var highScoreVal=0;
  localStorage.setItem("highScore",JSON.stringify(highScoreVal));
}
else{
  highScoreVal=JSON.parse(highScore);
  highScoreId.innerHTML=`High Score: ${highScoreVal}`;

}
window.requestAnimationFrame(main);
document.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  //   console.log(4);
  moveSound.play();

  switch (e.key) {
    case "ArrowDown":
      // console.log(e.key);
      inpuDirection.x = 0;
      inpuDirection.y = 1;
      break;
    case "ArrowUp":
      // console.log(e.key);
      inpuDirection.x = 0;
      inpuDirection.y = -1;
      break;
    case "ArrowLeft":
      // console.log(e.key);
      inpuDirection.x = -1;
      inpuDirection.y = 0;
      break;
    case "ArrowRight":
      // console.log(e.key);
      inpuDirection.x = 1;
      inpuDirection.y = 0;
      break;
    default:
      break;
  }
});
