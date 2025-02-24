const puzzle = `2001
0..0
1000
0..0`

const words =['casa', 'alan', 'ciao', 'anta']


function crosswordSolver(emptypuzll, words) {
    // lets check for inputs puzzle and words rules
    if (check_inputs(emptypuzll,words)) {
        return 'Error'
    }
    let puzzle_matrix = split(emptypuzll)
    let positions = findWordsPositions(puzzle_matrix)
    console.log(positions)

    return "puzzle is safe"
}

function check_inputs(emptypuzll, words) {
    let regex = /^[0-9.\n]+$/g
    let uniqwords = new Set()
    for (let word of words) {
        if (uniqwords.has(word)) {
          return true
        }
        uniqwords.add(word)
    }
    return !regex.test(emptypuzll)
}

function split(puzzl){
    return puzzl.split('\n').map(row => row.split(''))
}

function findWordsPositions(puzlle_matrix){
    let positions = []
    for (let i = 0 ; i< puzlle_matrix.length; i++){
        for (let j = 0; j < puzlle_matrix[i].length; j++){
            positions.push({row:i,col:j,count:Number(puzlle_matrix[i][j])})
        }
    }
    return positions
}

console.log(crosswordSolver(puzzle,words))