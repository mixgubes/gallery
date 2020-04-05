function hint() {
    if (!gIsGameOn) return;
    var elHint = document.querySelector('.hint-button');
    if (gHintCount > 0) {
        gHint = !gHint;
        if (gHint) {
            elHint.style.backgroundColor = 'lightblue';
            elHint.style.color = 'black';
            return
        } else {
            elHint.style.backgroundColor = 'rgb(11, 11, 102)';
            elHint.style.color = 'white';
            return
        }
    } else {
        return alert('You don\'t have any hints left');
    }
}

function hintPress(elCell, i, j) {
    var iPos = i;
    var jPos = j;

    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue
            var cell = gBoard[i][j]
            if (cell.isCleared) continue;
            if (cell.isMine) {
                elCell = document.querySelector('.cell' + i + '-' + j)
                elCell.style.backgroundColor = gCell_BGC;
                elCell.innerText = MINE_ICON;
            } else {
                elCell = document.querySelector('.cell' + i + '-' + j)
                elCell.style.backgroundColor = gCell_BGC;
                elCell.innerText = gBoard[i][j].mineCounter;
            }
        }
    }
    setTimeout(() => {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].isFlag === true) {
                    elCell = document.querySelector('.cell' + i + '-' + j)
                    elCell.innerText = FLAG_ICON;
                    elCell.style.backgroundColor = 'grey';
                } else if (!gBoard[i][j].isCleared) {
                    elCell = document.querySelector('.cell' + i + '-' + j)
                    elCell.innerText = '';
                    elCell.style.backgroundColor = 'brown';
                }
            }
        }
    }, 1000);
    if (!gIsFirstClick) gHintCount--;
    gHint = !gHint;
    var elHint = document.querySelector('.hint-button');
    elHint.innerText = 'Hint ' + gHintCount;
    elHint.style.backgroundColor = 'rgb(11, 11, 102)';
    elHint.style.color = 'white';
    render(gBoard)
}