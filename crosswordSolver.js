function crosswordSolver(puzzel, words) {
  if (typeof puzzel !== 'string' || !Array.isArray(words)) {
    return "Error"
  }

  if (puzzel.trim() === '' || words.length === 0) {
    return "Error"
  }

  for (let word of words) {
    if (typeof word !== 'string') {
      return "Error";
    }
  }

  // 2D array
  let grid = gridThePuzzle(puzzel)
  console.log(grid)
  const rows = grid.length;
  const cols = grid[0].length;

  if (rows === 0 || cols === 0 || !grid.every(row => row.length === cols)) {
    return "Error"
  }

  // Find all word positions in the grid and validate starting numbers
  const wordPositions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const num = parseInt(grid[r][c]);
      if (grid[r][c] !== '.' && !isNaN(num)) {
        if (num > 2) {
          return "Error"
        }
        let wordCount = 0;
        // Check horizontal
        // check if we can write horizontally, start of row or after a . means valid place to start a new word
        if (c === 0 || grid[r][c - 1] === '.') {
          let length = 0;
          while (c + length < cols && grid[r][c + length] !== '.') length++;
          if (length > 1) {
            wordPositions.push({ row: r, col: c, length, direction: 'horizontal' });
            wordCount++;
          }
        }
        // Check vertical
        // the same as horizontally but this time verticallu 
        if (r === 0 || grid[r - 1][c] === '.') {
          let length = 0;
          while (r + length < rows && grid[r + length][c] !== '.') length++;
          if (length > 1) {
            wordPositions.push({ row: r, col: c, length, direction: 'vertical' });
            wordCount++;
          }
        }
        // Validate that the starting number matches the number of words that can start
        if (wordCount !== num) {
          return "Error"
        }
      }
    }
  }
  console.log(wordPositions)

  // checks if the start positions are the same as the words 
  if (wordPositions.length !== words.length) {
    return "Error"
  }
  // ensures that words array hasn't duplicated words, Set accepts only one word 
  if (new Set(words).size !== words.length) {
    return "Error"
  }
  // ensures that words has only letter no number or special characters 
  if (words.some(word => !/^[a-zA-Z]+$/.test(word))) {
    return "Error"
  }
  // mark used words 
  const usedWords = new Set();
  let solutionCount = 0;
  // mark solutions 
  let solutions = new Set();

  function solve(posIndex) {
    if (posIndex === wordPositions.length) {
      if (isValidSolution()) {
        const solution = grid.map(row => row.join('')).join('\n');
        if (!solutions.has(solution)) {
          solutionCount++;
          solutions.add(solution);
        }
      }
      return;
    }

    const { row, col, length, direction } = wordPositions[posIndex];
    for (const word of words) {
      if (!usedWords.has(word) && canPlaceWord(word, row, col, length, direction)) {
        placeWord(word, row, col, direction);
        usedWords.add(word);
        solve(posIndex + 1);

        removeWord(word, row, col, direction);
        usedWords.delete(word);
      }
    }
  }

  solve(0);

  function canPlaceWord(word, row, col, length, direction) {
    if (word.length !== length) return false;
    for (let i = 0; i < length; i++) {
      // if horizontalCheck, keep the row and increament the columns
      // else keep the column and increament row 
      const r = direction === 'horizontal' ? row : row + i;
      const c = direction === 'horizontal' ? col + i : col;
      if (r >= rows || c >= cols) return false;
      const cellContent = grid[r][c];
      // is the actual value in the grid conflicts with a . a valid num and the word char 
      // (no intersection between the 2 words) return false
      if (cellContent !== '.' && cellContent !== word[i] && isNaN(parseInt(cellContent))) {
        return false;
      }
    }
    return true;
  }

  function placeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'horizontal' ? row : row + i;
      const c = direction === 'horizontal' ? col + i : col;
      grid[r][c] = word[i];
    }
  }

  function removeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'horizontal' ? row : row + i;
      const c = direction === 'horizontal' ? col + i : col;
      if (isNaN(parseInt(grid[r][c]))) {
        grid[r][c] = '.';
      }
    }
  }
  // this function will transform the puzzle to a grid 2d matrix 
  function gridThePuzzle(emptyPuzzle) {
    return emptyPuzzle.split('\n').map(index => index.split(''))
    // // this var will hold the empty puzzle as an array
    // let puzzArr = emptyPuzzle.split("\n")
    // // this is our main 2d matrix 
    // let matrix_array = []
    // // we'll loop over instances, and return them finally to 2d array
    // for (let instance of puzzArr) {
    //     let tempArr = instance.split('')
    //     // remember, to use push method, u should declare the array 
    //     matrix_array.push(tempArr)
    // }
    // return matrix_array
  }
  // checks whether the crossword grid contains only valid words from the given list.
  function isValidSolution() {
    const gridWords = new Set();
   
    // Check horizontal words
    for (let r = 0; r < rows; r++) {
      let word = '';
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== '.') {
          word += grid[r][c]; // Build a word character by character
        } else if (word.length > 1) {
          gridWords.add(word); // Store valid words (length > 1)
          word = ''; // reset the word tracker
        } else {
          word = '';
        }
      }
      if (word.length > 1) {
        gridWords.add(word);
      }

    }
    console.log(gridWords)

    // Check vertical words
    for (let c = 0; c < cols; c++) {
      let word = '';
      for (let r = 0; r < rows; r++) {
        if (grid[r][c] !== '.') {
          word += grid[r][c];
        } else if (word.length > 1) {
          gridWords.add(word);
          word = '';
        } else {
          word = '';
        }
      }
      if (word.length > 1) {
        gridWords.add(word);
      }
    }
    console.log(gridWords)

    // Check if all grid words are in the input word list
    for (const word of gridWords) {
      if (!words.includes(word)) {
        return false;
      }
    }

    return gridWords.size === words.length;
  }



  if (solutionCount === 1) {
    console.log([...solutions][0]);
  } else if (solutionCount > 1) {
    console.log('Error');
  } else {
    console.log('Error');
  }
}


const Puzzle = `2001\n0..0\n1000\n0..0`

const words = ['casa', 'alan', 'ciAo', 'Anta']
crosswordSolver(Puzzle, words)

