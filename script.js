'use strict';

const main = document.querySelector('main');
main.books = createSampleBooks();
main.books.forEach(displayBook);
addEventListeners();

function Book(title, author, pages, isRead, coverPath = "") {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
    this.coverPath = coverPath;
}

function createSampleBooks() {
    const books = [];
    books[0] = new Book('The Hobbit', 'J. R. R. Tolkien', 352, true, 'Hobbit.jpeg');
    books[1] = new Book('Dune', 'Frank Herbert', 412, false, 'Dune.jpeg');
    books[2] = new Book('Harry Potter and the Sorcerer\'s Stone', 'J. K. Rowling', 223, true, 'Harry_Potter.jpg');
    return books;
}

function displayBook(book, index) {
    const main = document.querySelector('main');
    main.insertAdjacentHTML('beforeend', book.coverPath ? createBookWithCoverHTML(book, index) : createBookWithoutCoverHTML(book, index));
}

function addEventListeners() {
    document.querySelectorAll('article').forEach(bookCard => bookCard.addEventListener('click', displayBookInfo));
    document.querySelector('fieldset button span').addEventListener('click', displayBookInfo);
    document.querySelector('body>button').addEventListener('click', displayBookInfo);
    document.querySelector('form').addEventListener('click', displayBookInfo)
}

function displayBookInfo(e) {
    const popUpForm = document.querySelector('form');

    if (this != popUpForm || this === e.target) {
        togglePopUp(popUpForm);
        const submitButton = document.querySelector('.submit');
        const bookID = this?.id;

        if (popUpForm.classList.contains('hidden')) {
            emptyFields();
        } else if (!popUpForm.classList.contains('hidden') && bookID) {
            fillBookDataFields(bookID);

            submitButton.removeEventListener('click', createBookSubmission);
            submitButton.addEventListener('click', createBookEdit);
        } else if (!bookID) {
            submitButton.removeEventListener('click', createBookEdit);
            submitButton.addEventListener('click', createBookSubmission);
        }
    }
}

function fillBookDataFields(bookID) {
    const book = document.querySelector('main').books[bookID];
    document.querySelector('#title').value = book.title;
    document.querySelector('#author').value = book.author;
    document.querySelector('#pages').value = book.pages;

    if (book.isRead) {
        document.querySelector('#isRead').setAttribute('checked', '');
    }
}

function emptyFields() {
    document.querySelector('#title').value = document.querySelector('#author').value = document.querySelector('#pages').value = '';
    document.querySelector('#isRead').removeAttribute('checked');
}

function createBookSubmission() {
    const titleField = document.querySelector('#title');
    const authorField = document.querySelector('#author');
    const pagesField = document.querySelector('#pages');
    if (!titleField.checkValidity() || !authorField.checkValidity() || !pagesField.checkValidity()) {
        reportInvalid(titleField, authorField, pagesField);

    }

}

function reportInvalid(...fields) {
    for (const field of fields) {
        console.log(field);
        field.reportValidity();
    }
}

function createBookEdit() {
    console.log('woof');
}

function togglePopUp(popUpForm) {
    popUpForm.classList.toggle('hidden');
}

function createBookWithCoverHTML(book, index) {
    return `<article id="${index}">
            <div>
                <button class="close">
                    Remove
                    <span class="material-symbols-outlined">close</span>
                </button>
                <button class="read-status">
                    ${book.isRead ? 'Read' : 'Unread'}
                    <span class="material-symbols-outlined">${book.isRead ? 'visibility' : 'visibility_off'}</span>
                </button>
                <p>View and Edit Info</p>
            </div>
            <img src="./images/${book.coverPath}" alt="Book Cover">
        </article>`
}

function createBookWithoutCoverHTML(book, index) {
    return `<article class="no-cover">
            <div>
                <button class="close">
                    Remove
                    <span class="material-symbols-outlined">close</span>
                </button>
                <button class="read-status">
                    ${book.isRead ? 'Read' : 'Unread'}
                    <span class="material-symbols-outlined">${book.isRead ? 'visibility' : 'visibility_off'}</span>
                </button>
            </div>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
        </article>`
}