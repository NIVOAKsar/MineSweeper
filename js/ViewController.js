'use strict'


// give inner html to element
function getInnerHTML(slot) {
    if (slot.isShown === false) {
        if (slot.isMarked) {
            if (gGame.isOn === false) {
                return `<button>${FLAG}</button>`;
            }
            return `<button oncontextmenu="buttonClickedRight(this)">${FLAG}</button>`;
        }
        if (gGame.isOn === false) {
            return `<button></button>`;
        }
        return `<button onclick="buttonClickedLeft(this)" oncontextmenu="buttonClickedRight(this)"></button>`;
    }
    return slot.value;
}

// draw score model
function renderScore() {
    document.querySelector('.scoreBeginner').innerText = gScore.beginner;
    document.querySelector('.scoreMedium').innerText = gScore.medium;
    document.querySelector('.scoreExpert').innerText = gScore.expert;
}

// draw time model
function renderTime() {

    if (parseInt(gSec % 1000) > 999) {
        clearInterval(timeInterval);
        return;
    }
    if (parseInt(gSec % 1000) >= 100) {
        document.querySelector('.middle .right').innerText = `${TIMER} ${gSec}`;
        return;
    }
    if (parseInt(gSec % 100) >= 10) {
        document.querySelector('.middle .right').innerText = `${TIMER} 0${gSec}`
        return;
    }
    if (parseInt(gSec % 10) >= 0) {
        document.querySelector('.middle .right').innerText = `${TIMER} 00${gSec}`
        return;
    }
}

// draw board model
function renderBoard() {
    var strHTML = `<table class="board">`;
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < gBoard.length; j++) {
            var innerHTML = getInnerHTML(gBoard[i][j]); // update by the model
            strHTML += `<td id="-${i}-${j}-" class="slot ${gBoard[i][j].styleClass}" style="color:${gBoard[i][j].valueColor};">${innerHTML}</td>`;
        }
        strHTML += `</tr>`;
    }
    strHTML += `</table>`;
    document.querySelector('.game-window').innerHTML = strHTML;
}

// clean all flags on the view before game starts
function cleanFlags() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            var slot = gBoard[i][j];
            if (slot.isMarked === true) {
                slot.isMarked = false;
            }
        }
    }
}

// change the hint button state
function toggleHintBtn() {
    if (gGame.isHintMode === false) {
        gGame.isHintMode = true;
        gActiveHint.style.backgroundColor = 'gold';
        gActiveHint.style.fontSize = '1.1em';
        gActiveHint.classList.add('disabled');
    }
    else {
        gActiveHint.style.backgroundColor = 'rgb(25,25,25)';
        gActiveHint.style.fontSize = '1em';
        gActiveHint.style.opacity = '0';
        gActiveHint = undefined;
        gGame.isHintMode = false;
    }
}

// disable hint buttons (at game over)
function disableHintBtns() {
    var elHintBtns = document.querySelectorAll('.hint');
    for (var elHintBtn of elHintBtns) {
        if (elHintBtn.classList.contains('disabled') === false) {
            elHintBtn.classList.add('disabled');
        }
    }
}

// draw minesLeft tappet
function renderMinesLeft() {
    if (gGame.minesLeft < 10) {
        document.querySelector('.middle .left').innerText = `00${gGame.minesLeft} ${MINE}`
    }
    else {
        document.querySelector('.middle .left').innerText = `0${gGame.minesLeft} ${MINE}`
    }
}

// color all mines with same color (at game over win)
function colorMines() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].value === MINE)
                gBoard[i][j].styleClass += 'safe-mine ';
        }
    }
}








