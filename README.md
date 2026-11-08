# Backend Development Lab 02 – SQLite CRUD Operations

## Project Description
This project demonstrates how to connect an Express.js server with an SQLite database and perform CRUD (Create, Read, Update, Delete) operations on book records.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Database Details
**Database Name:** books.db  
**Table Name:** book

| Column | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Retrieve all books |
| GET | /books/:bookId/ | Retrieve a book by ID |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

## How to Run the Project

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open:
   `http://localhost:3000/books/`

## Testing
All five API endpoints were tested using Postman.

## Screenshots
The screenshots folder contains the API testing results and database verification.
