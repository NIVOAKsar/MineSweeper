'use strict'


// start time to run
function startTime() {
    timeInterval = setInterval(() => {
        updateTime();
        renderTime();
    }, 1000);
}

// stop time to run
function clearTime() {
    clearInterval(timeInterval);
}

// update time
function updateTime() {
    gSec++;
    if (gSec >= 999) clearTime();
}

// return a string of time (at game over)
function getTimeStr(storageData) {
    var min = parseInt(storageData / 60);
    var sec = parseInt(storageData) % 60;

    if (min < 10) return sec < 10 ? `0${min}:0${sec}` : `0${min}:${sec}`;
    return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
}

// open hint
function openHint(pos) {
    for (let i = pos.rowIdx - 1; i <= pos.rowIdx + 1; i++) {
        for (let j = pos.colIdx - 1; j <= pos.colIdx + 1; j++) {
            if (isInBorder(i, j, gBoard.length)) {
                var slot = gBoard[i][j];
                if (slot.isShown === false && slot.isMarked === false) {
                    slot.isHinted = true;
                    slot.isShown = true;
                    slot.styleClass += 'hint-slot ';
                }
            }
        }
    }
}

// close hint
function closeHint(pos) {
    for (let i = pos.rowIdx - 1; i <= pos.rowIdx + 1; i++) {
        for (let j = pos.colIdx - 1; j <= pos.colIdx + 1; j++) {
            if (isInBorder(i, j, gBoard.length)) {
                var slot = gBoard[i][j];
                if (slot.isHinted === true) {
                    slot.isHinted = false;
                    slot.isShown = false;
                    slot.styleClass = '';
                }
            }
        }
    }
}

// controll the 'open and close' hint functions
function useHint(elBtn) {
    if (isProcess !== true) {
        isProcess = true;
        openHint(getPosObjectById(elBtn.parentElement.id, '-'));
        renderBoard();
        // new Audio('sounds/useHint.wav').play();

        setTimeout(() => {
            isProcess = false;
            closeHint(getPosObjectById(elBtn.parentElement.id, '-'));
            toggleHintBtn();
            renderBoard();
            // new Audio('sounds/useHint.wav').play();
        }, 2000);
    }
}

// update amount of mines left
function updateMinesLeft(operator) {
    switch (operator) {
        case '+': gGame.minesLeft++; break;
        case '-': gGame.minesLeft--; break;
    }
}

// reveal all mines (at game over lose)
function revealMines() {
    var elButtons = document.querySelectorAll('.board button');
    for (var elButton of elButtons) {
        var pos = getPosObjectById(elButton.parentElement.id, '-'); // get the pos to connect model
        var slot = gBoard[pos.rowIdx][pos.colIdx];
        if (slot.value === MINE) {
            slot.isShown = true;
        }
    }
}

// reveal empty slots or numbers
function expand(pos) {
    for (let i = pos.rowIdx - 1; i <= pos.rowIdx + 1; i++) {
        for (let j = pos.colIdx - 1; j <= pos.colIdx + 1; j++) {
            if (isInBorder(i, j, gBoard.length)) { // check if pos is in border
                var currPos = getPosObjectByIndex(i, j); // get object for pos
                if (isEqual(pos, currPos) === false) {
                    var slot = gBoard[i][j];
                    if (slot.value !== MINE && !slot.isMarked && !slot.isShown) {
                        slot.isShown = true;
                        gGame.unrevealed--;
                        if (slot.value === EMPTY) expand(currPos);
                    }
                }
            }
        }
    }
}







