const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./books.db');

db.all('SELECT * FROM book', [], (error, rows) => {
    if (error) {
        console.error('Error retrieving books:', error.message);
    } else {
        console.table(rows);
    }

    db.close();
});