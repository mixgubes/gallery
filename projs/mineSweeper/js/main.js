'use strict'
//TODO: Bonus: Keep the best score in local storage (per level) and show it on the page 
//TODO: Bonus: Manually positioned mines: positions the mines (by clicking cells) and then plays.
//TODO: Bonus: add an “UNDO” button, each click on that button takes the game back 1 step


//TODO: for me: on key down 😖 

const FLAG_ICON = '🚩';
const MINE_ICON = '💣';
const LOSS_ICON = '🥵';
const WIN_ICON = '😎';
const MAIN_ICON = '😊';
// const SCARED_ICON = '😖';
const EXPLOSION_ICON = '💥';
const STAR_ICON = '⭐';
const LIFE_ICON = '💖';

var gMineCount = 0;
var gEmptyCellCounter = 0;
var gCell_BGC = 'rgb(207, 205, 207)';
var gUserLevelInput = 5;
var gBoard;
var gSetMineNumber = 2;
var gIsWinInFirstClick;
var gIsFirstClick;
var gHintCount;
var gHint;
var gSafeCount;
var gSafe;
var gInterClock;
var gElTime = document.querySelector('.time');
var gSec;
var gTenSec;
var gMin;
var gTenMin;
var gIsGameOn;
var gMineLeftCount;
var gMineBlownCount;
var gNumberOfLife;
var gBoards;

function init() {
    clearInterval(gInterClock);
    gBoards = [];
    gNumberOfLife = 3
    gMineBlownCount = 0;
    gSec = 0;
    gTenSec = 0;
    gMin = 0;
    gTenMin = 0;
    gIsGameOn = true;
    gElTime.innerText = '00:00';
    gHintCount = 3;
    gHint = false;
    gSafeCount = 3;
    gSafe = false;
    gIsFirstClick = true;
    gIsWinInFirstClick = false;
    gMineCount = 0;
    gMineLeftCount;
    gBoard = creatMat(gUserLevelInput);
    gEmptyCellCounter = 0;
    var elLife = document.querySelector('.life-icon');
    elLife.innerText = LIFE_ICON + LIFE_ICON + LIFE_ICON;
    // elLife.innerText = elLife.innerText.toString(LIFE_ICON*3);
    var elResetButton = document.querySelector('.restart-button');
    elResetButton.innerText = MAIN_ICON;
    render(gBoard)
}

function creatMat(rowAndColNumber) {
    var res = [];

    for (var i = 0; i < rowAndColNumber; i++) {
        res[i] = [];
        for (var j = 0; j < rowAndColNumber; j++) {
            var cell = creatCell(i, j);
            res[i][j] = cell;
        }
    }
    return res;
}

function creatCell(i, j) {
    var res = {
        isMine: false,
        isCleared: false,
        mineCounter: 0,
        pos: { i: i, j: j },
        isFlag: false
    }
    return res;
}

// the level button onClick function
function setLevel(level) {
    if (level === 1) {
        gUserLevelInput = 4;
        gSetMineNumber = 2;
    } else if (level === 2) {
        gUserLevelInput = 8;
        gSetMineNumber = 10;
    } else if (level === 3) {
        gUserLevelInput = 16;
        gSetMineNumber = 50;
    }
    init()
}

function findMine(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            cell.mineCounter = countMineAround(cell.pos)
        }
    }
}

