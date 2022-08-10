'use strict';

const books = createSampleBooks();

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
}

function createSampleBooks() {
    const books = [];
    Books[0] = new Book('The Hobbit', 'J. R. R. Tolkien', 352, true);
    Books[1] = new Book('Dune', 'Frank Herbert', 412, false);
    Books[2] = new Book('Harry Potter and the Sorcerer\'s Stone', 'J. K. Rowling', 223, true);
    return books;
}