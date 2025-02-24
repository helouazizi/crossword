function crosswordSolver(emptypuzll, words) {
    // Step 1: Validate inputs
    if (check_inputs(emptypuzll, words)) {
        console.log("Error");
        return;
    }

    // Step 2: Convert the empty puzzle string into a 2D matrix
    let puzzle_matrix = split(emptypuzll);
    
    // Step 3: Find all the available word positions in the matrix
    let positions = findWordPositions(puzzle_matrix);

    // Step 4: Ensure the number of words does not exceed the number of positions,
    // but we can have fewer words than available positions
    if (words.length > positions.length) {
        console.log("Error");
        return;
    }

    // Step 5: Sort words by length (longest word first for better backtracking)
    words.sort((a, b) => b.length - a.length);

    // Step 6: Attempt to fill the puzzle using backtracking
    if (!backtrack(puzzle_matrix, words, positions, 0)) {
        console.log("Error");
        return;
    }

    // Step 7: Print the filled puzzle matrix
    console.log(puzzle_matrix.map(row => row.join("")).join("\n"));
}

function check_inputs(emptypuzll, words) {
    let regex = /^[012.\n]+$/g;
    let matrix = split(emptypuzll);
    const wordlength = matrix[0].length;
    const puzzlelength = matrix.length;

    if (!matrix.every(row => row.length === wordlength)) {
        return true;
    }

    let uniqwords = new Set();
    for (let word of words) {
        if (uniqwords.has(word) || word.length > wordlength || word.length === 0 || word.length > puzzlelength) {
            return true;
        }
        uniqwords.add(word);
    }

    return !regex.test(emptypuzll);
}

function split(puzzl) {
    return puzzl.split('\n').map(row => row.split(''));
}

function findWordPositions(matrix) {
    let positions = [];

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let num = parseInt(matrix[row][col]);
            if (num > 0) {
                if (col + num <= matrix[row].length) {
                    positions.push({ row, col, dir: 'H', length: num });
                }
                if (row + num <= matrix.length) {
                    positions.push({ row, col, dir: 'V', length: num });
                }
            }
        }
    }
    return positions;
}

function backtrack(matrix, words, positions, index) {
    if (index === words.length) return true;  // All words placed

    let word = words[index];
    let { row, col, dir, length } = positions[index];

    if (word.length !== length) return false;

    if (canPlace(matrix, word, row, col, dir)) {
        let placedChars = placeWord(matrix, word, row, col, dir);
        if (backtrack(matrix, words, positions, index + 1)) {
            return true;
        }
        removeWord(matrix, placedChars);  // Backtrack
    }

    return false;
}

function canPlace(matrix, word, row, col, dir) {
    for (let i = 0; i < word.length; i++) {
        let r = row + (dir === 'V' ? i : 0);
        let c = col + (dir === 'H' ? i : 0);
        if (matrix[r][c] !== '0' && matrix[r][c] !== word[i]) return false;
    }
    return true;
}

function placeWord(matrix, word, row, col, dir) {
    let placedChars = [];
    for (let i = 0; i < word.length; i++) {
        let r = row + (dir === 'V' ? i : 0);
        let c = col + (dir === 'H' ? i : 0);
        placedChars.push({ row: r, col: c, char: matrix[r][c] });
        matrix[r][c] = word[i];
    }
    return placedChars;
}

function removeWord(matrix, placedChars) {
    for (let { row, col, char } of placedChars) {
        matrix[row][col] = char;
    }
}

// Example usage:
const puzzle = `2001
0..0
1000
0..0`;
const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);