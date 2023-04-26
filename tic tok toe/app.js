let btnReference = document.querySelectorAll(".button-bhaiya");
let alertReference = document.querySelector(".alert");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let smplMsg = document.getElementById("message");
let musicSound = new Audio("s1.mp3");
let adSound = new Audio("w1.mp3");
let newSound = new Audio("gs1.mp3");
let drawSound = new Audio("d1.mp3");
//winnning patterns in the form of array

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

//player 'x' play first
let xTurn = true;
let count =0;

//disable all butons after won
const disableButtons = () =>{
    btnReference.forEach((element) => (element.disabled = true));

    //enable alertreference
    alertReference.classList.remove("hide"); 
};

//enable all buttons (for playing new game and restart)
const enableButtons =() => {
    btnReference.forEach((element)=> {
        element.innerText="";
        element.disabled = false;
    });

    // disable alert popup of new game
    alertReference.classList.add("hide");
};


//Function for draw
const drawFunction = () => {
    disableButtons();
    drawSound.play();
    smplMsg.innerHTML = "&#x1F60E; <br> It's a Draw";
  };
//this function executed after player wons the match
const winFunction = (letter) => {
    disableButtons();
    adSound.play();
    if (letter == "X") {
        smplMsg.innerHTML = "&#x1F389; <br> 'X' Wins";
      } else {
        smplMsg.innerHTML = "&#x1F389; <br> 'O' Wins";
      }
};
//new game
newgameBtn.addEventListener("click", () =>{
    count=0;
    newSound.play();
    enableButtons();
});
//for restart the game
restartBtn.addEventListener("click", ()=> {
    count=0;
    newSound.play();
    enableButtons();
});
//winnning logic is here
const winChecker = () => {
    //loop on all winnning pattens
    for(let i of winningPattern)
    {
        let[element1 , element2 , element3] = [
            btnReference[i[0]].innerText,
            btnReference[i[1]].innerText, 
            btnReference[i[2]].innerText,
        ];
          //conition i all are match 
    //if all are empty
        if(element1 !="" && (element2!="") & (element3!=""))
        {
        if(element1==element2 && element2==element3)
        {
            //winfunction to describe which symbol wins
            winFunction(element1);
        }
    }
    }
};

//display x/y on click

btnReference.forEach((element) => {
    element.addEventListener("click", () =>{
        
        if(xTurn)
        {
            musicSound.play();
            xTurn = false;
            element.innerText="X";
            element.disabled=true;
        }
        else{
            musicSound.play();
            xTurn= true;
            element.innerText="O";
            element.disabled=true;
        }
        //we are going to implement count on each click
        count +=1;
        if(count == 9)
        {
            drawFunction();
            //It's a draw since there are a total 9 boxes
        }
        winChecker();
    });
});
window.onload = enableButtons;

 