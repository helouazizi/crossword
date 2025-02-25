function crosswordSolver(emptyPuzzle, words) {
  
  if (check_inputs(emptyPuzzle, words)) {
    console.log("Error");
    return;
  }

  words.sort((a, b) => b.length - a.length);

  let puzzle_matrix = split(emptyPuzzle);

  let positions = findwordPositions(puzzle_matrix);


  //let result = puzzle_matrix.map(row => row.join('')).join('\n');
  console.log(positions,puzzle_matrix);
}

// Input validation function
function check_inputs(emptyPuzzle, words) {
  let regex = /^[012.\n]+$/g;
  let matrix = split(emptyPuzzle);
  const wordLength = matrix[0].length;
  const puzzleLength = matrix.length;

  if (!matrix.every(row => row.length === wordLength)) {
    return true; // Not all rows have the same length
  }

  let uniqWords = new Set();
  for (let word of words) {
    if (uniqWords.has(word) || word.length > wordLength || word.length === 0 || word.length > puzzleLength) {
      return true; // Duplicate word or invalid word length
    }
    uniqWords.add(word);
  }

  return !regex.test(emptyPuzzle); // Check if puzzle contains invalid characters
}

function findwordPositions(puzzle_matrix) {
  let positions = [];

  for (let i = 0; i < puzzle_matrix.length; i++) {
    for (let j = 0; j < puzzle_matrix[i].length; j++) {
      if (/[1-2]/.test(puzzle_matrix[i][j])) {
        let currentValue = parseInt(puzzle_matrix[i][j], 10);

        // Check for horizontal placement (H)
        if (j === 0 || puzzle_matrix[i][j - 1] === '.') {
          if (j + 1 < puzzle_matrix[i].length && puzzle_matrix[i][j + 1] === '0') {
            positions.push({ row: i, col: j, direction: 'H', length: currentValue });
          }
        }

        // Check for vertical placement (V)
        if (i === 0 || puzzle_matrix[i - 1][j] === '.') {
          if (i + 1 < puzzle_matrix.length && puzzle_matrix[i + 1][j] === '0') {
            positions.push({ row: i, col: j, direction: 'V', length: currentValue });
          }
        }
      }
    }
  }

  return positions;
}

// Split the puzzle into a 2D array
function split(puzzle) {
  return puzzle.split('\n').map(row => row.split(''));
}

// Example usage
const puzzle = `2001
0..0
1000
0..0`;
const words = ["c", "alan", "ciao", "anta"];

crosswordSolver(puzzle, words);
