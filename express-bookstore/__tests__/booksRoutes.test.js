const request = require("supertest");

const app = require("../../express-bookstore/app");
const db = require("../../express-bookstore/db");
const Book = require("../models/book");

describe("Auth Routes Test", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");

    let b1 = await Book.create({
      isbn: "999-9-99-999999-9",
      amazon_url: "https://www.amazon.com/example1",
      author: "Test_Person",
      language: "English",
      pages: 1000,
      publisher: "Test Masters",
      title: "Testing",
      year: 2000,
    });

    book_isbn = b1.isbn;
  });

  /** POST / bookData => {book: newBook}   */

  describe("POST /", function () {
    test("Create new book", async function () {
      let response = await request(app).post("/books").send({
        isbn: "111-1-11-111111-1",
        amazon_url: "https://www.amazon.com/example2",
        author: "Test_Person2",
        language: "English",
        pages: 1000,
        publisher: "Test Masters",
        title: "Testing 2: Electric Boogaloo",
        year: 2000,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.book).toHaveProperty("isbn");
      expect(response.body.book).toHaveProperty("amazon_url");
      expect(response.body.book).toHaveProperty("author");
      expect(response.body.book).toHaveProperty("language");
      expect(response.body.book).toHaveProperty("pages");
      expect(response.body.book).toHaveProperty("publisher");
      expect(response.body.book).toHaveProperty("title");
      expect(response.body.book).toHaveProperty("year");
    });
    test("Doesn't create new book", async function () {
      let response = await request(app).post("/books").send({
        isbn: "111-1-11-111111-1",
        amazon_url: "https://www.amazon.com/example2",
        author: "Test_Person2",
        language: "English",
        pages: 1000,
        publisher: "Test Masters",
        year: 2000,
      });

      expect(response.statusCode).toEqual(400);
    });
  });

  /** GET / => {books: [book, ...]}   */

  describe("GET /", function () {
    test("Gets all books", async function () {
      let response = await request(app).get("/books");
      const arr_books = response.body.books;

      expect(arr_books).toHaveLength(1);
      expect(arr_books[0]).toHaveProperty("isbn");
      expect(arr_books[0]).toHaveProperty("amazon_url");
      expect(arr_books[0]).toHaveProperty("author");
      expect(arr_books[0]).toHaveProperty("language");
      expect(arr_books[0]).toHaveProperty("pages");
      expect(arr_books[0]).toHaveProperty("publisher");
      expect(arr_books[0]).toHaveProperty("title");
      expect(arr_books[0]).toHaveProperty("year");
    });
  });

  /** GET /:id => {books: book}   */

  describe("GET /:isbn", function () {
    test("Gets a book", async function () {
      let response = await request(app).get(`/books/${book_isbn}`);

      const { book } = response.body;

      expect(book.isbn).toBe(book_isbn);
      expect(book).toHaveProperty("isbn");
      expect(book).toHaveProperty("amazon_url");
      expect(book).toHaveProperty("author");
      expect(book).toHaveProperty("language");
      expect(book).toHaveProperty("pages");
      expect(book).toHaveProperty("publisher");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("year");
    });

    test("Doesn't get a book", async function () {
      let response = await request(app).get(`/books/2`);

      expect(response.statusCode).toEqual(404);
    });
  });

  /** PUT /:isbn => {books: book}   */

  describe("PUT /:isbn", function () {
    test("Updates a book", async function () {
      let response = await request(app).put(`/books/${book_isbn}`).send({
        isbn: book_isbn,
        amazon_url: "https://www.amazon.com/example2",
        author: "Test_Person2",
        language: "English",
        pages: 1000,
        publisher: "Test Masters",
        title: "Testing 2: Electric Boogaloo",
        year: 2000,
      });

      const { book } = response.body;

      expect(book.isbn).toBe(book_isbn);
      expect(book).toHaveProperty("isbn");
      expect(book).toHaveProperty("amazon_url");
      expect(book).toHaveProperty("author");
      expect(book).toHaveProperty("language");
      expect(book).toHaveProperty("pages");
      expect(book).toHaveProperty("publisher");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("year");
    });

    test("Doesn't update a book", async function () {
      let response = await request(app).put(`/books/${book_isbn}`).send({
        amazon_url: "https://www.amazon.com/example2",
        author: "Test_Person2",
        publisher: "Test Masters",
        title: "Testing 2: Electric Boogaloo",
        year: 2000,
      });

      expect(response.statusCode).toEqual(400);
    });
  });

  /** DELETE /:isbn => {message: "Book deleted"}   */

  describe("DELETE /:isbn", function () {
    test("Deletes a book", async function () {
      let response = await request(app).delete(`/books/${book_isbn}`);

      const { message } = response.body;

      expect(message).toBe("Book deleted");
      expect(response.statusCode).toEqual(200);
    });

    test("Doesn't delete a book", async function () {
      let response = await request(app).put(`/books/2`);

      expect(response.statusCode).toEqual(400);
    });
  });
});

afterAll(async function () {
  await db.end();
});
