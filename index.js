document.addEventListener('DOMContentLoaded', () => {
    const gameForm = document.getElementById('game-form');

    gameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const difficulty = document.getElementById('difficulty').value;
        window.location.href = `sudoku.html?difficulty=${difficulty}`;
    });
});
