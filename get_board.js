const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

// Connect to SQLite database (creates the database if it doesn't exist)
const db = new sqlite3.Database('./sudoku.db');

// Create table for puzzles and solutions if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sudoku_boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      puzzle TEXT NOT NULL,
      solution TEXT NOT NULL
    )
  `);
});

let rowCount = 0; // Counter for rows processed
const maxRows = 100; // Maximum number of rows to insert

// Function to insert puzzle and solution into the database
function insertBoard(puzzle, solution) {
  db.run(
    `INSERT INTO sudoku_boards (puzzle, solution) VALUES (?, ?)`,
    [puzzle, solution],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
}

// Read CSV file and insert data into the database
fs.createReadStream('sudoku.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (rowCount < maxRows) {
      const puzzle = row.puzzle;
      const solution = row.solution;
      insertBoard(puzzle, solution);
      rowCount++;
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Database connection closed');
    });
  });
