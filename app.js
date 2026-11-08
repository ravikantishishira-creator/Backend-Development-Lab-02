const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

let db = null;

async function initializeDBAndServer() {
    try {
        db = await open({
            filename: path.join(__dirname, 'books.db'),
            driver: sqlite3.Database
        });

        console.log('Database connected successfully!');

        // GET all books
        app.get('/books/', async (req, res) => {
            try {
                const books = await db.all('SELECT * FROM book');
                res.status(200).json(books);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // GET a book by ID
        app.get('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;

                const book = await db.get(
                    'SELECT * FROM book WHERE id = ?',
                    [bookId]
                );

                if (!book) {
                    return res.status(404).json({ error: 'Book not found' });
                }

                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // POST a new book
        app.post('/books/', async (req, res) => {
            try {
                const { title, author, price, pages } = req.body;

                if (!title || !author || price == null || pages == null) {
                    return res.status(400).json({
                        error: 'All fields are required'
                    });
                }

                const result = await db.run(
                    `INSERT INTO book (title, author, price, pages)
                     VALUES (?, ?, ?, ?)`,
                    [title, author, price, pages]
                );

                res.status(201).json({
                    message: 'Book added successfully',
                    bookId: result.lastID
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // PUT update a book
        app.put('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;
                const { title, author, price, pages } = req.body;

                if (!title || !author || price == null || pages == null) {
                    return res.status(400).json({
                        error: 'All fields are required'
                    });
                }

                const result = await db.run(
                    `UPDATE book
                     SET title = ?, author = ?, price = ?, pages = ?
                     WHERE id = ?`,
                    [title, author, price, pages, bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).json({ error: 'Book not found' });
                }

                res.status(200).json({
                    message: 'Book updated successfully'
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // DELETE a book
        app.delete('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;

                const result = await db.run(
                    'DELETE FROM book WHERE id = ?',
                    [bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).json({ error: 'Book not found' });
                }

                res.status(200).json({
                    message: 'Book deleted successfully'
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Handle invalid routes
        app.use((req, res) => {
            res.status(404).json({ error: 'Route not found' });
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to database:', error.message);
    }
}

initializeDBAndServer();