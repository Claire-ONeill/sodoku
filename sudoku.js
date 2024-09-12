let board = [];
let solution = [];
let original = [];
let level = null; 
let selectedNumber = null;
let numInactive = false; 

document.addEventListener('DOMContentLoaded', () => {
    const sudokuBoard = document.getElementById('sudoku-board');
    const resetButton = document.getElementById('reset-game-button');
    const sudokuNumbers = document.getElementById('sudoku-numbers');
    const newGame = document.getElementById('new-game-button');
    const checkBoard = document.getElementById('check-board-button')

    function createBoard(puzzle) {
        sudokuBoard.innerHTML = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('input');
                cell.type = 'number';
                cell.min = 1;
                cell.max = 9;
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.classList.add('sudoku-cell'); // Add a class for consistent styling
    
                if (puzzle[row][col] !== 0) {
                    cell.value = puzzle[row][col];
                    cell.disabled = true;
                    cell.classList.add('cell-disabled', 'readonly');
                } else {
                    cell.addEventListener('click', () => {
                        const selectedRow = parseInt(cell.dataset.row);
                        const selectedCol = parseInt(cell.dataset.col);
                        highlightRowAndColumn(selectedRow, selectedCol); // Highlight based on clicked cell
                        if (selectedNumber !== null) {
                            const value = selectedNumber;
                            if (!isValidMove(puzzle, selectedRow, selectedCol, value)) {
                                cell.classList.add('invalid-move');
                                cell.value = value;
                                puzzle[selectedRow][selectedCol] = value;
                            } else {
                                cell.classList.remove('invalid-move');
                                cell.value = value;
                                puzzle[selectedRow][selectedCol] = value;
                            }
                        }
                    });
                    cell.readOnly = true;
                }
    
                sudokuBoard.appendChild(cell);
            }
        }
        sudokuNumbers.innerHTML = '';
        for (let i = 1; i <= 9; i++) {
            const numberCell = document.createElement('div');
            numberCell.textContent = i;
            numberCell.addEventListener('click', () => {
                document.querySelectorAll('#sudoku-numbers .selected').forEach(cell => {
                    cell.classList.remove('selected');
                });
                if (!numberCell.classList.contains('cell-used')){
                    selectedNumber = i;
                    numInactive = highlightNum(i); 
                    if (numInactive){
                        numberCell.classList.add('cell-used');
                        numberCell.classList.add('selected');
                    }
                    else{
                        numberCell.classList.add('selected');
                    }
                }
            });
            sudokuNumbers.appendChild(numberCell);
        }
    }
    function highlightRowAndColumn(row, col) {
        const cells = document.querySelectorAll('.sudoku-cell');
        cells.forEach(cell => {
            const cellRow = parseInt(cell.dataset.row);
            const cellCol = parseInt(cell.dataset.col);
            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            if (cellRow === row || cellCol === col) {
                cell.classList.add('highlight');
            } 
            else if (cellRow >= startRow && cellRow <= startRow + 2 &&
                cellCol >= startCol && cellCol <= startCol + 2){
                cell.classList.add('highlight');
            }else {
                cell.classList.remove('highlight');
            }
        });
    }
    function isValidMove(puzzle, row, col, value) {
        for (let c = 0; c < 9; c++) {
            if (puzzle[row][c] === value && c !== col) {
                return false;
            }
        }
        for (let r = 0; r < 9; r++) {
            if (puzzle[r][col] === value && r !== row) {
                return false;
            }
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (puzzle[r][c] === value && (r !== row || c !== col)) {
                    return false;
                }
            }
        }

        return true;
    }

