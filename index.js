const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    app.listen(3001, () => {
      console.log("Server Running at http://localhost:3001/");
    });
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM book
    ORDER BY book_id;
    `;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
