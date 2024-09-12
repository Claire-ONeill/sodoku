const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Add this for path handling
const app = express();
const port = 8000;

// Connect to SQLite database
const db = new sqlite3.Database('./sudoku.db');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get a random Sudoku board from the database
app.get('/random-board', (req, res) => {
    db.get(`SELECT * FROM sudoku_boards ORDER BY RANDOM() LIMIT 1`, (err, row) => {
        if (err) {
            console.error('Error retrieving board:', err.message);
            res.status(500).send('Error retrieving board');
        } else {
            res.json(row);
        }
    });
});

// Serve your HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