// the cell button onClick function
function clicked(elCell, i, j) {
    if (gIsGameOn) {
        if (!gBoard[i][j].isFlag) {
            if (!gHint) {
                if (gBoard[i][j].isMine) {
                    elCell.style.backgroundColor = 'red';
                    elCell.innerText = EXPLOSION_ICON;
                    isLost(i, j);
                } else {
                    if (gIsFirstClick) {
                        gIsFirstClick = false;
                        while (gMineCount < gSetMineNumber) {
                            var iRandom = getRandomInt(0, gBoard.length - 1);
                            var jRandom = getRandomInt(0, gBoard[0].length - 1);
                            if (iRandom !== i && jRandom !== j) {
                                if (!gBoard[iRandom][jRandom].isMine) {
                                    gBoard[iRandom][jRandom].isMine = true;
                                    gMineCount++
                                    gMineLeftCount = gMineCount;
                                    var elMineLeftCount = document.querySelector('.mine-number');
                                    elMineLeftCount.innerText = gMineLeftCount;
                                }
                            }
                        }
                        findMine(gBoard);
                        render(gBoard);
                        elCell.style.backgroundColor = gCell_BGC;
                        elCell.innerText = gBoard[i][j].mineCounter;
                        clicked(elCell, i, j)
                    } else {

                        if (gBoard[i][j].mineCounter === 0 && !gBoard[i][j].isCleared) {
                            gBoard[i][j].isCleared = true;
                            gEmptyCellCounter++
                            if (gEmptyCellCounter === 1) clock();
                            elCell.innerText = '';
                            elCell.style.backgroundColor = gCell_BGC;
                            exposeZeroAround({ i: i, j: j })
                        } else if (!gBoard[i][j].isCleared) {
                            gBoard[i][j].isCleared = true;
                            gEmptyCellCounter++;
                            elCell.style.backgroundColor = gCell_BGC;
                            elCell.innerText = gBoard[i][j].mineCounter;
                            copyBoard()
                            isWin()
                        }
                    }
                }
            } else {
                hintPress(elCell, i, j);
            }
        }
    }
    return
}

function countMineAround(pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue
            var cell = gBoard[i][j]
            if (pos === cell.pos) continue;
            if (cell.isMine) count++
        }
    }
    return count
}

// find and expose all the zero cells 
function exposeZeroAround(pos) {
    var elCell;
    var nextCellsToClear = [];
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            if (cell.isFlag) continue
            if (pos.i === cell.pos.i && pos.j === cell.pos.j) continue;
            if (cell.isCleared) continue;
            if (cell.mineCounter === 0) {
                gEmptyCellCounter++
                elCell = document.querySelector('.cell' + i + '-' + j);
                elCell.innerText = '';
                elCell.style.backgroundColor = gCell_BGC;
                cell.isCleared = true;
                nextCellsToClear.push(cell)
            }
            else {
                if (cell.isCleared === true) continue;
                gEmptyCellCounter++
                elCell = document.querySelector('.cell' + i + '-' + j);
                elCell.style.backgroundColor = gCell_BGC;
                elCell.innerText = gBoard[i][j].mineCounter;
                gBoard[i][j].isCleared = true;
            }
        }
    }
    for (var i = 0; i < nextCellsToClear.length; i++) {
        exposeZeroAround(nextCellsToClear[i].pos);
    }
    if (gMineCount === (gBoard.length * gBoard[0].length) - gEmptyCellCounter) {
        if (!gIsWinInFirstClick) {
            gIsWinInFirstClick = true;
            isWin();
        }
    }
}

function setFlag(elCell, i, j) {
    if (gIsGameOn) {
        if (gBoard[i][j].isCleared) return;
        if (!gBoard[i][j].isFlag) {
            gBoard[i][j].isFlag = true;
            gMineLeftCount--;
            elCell.style.backgroundColor = 'grey';
            elCell.innerText = FLAG_ICON
        } else {
            gBoard[i][j].isFlag = false;
            gMineLeftCount++;
            elCell.style.backgroundColor = 'brown';
            elCell.innerText = ''
        }
        var elMineLeftCount = document.querySelector('.mine-number');
        elMineLeftCount.innerText = gMineLeftCount;
    }
    return
}

function isWin() {
    if (gMineCount === (gBoard.length * gBoard[0].length) - gEmptyCellCounter) {
        clearInterval(gInterClock);
        var elResetButton = document.querySelector('.restart-button');
        elResetButton.innerText = WIN_ICON;
        gIsGameOn = false;
        // debugger
        endOfGameReveal(true);
        setTimeout(() => {
            return alert('you won!');
        }, 20);
    }
    return
}

