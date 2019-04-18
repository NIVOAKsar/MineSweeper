'use strict'

// cell types
const EMPTY = ' ';
const MINE = '💣';
const FLAG = '🚩';

// emojies
const HINT = '💡';
const TIMER = '⏳';
const SMILE_NEUTRAL = '😃';
const SMILE_DEAD = '💀';
const SMILE_WINNER = '😎';

// game settings
var gGame;
var gLevel = { TYPE: 'beginner', SIZE_LINE: 4, TOTAL_MINES: 4 }; // default settings
var gNumColors;
var gActiveHint;
var isProcess;

// game objects
var gBoard;

// time model
var timeInterval;
var gSec;

// returns a new game object
function createGameObject() {
    return {
        isOn: true,
        isFirstClicked: false,
        isHintMode: false,
        minesLeft: gLevel.TOTAL_MINES,
        unrevealed: (gLevel.SIZE_LINE ** 2) - gLevel.TOTAL_MINES
    };
}

// get i, j and return new position object with numeric values
function getPosObjectByIndex(i, j) {
    return { rowIdx: i, colIdx: j };
}

// get id, seperator and return new position object with numeric values
// handles more than 1 digit index
function getPosObjectById(id, sep) {
    var arr = [];
    id = id.toString();
    var value = '';
    for (let i = 1; i < id.length; i++) {
        if (id.charAt(i) === sep) {
            arr.push(value);
            value = '';
            continue;
        }
        value += id.charAt(i);
    }
    return { rowIdx: parseInt(arr[0]), colIdx: parseInt(arr[1]) };
}

// return new slot object
function createSlotObject(type) {
    var obj = { isShown: false, isHinted: false, isMarked: false, valueColor: 'black', styleClass: '' };
    switch (type) {
        case 'empty': obj['value'] = EMPTY; break;
        case 'mine': obj['value'] = MINE; break;
    }
    return obj;
}
// return new board matrix
function createBoard() {
    var board = [];
    for (let i = 0; i < gLevel.SIZE_LINE; i++) {
        board[i] = [];
        for (let j = 0; j < gLevel.SIZE_LINE; j++) {
            board[i][j] = createSlotObject('empty');
        }
    }
    return board;
}

// set mines on the board randomly, except the given position
function initMines(exceptionPos) {
    var arr = getMinePositions(gBoard, exceptionPos);
    for (var slot of arr) {
        var i = slot.rowIdx;
        var j = slot.colIdx;
        gBoard[i][j] = createSlotObject('mine');
    }
}

// set counters at mines radius
function initCounters() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            var pos = getPosObjectByIndex(i, j);
            if (gBoard[i][j].value === EMPTY) {
                var counter = getMinesAround(pos);

                gBoard[i][j].value = counter > 0 ? counter.toString() : EMPTY;
                gBoard[i][j].valueColor = gNumColors[gBoard[i][j].value];
            }
        }
    }
}

// get board and return random position by the amount of the "TOTAL_MINES" level setting
// if one of the random position is equal to the exception, ignore it and take another position
function getMinePositions(board, exceptionPos) {
    var boardPositions = getBoardPositions(board);
    var minePositions = [];
    var addRandom = false;

    for (let i = 1; i <= gLevel.TOTAL_MINES; i++) {
        var randIdx = getRandomInt(0, boardPositions.length);
        var currPos = boardPositions.splice(randIdx, 1)[0];
        if (isEqual(currPos, exceptionPos) === true) {
            addRandom = true;
            continue;
        }
        minePositions.push(currPos);
    }

    if (addRandom === true) {
        randIdx = getRandomInt(0, boardPositions.length);
        currPos = boardPositions.splice(randIdx, 1)[0];
        minePositions.push(currPos);
    }

    return minePositions;
}

// get matrix and return all it's positions as object
function getBoardPositions(board) {
    var arr = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            arr.push(getPosObjectByIndex(i, j));
        }
    }
    return arr;
}

// get position return the number of mine on 1 slot redius (on the gBoard)
function getMinesAround(pos) {
    var count = 0;
    for (let i = pos.rowIdx - 1; i <= pos.rowIdx + 1; i++) {
        for (let j = pos.colIdx - 1; j <= pos.colIdx + 1; j++) {
            if (isInBorder(i, j, gBoard.length)) { // check if pos is in border
                var currPos = getPosObjectByIndex(i, j); // get object for pos
                if (isEqual(pos, currPos) === false && gBoard[i][j].value === MINE) count++;
            }
        }
    }
    return count;
}










