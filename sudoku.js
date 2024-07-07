let board = [];
let solution = [];
let original = [];
let level = null; 
let selectedNumber = null;

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
                numberCell.classList.add('selected');
                selectedNumber = i;
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
        try {
            const resp = await fetch('https://sudoku-api.vercel.app/api/dosuku');
            if (!resp.ok) {
                throw new Error(`HTTP Status error: ${resp.status}`);
            }
            const data = await resp.json();
            board = data.newboard.grids[0].value;
            solution = data.newboard.grids[0].solution;
            original = data.newboard.grids[0].value;
            level = data.newboard.grids[0].difficulty;
            return { board, solution };
        } catch (err) {
            console.log(`Error encountered: ${err}`);
        }
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
        });
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