async function generateBoard() {
    // List of 20 predefined Sudoku boards and solutions
    const boardsAndSolutions = [
        {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ]
        },
       {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ]
        },
        {
            board: [
                [0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 3, 0],
                [0, 0, 4, 0, 6, 0, 8, 0, 0],
                [0, 0, 0, 8, 0, 3, 0, 0, 0],
                [0, 0, 7, 0, 0, 0, 4, 0, 0],
                [0, 7, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 8, 0, 1, 0],
                [5, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            solution: [
                [7, 6, 3, 5, 4, 2, 9, 8, 1],
                [8, 9, 1, 4, 7, 6, 2, 5, 3],
                [4, 2, 5, 9, 1, 8, 6, 3, 7],
                [1, 5, 4, 3, 6, 7, 8, 2, 9],
                [6, 8, 2, 8, 9, 3, 7, 4, 5],
                [9, 3, 7, 2, 8, 4, 4, 6, 8],
                [2, 7, 6, 1, 3, 9, 5, 7, 4],
                [3, 4, 8, 7, 5, 8, 1, 1, 2],
                [5, 1, 9, 6, 2, 1, 3, 9, 6]
            ]
        },
        {
            board: [
                [0, 0, 0, 0, 0, 0, 4, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 8, 0],
                [0, 5, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 7, 0, 0, 0, 0, 0, 0],
                [4, 0, 0, 0, 6, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 6],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            solution: [
                [1, 2, 6, 3, 7, 8, 4, 5, 9],
                [3, 9, 4, 2, 5, 1, 7, 8, 6],
                [8, 5, 7, 9, 4, 6, 1, 2, 3],
                [2, 8, 7, 1, 9, 5, 6, 4, 3],
                [4, 3, 2, 5, 6, 7, 8, 9, 1],
                [5, 6, 1, 4, 8, 2, 3, 7, 8],
                [7, 1, 9, 6, 3, 4, 2, 1, 5],
                [9, 4, 8, 7, 2, 3, 5, 6, 7],
                [6, 7, 5, 8, 1, 9, 9, 3, 4]
            ]
        }, 
        {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ]
        },
        {
            board: [
                [0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 3, 0],
                [0, 0, 4, 0, 6, 0, 8, 0, 0],
                [0, 0, 0, 8, 0, 3, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 4, 0, 0],
                [0, 7, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 8, 0, 1, 0],
                [5, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            solution: [
                [7, 6, 3, 5, 4, 2, 9, 8, 1],
                [8, 9, 1, 4, 7, 6, 2, 5, 3],
                [4, 2, 5, 9, 1, 8, 6, 3, 7],
                [1, 5, 4, 3, 6, 7, 8, 2, 9],
                [6, 8, 2, 7, 9, 3, 1, 4, 5],
                [9, 3, 7, 8, 2, 1, 4, 6, 8],
                [3, 4, 9, 6, 8, 5, 7, 1, 2],
                [2, 1, 6, 4, 5, 8, 3, 9, 7],
                [5, 7, 8, 1, 3, 9, 2, 7, 6]
            ]
        },
        {
            board: [
                [0, 0, 8, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 6, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 5, 0, 0, 0],
                [0, 0, 0, 0, 8, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 9],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            solution: [
                [1, 2, 8, 9, 4, 6, 3, 7, 5],
                [9, 4, 7, 2, 6, 3, 8, 5, 1],
                [3, 5, 6, 4, 7, 8, 9, 1, 2],
                [7, 3, 4, 6, 2, 5, 1, 8, 9],
                [2, 8, 9, 7, 8, 4, 5, 6, 3],
                [6, 1, 5, 3, 9, 1, 7, 4, 8],
                [4, 7, 1, 8, 5, 9, 6, 3, 2],
                [8, 6, 2, 1, 3, 7, 4, 9, 7],
                [5, 9, 3, 2, 1, 2, 8, 6, 4]
            ]
        }
    ];

    // Select a random board from the list
    const randomIndex = Math.floor(Math.random() * boardsAndSolutions.length);
    const selectedBoard = boardsAndSolutions[randomIndex];

    board = selectedBoard.board;
    solution = selectedBoard.solution;
    original = board;

    return { board, solution };
}

    async function resetGame() {
        const { board, solution } = await generateBoard();
        createBoard(board);
        return board;
    }

    function resetBoard() {
        const cells = sudokuBoard.querySelectorAll('input');
        cells.forEach(cell => {
            if (!cell.classList.contains('cell-disabled') && !cell.classList.contains('readonly')) {
                cell.value = ''; 
                cell.classList.remove('invalid-move');
            }
            cell.classList.remove('highlight'); 
            cell.classList.remove('num-highlight');
        });
        document.querySelectorAll('#sudoku-numbers .selected').forEach(cell => {
            cell.classList.remove('selected');
        });
        document.querySelectorAll('#sudoku-numbers .cell-used').forEach(cell => {
            cell.classList.remove('cell-used');
        });
    }
    function highlightNum(num) {
        const cells = sudokuBoard.querySelectorAll('input');
        let isSolutionCorrect = true;
    
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellValue = parseInt(cell.value);
            const solutionValue = solution[row][col];
    
            if (solutionValue === num || cellValue === num) {
                if (cellValue === num){
                    cell.classList.add('num-highlight');
                }
                if (cellValue !== num){
                    cell.classList.remove('num-highlight');
                }
                if (solutionValue !== cellValue && solutionValue === num){
                    isSolutionCorrect = false; 
                }
            } 
            else {
                cell.classList.remove('num-highlight');
            }
        });
        return isSolutionCorrect; 
    }

    function checkSolution() {
        const cells = sudokuBoard.querySelectorAll('input');
        let isSolutionCorrect = true;
    
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellValue = parseInt(cell.value);
            const solutionValue = solution[row][col];
    
            if (cellValue !== solutionValue) {
                cell.classList.add('invalid-move');
                isSolutionCorrect = false;
            } else {
                cell.classList.remove('invalid-move');
            }
        });
    
        if (isSolutionCorrect) {
            window.alert('Congratulations! Puzzle solved correctly.');
        } else {
            window.alert('Solution is incorrect. Please check your moves.');
        }
    }
    resetGame();
    // difficultyButtons.addEventListener('click', handleLevelSelection); 
    checkBoard.addEventListener('click', checkSolution); 
    newGame.addEventListener('click', resetGame);
    resetButton.addEventListener('click', resetBoard);
});
