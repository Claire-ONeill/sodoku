let board = [];
let solution = [];
let original = [];
let selectedNumber = null;

document.addEventListener('DOMContentLoaded', () => {
    const sudokuBoard = document.getElementById('sudoku-board');
    const resetButton = document.getElementById('reset-game-button');
    const sudokuNumbers = document.getElementById('sudoku-numbers'); 
    const newGame = document.getElementById('new-game-button'); 
    let solution = []; 
    let selectedNumber = null; 
    let currBoard = []; 

    function createBoard(puzzle, solution) {
        sudokuBoard.innerHTML = '';
        console.log(`puzzle: ${puzzle}`); 
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
            board = data.newboard.grids[0].value; 
            solution = data.newboard.grids[0].solution; 
            original = data.newboard.grids[0].value;

            console.log(board);

            return {board, solution}; 
        }catch (err){
            console.log(`Error encountered: ${err}`); 
        }
    }
    async function resetGame() {
        board, solution = await generateBoard(); 
        createBoard(board, solution); 
    }

    // Initialize the game
    resetGame(); 

    newGame.addEventListener('click', resetGame);

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);
});
