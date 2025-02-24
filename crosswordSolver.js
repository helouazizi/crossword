const puzzle = `2001
0..0
1000
0..0`

const words = ['casa', 'alan', 'ciao', 'anta']
var uniqwords = new Set(); // Ensure Set is initialized properly

function crosswordSolver(emptypuzll, words) {
    if (check_inputs(emptypuzll, words)) {
        return 'Error';
    }

    words.sort((a, b) => b.length - a.length); // Sort words by length
    let puzzle_matrix = split(emptypuzll);
    console.log(puzzle_matrix)
    let positions = findWordsPositions(puzzle_matrix);



    if (!fillWords(puzzle_matrix, positions, words, 0, uniqwords)) {
        return 'Error';
    }

    return puzlle_matrixToString(puzzle_matrix);
}

function check_inputs(emptypuzll, words) {
    let regex = /^[012.\n]+$/g
    let matrix = split(emptypuzll)
    const wordlength = split(emptypuzll)[0].length
    const puzzlelength = split(emptypuzll).length
    let x = !matrix.every(index => index.length === wordlength)
    if (x) {
        return true
    }
    let uniqwords = new Set()
    for (let word of words) {

        if (uniqwords.has(word) || word.length > wordlength || word.length == 0 || word.length > puzzlelength) {
            return true
        }
        uniqwords.add(word)
    }
    return !regex.test(emptypuzll)
}

function split(puzzl) {
    return puzzl.split('\n').map(row => row.split(''))
}

function findWordsPositions(puzlle_matrix) {
    let positions = []
    for (let i = 0; i < puzlle_matrix.length; i++) {
        for (let j = 0; j < puzlle_matrix[i].length; j++) {
            if (/[012]/.test(puzlle_matrix[i][j])) {  // Only pick number cells
                positions.push({ row: i, col: j, count: Number(puzlle_matrix[i][j]) });
            }
        }
    }
    return positions
}

function fillWords(puzlle_matrix, positions, words, index, uniqwords = new Set()) {
    if (index > positions.length) return uniqwords.size === words.length
    console.log(positions);
    console.log(puzlle_matrix)

    for (let word of words) {

        let { row, col } = positions[index]
        /// check if have 2 and dont have two worgs begin with same char
        if (!uniqwords.has(word)) {
            // lets keep the original puzzlematrix 
            var backup = [...puzlle_matrix.map(r => [...r])]
            placeWord(puzlle_matrix, row, col, word)
            uniqwords.add(word)
            if (fillWords(puzlle_matrix, positions, words, index + 1, uniqwords)) return true
        }

        puzlle_matrix.length = 0;
        puzlle_matrix.push(...backup);
        uniqwords.delete(word)
    }
    console.log(puzlle_matrix)
    return false
}

function placeWord(grid, row, col, word) {
    for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
    }
}

function puzlle_matrixToString(grid) {
    return grid.map(row => row.join('')).join('\n');
}



console.log(crosswordSolver(puzzle, words))