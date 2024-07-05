// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sudokuBoard = document.getElementById('sudoku-board');
    const resetButton = document.getElementById('reset-button');
    const sudokuNumbers = document.getElementById('sudoku-numbers'); 
    const newGame = document.getElementById('new-game-button'); 
    let solution = []; 
    let selectedNumber = null; 
    let currBoard = []; 
    // Example Sudoku puzzle (0 represents empty cells)
    const board = [
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

    function createBoard(puzzle = board) {
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
                }else{
                    cell.addEventListener('click', ()=>{
                        if (selectedNumber !== null){
                            cell.value = selectedNumber; 
                        }
                    });
                }
                sudokuBoard.appendChild(cell);
            }
        }
        // Create the row of numbers below the board
        sudokuNumbers.innerHTML = '';
        for (let i = 1; i <= 9; i++) {
            const numberCell = document.createElement('div');
            numberCell.textContent = i;
            numberCell.addEventListener('click', ()=>{
                document.querySelectorAll('#sudoku-numbers .selected').forEach(cell =>{
                    cell.classList.remove('selected');
                });
                numberCell.classList.add('selected'); 
                selectedNumber = i; 
            });
            sudokuNumbers.appendChild(numberCell);
        }
    }
    async function generateBoard(){
        try{
            const resp = await fetch('https://sudoku-api.vercel.app/api/dosuku'); 
            if (!resp.ok){
                throw new Error(`HTTP Status error: ${resp.status}`); 
            }
            const data = await resp.json(); 
            console.log(`Data: ${JSON.stringify(data.newboard.grids[0])}`); 
            

        }catch (err){
            console.log(`Error encountered: ${err}`); 
        }
    }

    // Function to reset the game
    function resetGame() {
        createBoard();
        generateBoard(); 
    }

    // Initialize the game
    createBoard();

    newGame.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);
});