function isLost(i, j) {
    var elLife = document.querySelector('.life-icon');
    if (gMineBlownCount < gNumberOfLife - 1) {

        gMineBlownCount++
        elLife.innerText = '';
        for (var i = 0; i < (gNumberOfLife - gMineBlownCount); i++) {
            elLife.innerText += LIFE_ICON;
        }

        return;
    }
    clearInterval(gInterClock);
    var elResetButton = document.querySelector('.restart-button');
    elResetButton.innerText = LOSS_ICON;
    gIsGameOn = false;
    elLife.innerText = '';
    endOfGameReveal(false, i, j);
    setTimeout(() => {
        return alert('you lost!');
    }, 20);
}

function endOfGameReveal(isWin, i, j) {

    if (!isWin) {
        var iPos = i;
        var jPos = j;
        var icon = MINE_ICON;
    } else {

        icon = FLAG_ICON;
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!isWin) {
                if (gBoard[iPos][jPos] === gBoard[i][j]) continue;
            }
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector('.cell' + i + '-' + j);
                elCell.style.backgroundColor = gCell_BGC;
                elCell.innerText = icon;
            } else {
                if (!gBoard[i][j].isMine && gBoard[i][j].isFlag) {
                    var elCell = document.querySelector('.cell' + i + '-' + j);
                    elCell.style.backgroundColor = 'rgb(233, 175, 175)';
                    elCell.innerText = FLAG_ICON;
                } else {
                    var elCell = document.querySelector('.cell' + i + '-' + j);
                    elCell.style.backgroundColor = gCell_BGC;
                    if (gBoard[i][j].mineCounter > 0) {
                        elCell.innerText = gBoard[i][j].mineCounter;
                    } else {
                        elCell.innerText = '';
                    }
                }
            }
        }
    }
}



function clock() {
    var timeStampA = Date.now();
    var timeStampB = Date.now();
    gSec = 0;
    gTenSec = 0;
    gMin = 0;
    gTenMin = 0;

    gInterClock = setInterval(() => {
        if (timeStampB > timeStampA + 1000) {
            gSec++;
            timeStampA = timeStampB;
        }
        if (gSec > 9) {
            gSec = 0;
            gTenSec++;
        }
        if (gTenSec > 5) {
            gTenSec = 0;
            gMin++;
        }
        if (gMin > 9) {
            gMin = 0;
            gTenMin++;
        }
        gElTime.innerText = gTenMin + '' + gMin + ':' + gTenSec + '' + gSec;
        timeStampB = Date.now();
    }, 25);
}

function safeCell() {
    if (gIsGameOn) {
        if (gSafeCount < 1) return alert('You don\'t have any safe clicks left')
        var iRandom = getRandomInt(0, gBoard.length);
        var jRandom = getRandomInt(0, gBoard[0].length);

        if (gEmptyCellCounter > 0) {
            while (gBoard[iRandom][jRandom].isCleared || gBoard[iRandom][jRandom].isMine) {
                iRandom = getRandomInt(0, gBoard.length);
                jRandom = getRandomInt(0, gBoard[0].length);
            }
            var elCell = document.querySelector('.cell' + iRandom + '-' + jRandom);
            gSafeCount--;
            var elSafe = document.querySelector('.safe-number');
            elSafe.innerText = `X ${gSafeCount}`
            setTimeout(() => {
                if (gBoard[iRandom][jRandom].isFlag) {
                    gBoard[iRandom][jRandom].isFlag = false;
                    gMineLeftCount++
                    var elMineLeftCount = document.querySelector('.mine-number');
                    elMineLeftCount.innerText = gMineLeftCount;
                }

                if (elCell.innerText === STAR_ICON) {
                    elCell.innerText = '';
                    elCell.style.backgroundColor = 'brown';
                    return;
                }
            }, 2000);
            elCell.style.backgroundColor = 'green';
            elCell.innerText = STAR_ICON;
        }
    }
    return
}

function undo(){
    gBoard = gBoards.pop();
    init()
}

function copyBoard() {
    var copiedBoard = [];

    for (var i = 0; i < gBoard.length; i++) {
        copiedBoard[i] = [];
        for (var j = 0; j < gBoard[0].length; j++) {
            copiedBoard[i][j] = gBoard[i][j];
        }
    }
    gBoards.push(copiedBoard);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}