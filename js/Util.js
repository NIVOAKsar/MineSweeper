'use strict'


// get 2 positions and return if they are the same
function isEqual(pos_first, pos_sec) {
    return (pos_first.rowIdx === pos_sec.rowIdx && pos_first.colIdx === pos_sec.colIdx);
}

// get rowIdx and colIdx and return if it's on matrix 
function isInBorder(rowIdx, colIdx, line_length) {
    return (rowIdx >= 0 && rowIdx < line_length && colIdx >= 0 && colIdx < line_length);
}

// return radnom num between min to max-1
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// reuturn a string of random rgb color
function getRandomColor() {
    let r = getRandomInt(0, 256);
    let g = getRandomInt(0, 256);
    let b = getRandomInt(0, 256);
    return `rgb(${r},${g},${b})`;
}


