// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sudokuBoard = document.getElementById('sudoku-board');
    const resetButton = document.getElementById('reset-button');

    // Example Sudoku puzzle (0 represents empty cells)
    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function createBoard() {
        sudokuBoard.innerHTML = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('input');
                cell.type = 'number';
                cell.min = 1;
                cell.max = 9;
                if (puzzle[row][col] !== 0) {
                    cell.value = puzzle[row][col];
                    cell.disabled = true;
                }
                sudokuBoard.appendChild(cell);
            }
        }
    }

    // Function to reset the game
    function resetGame() {
        createBoard();
    }

    // Initialize the game
    createBoard();

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);
});
