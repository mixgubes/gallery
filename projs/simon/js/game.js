
var counter = 1;
var userCounter = 0;
var start;
var newRandom;
var randomData=[];
var user;
var gameStart = document.getElementById("startGame");
var bord = document.getElementById("bord");
var userClicked = false;
var buttonDisplay = 0;
var cumputerTurn = true;


bord.hidden = true;

// the user pressed the start button
function startClicked(){
    //console.log('start clicked');
    gameStart.hidden = true;
    bord.hidden = false;
    start = true;
    if (start == true){
    start=false;
    gameLoop();
    }
}

// game loop
function gameLoop(){
    //console.log('game loop started');
    setTimeout(function(){
    alert('level ' + counter);
    randomProducer();
    },500)														            
}

// produce a random number 
function randomProducer(){
    //console.log('random producer started');
    newRandom = Math.random(0,1);
    if(newRandom <= 0.25){
        newRandom = 1;
    }else if(newRandom >= 0.25 && newRandom <= 0.5){
        newRandom = 2;
    }else if(newRandom >= 0.5 && newRandom <= 0.75){
        newRandom = 3;
    }else if(newRandom >= 0.75){
        newRandom = 4;
    }
    randomData[counter-1] = newRandom;
    //console.log('the random number is '+ newRandom);
    display();
}

    //display the random data
    function display(){
    //console.log('randomData.length'+ randomData.length);
        cumputerTurn = true;
        if(buttonDisplay <= counter){
           
       if(randomData[buttonDisplay] ==1){
        blue.classList.add('hide');
        setTimeout(function(){
            blue.classList.remove('hide');
            buttonDisplay++;
        setTimeout(function(){
                display();
            },500)
        },500)
       }else if(randomData[buttonDisplay] ==2){
        red.classList.add('hide');
        setTimeout(function(){
            red.classList.remove('hide');
            buttonDisplay++;
            setTimeout(function(){
                display();
            },500)
        },500)
       }else if(randomData[buttonDisplay] ==3){
        yellow.classList.add('hide');
        setTimeout(function(){
            yellow.classList.remove('hide');
            buttonDisplay++;
            setTimeout(function(){
                display();
            },500)
        },500)
       }else if(randomData[buttonDisplay] ==4){
        green.classList.add('hide');
        setTimeout(function(){
            green.classList.remove('hide');
            buttonDisplay++;
            setTimeout(function(){
                display();
            },500)
        },500)
       }
       
    }else{
       
    }
       
    //console.log('display ended');
    checkUser();
}

// check if the user pressed a button
function checkUser(){
    //console.log('check user started');
    cumputerTurn = false;
    if(userClicked == true){
        
    }
}

// compare if the user button value is equal to the random data in every cell
function compares(){
    //console.log('compares started');
    if(user == randomData[userCounter]){
        //console.log('userCounter '+userCounter);
        //console.log('randomData[userCounter] '+randomData[userCounter]);
        userCounter++;
        if(userCounter >= counter){
    counter++;
    userCounter = 0;
    buttonDisplay = 0;
    gameLoop();
    }
}else{
    end();  
}
}

// if the user made a mistake it's game over
function end(){
    alert('Game over \nYou reached level '+counter);
    bord.hidden = true;
    cumputerTurn = true;
    buttonDisplay = 0;
    userClicked = false;
    randomData=[];
    userCounter = 0;
    counter = 1;
    gameStart.hidden = false;
    bord.hidden = true;
    start = false;
}

// the user buttons 
function blueClicked(blue){
    if(cumputerTurn == false){
    user = 1;
    blue.classList.add('hide');
    setTimeout(function(){
        blue.classList.remove('hide');
    },500)
    compares();
}else{
    return
}
}

function redClicked(red){
    if(cumputerTurn == false){
    user = 2;
    red.classList.add('hide');
    setTimeout(function(){
        red.classList.remove('hide');
    },500)
    compares();
}else{
    return
}
}

function yellowClicked(yellow){
    if(cumputerTurn == false){
    user = 3;
    yellow.classList.add('hide');
    setTimeout(function(){
        yellow.classList.remove('hide');
    },500)
    compares();
}else{
    return
}
}

function greenClicked(green){
    if(cumputerTurn == false){
    user = 4;
    green.classList.add('hide');
    setTimeout(function(){
        green.classList.remove('hide');
    },500)
    compares();
}else{
    return
}
}
