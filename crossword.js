const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta', 'tests']

// set a Map, to track visited positions 
let visited = new Map()

let placedWords = new Map()

// our main function that will call other functions to do tasks 
function crosswordSolver(emptyPuzzle, words) {
    let emptyPuzzleGrid = gridThePuzzle(emptyPuzzle)
    // let's define start positions 
    let startPositions = getStartPositions(emptyPuzzleGrid)
    // console.log(emptyPuzzleGrid)
    // console.log(startPositions)
    // start testing all possible case using backtracking 
    eachPossibleCase(emptyPuzzleGrid, words, startPositions)
    console.log(emptyPuzzleGrid)

}

// this function will transform the puzzle to a grid 2d matrix 
function gridThePuzzle(emptyPuzzle){
    // this var will hold the empty puzzle as an array
    let puzzArr = emptyPuzzle.split("\n")
    // this is our main 2d matrix 
    let matrix_array = []
    // we'll loop over instances, and return them finally to 2d array
    for (let instance of puzzArr){
        let tempArr = instance.split('')
        // remember, to use push method, u should declare the array 
        matrix_array.push(tempArr)
    }
    return matrix_array
}

// define the start positions 

function getStartPositions(grid) {
    let positions = [];
    let rows = grid.length;
    let cols = grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (/[1-2]/.test(grid[i][j])) {
                let count = parseInt(grid[i][j]);

                // Check if words can start horizontally
                if (j === 0 || grid[i][j - 1] === "." || /[1-2]/.test(grid[i][j - 1])) {
                    positions.push({ row: i, col: j, count, direction: "H" });
                }

                // Check if words can start vertically
                if (i === 0 || grid[i - 1][j] === "." || /[1-2]/.test(grid[i - 1][j])) {
                    positions.push({ row: i, col: j, count, direction: "V" });
                }
            }
        }
    }
    return positions;
}


function eachPossibleCase(emptyPuzzleGrid, words, startPositions){
    // now we'll loop over words and start positions 
    for (let word of words){
        if (!placedWords.get(word))
        for (let position of startPositions){
            if (position.direction === "H"){
               if (horizontalCheck(emptyPuzzleGrid, position.row, word)){
                placeWords(emptyPuzzleGrid[position.row], word)
               }
            }
        }
    }
}

function horizontalCheck(emptyPuzzleGrid, row, word){
    // does the word fits in hor line 
        if (doesItFit(emptyPuzzleGrid[row], word)  && doesItRespectCond(emptyPuzzleGrid[row], word)){
            if(doubleCheck(emptyPuzzleGrid[row], word)){
                return true
            }
        }
        return false
}

// does the word will fit with the length of the row or col 
function doesItFit(emptyPuzzleGridRowCol, word){
    let rowCapacity = 0
    // i'll gather dispo spaces in the line
    for (let pos of emptyPuzzleGridRowCol){
        if (pos !== "."){
            rowCapacity++
        }
    }
    return rowCapacity === word.length
}

// for example if the line starts with 2 words, we should check if there is other words that starts 
// with the same alpha to respect the condition
function doesItRespectCond(emptyPuzzleGridRowCol, word){
    // if the line starts with 2, check if the word has a similar one 
    if (emptyPuzzleGridRowCol[0] === "2"){
        // the char that we should compare
        let firstChar = word[0]
        // we'll loop over other words 
        for (let singleWord of words) {
            // don't check the word itself 
            if (word === singleWord){
                continue
            }
            // compare words's first char 
            if (singleWord[0] === firstChar){
                return true
            }
        }
        // if no match return false 
        return false
    } else {
        return true
    }
}

// we'll check if a word intersect with antoher with the start 
// of another word, does it respect the condition 
function doubleCheck(emptyPuzzleGrid, word){
    for (let i = 0; i <emptyPuzzleGrid.length; i++){
        if (emptyPuzzleGrid[i] === "1"){
            // we'll define the char that we should find 
            let tempChar = word[i]
            // console.log(emptyPuzzleGrid)
            // console.log(word)
            // console.log(tempChar)
            for (let singleWord of words){
                if (word !== singleWord){
                    for (let char of singleWord){
                        if (tempChar === char){
                            return true
                        }
                    }
                }
            }
        }
    }
    return false
}

// this function will be responsible for placing words
function placeWords(emptyPuzzleGrid, word){
    for (let i =0; i <emptyPuzzleGrid.length; i++){
        emptyPuzzleGrid[i] = word[i]
    }
    placedWords.set(word,true)

}
crosswordSolver(emptyPuzzle, words)