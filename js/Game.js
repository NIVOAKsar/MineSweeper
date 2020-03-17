'use strict'


function initGame() {
    initView();
    initModel();
    renderBoard();
}

// init all navbars
function initView() {

    var bScore = !sessionStorage.getItem('beginner') ? '----' : getTimeStr(sessionStorage.getItem('beginner'));
    var mScore = !sessionStorage.getItem('medium') ? '----' : getTimeStr(sessionStorage.getItem('medium'));
    var eScore = !sessionStorage.getItem('expert') ? '----' : getTimeStr(sessionStorage.getItem('expert'));

    var navTop = `
    <table>
        <tr>
            <td><button onclick="levelClicked(this)">Beginner</button></td>
            <td><button onclick="levelClicked(this)">Medium</button></td>
            <td><button onclick="levelClicked(this)">Expert</button></td>
        </tr>   
        <tr>
            <td style="color: lightgreen; border: 1px lightgreen solid" class="beginner">${bScore}</td>
            <td style="color: lightgreen; border: 1px lightgreen solid" class="medium">${mScore}</td>
            <td style="color: lightgreen; border: 1px lightgreen solid" class="expert">${eScore}</td>
        </tr>
            <td class="best-led" colspan="3">YOUR BEST TIME RECORD</td>
        </tr>
    </table>
    `
    var navMid = `
    <div class="tapet left"></div>
    <div class="face">${SMILE_NEUTRAL}</div>
    <div class="tapet right">${TIMER} 000</div>
    `
    var navHints = `
    <div class="tapet hint" onclick="hintClicked(this)">${HINT}</div>
    <div class="tapet hint" onclick="hintClicked(this)">${HINT}</div>    
    <div class="tapet hint" onclick="hintClicked(this)">${HINT}</div>
    `
    var navBot = `
    <button class="reset-btn" onclick="initGame()">Try Again</button>
    `
    document.querySelector('.top').innerHTML = navTop;

    document.querySelector('.middle').innerHTML = navMid;
    document.querySelector('.middle .left').innerText = gLevel.TOTAL_MINES < 10 ? `00${gLevel.TOTAL_MINES} ${MINE}` : `0${gLevel.TOTAL_MINES} ${MINE}`;

    document.querySelector('.hints').innerHTML = navHints;
    document.querySelector('.hints').classList.add('hide');

    document.querySelector('.bottom').innerHTML = navBot;
    document.querySelector('.bottom').classList.add('hide');


}

function initModel() {
    clearTime();
    gNumColors = { '1': getRandomColor(), '2': getRandomColor(), '3': getRandomColor(), '4': getRandomColor() }
    gActiveHint = undefined;
    isProcess = false; // for timeouts
    gSec = 0;

    gGame = createGameObject();
    gBoard = createBoard();
}

function initComponents(elBtn) {
    initMines(getPosObjectById(elBtn.parentElement.id, '-'));
    initCounters();
    cleanFlags()
    startTime();

    // new Audio('sounds/start.wav').play();
}

function checkIfWin() {
    if (gGame.minesLeft === 0 && gGame.unrevealed === 0)
        gameOver();
}

function gameOver() {
    gGame.isOn = false;
    revealMines();
    clearTime();
    disableHintBtns();

    document.querySelector('.bottom').classList.remove('hide');
    if (gGame.minesLeft === 0) {
        winMode();
        return;
    }
    loseMode();

}

function winMode() {
    // debugger;
    colorMines();
    document.querySelector('.middle .face').innerHTML = SMILE_WINNER;
    document.querySelector('.bottom button').innerText = 'Another One?'
    // new Audio('sounds/win.wav').play();

    if (sessionStorage.getItem(gLevel.TYPE)) {
        if (gSec > (sessionStorage.getItem(gLevel.TYPE))) {
            renderBoard();
            return;
        }
    }

    sessionStorage.setItem(gLevel.TYPE, gSec);
    document.querySelector(`.${gLevel.TYPE}`).innerText = getTimeStr(sessionStorage.getItem(gLevel.TYPE));
    renderBoard();
}

function loseMode() {
    document.querySelector('.middle .face').innerHTML = SMILE_DEAD;
    renderBoard();
}









