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