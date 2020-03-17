'use strict'

// triggered when level button is clicked
function levelClicked(elBtn) {

    switch (elBtn.innerText) {
        case 'Beginner': gLevel = { TYPE: 'beginner', SIZE_LINE: 4, TOTAL_MINES: 4 }; break;
        case 'Medium': gLevel = { TYPE: 'medium', SIZE_LINE: 6, TOTAL_MINES: 6 }; break;
        case 'Expert': gLevel = { TYPE: 'expert', SIZE_LINE: 8, TOTAL_MINES: 8 }; break;
    }
    // new Audio('sounds/flip.wav').play();

    initGame();
}

// triggered when board button is clicked - left mouse
function buttonClickedLeft(elBtn) {

    if (gGame.isFirstClicked === true && gGame.isHintMode === true) {
        useHint(elBtn);
        return;
    }

    if (gGame.isFirstClicked === false) {
        gGame.isFirstClicked = true;
        initComponents(elBtn);
        document.querySelector('.hints').classList.remove('hide');
    }

    var pos = getPosObjectById(elBtn.parentElement.id, '-'); // get position object
    var slotModel = gBoard[pos.rowIdx][pos.colIdx]; // get model object
    slotModel.isShown = true;
    switch (slotModel.value) {
        case MINE:
            // new Audio('sounds/bomb.wav').play()
            slotModel.styleClass += 'blown-mine ';
            gameOver();
            break;
        case EMPTY:
            // new Audio('sounds/click.wav').play()
            gGame.unrevealed--; // reveal to the slot itself
            expand(pos);
            checkIfWin();
            break;
        default:
            // new Audio('sounds/click.wav').play()
            gGame.unrevealed--;
            checkIfWin();
            break;
    }

    renderBoard();
}

// triggered when board button is clicked - right mouse
function buttonClickedRight(elBtn) {
    window.event.returnValue = false; // disable right click menu

    var pos = getPosObjectById(elBtn.parentElement.id, '-'); // get the pos to connect model
    var slot = gBoard[pos.rowIdx][pos.colIdx];
    if (slot.isMarked === false) {
        slot.isMarked = true;
        if (slot.value === MINE) {
            updateMinesLeft('-');
            renderMinesLeft();
            checkIfWin();
        }
    }
    else {
        slot.isMarked = false;
        if (slot.value === MINE) {
            updateMinesLeft('+');
            renderMinesLeft();
        }
    }

    renderBoard();
}

// triggered when hint is clicked
function hintClicked(elHintBtn) {
    if (!gGame.isHintMode && !elHintBtn.classList.contains('disabled')) {
        gActiveHint = elHintBtn;
        toggleHintBtn();
        // new Audio('sounds/hintButton.wav').play();
    }
}









