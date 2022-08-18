// Fix book info not displaying when clicking on child p element
'use strict';

// Fill main with sample books
const MAIN = document.querySelector('main');
const POPUP_FORM = document.querySelector('form');
const SUBMIT_BUTTON = document.querySelector('.submit');
const POPUP_FORM_CLOSE_BUTTON = document.querySelector('fieldset button span');
const TITLE_FIELD = document.querySelector('#title');
const AUTHOR_FIELD = document.querySelector('#author');
const PAGES_FIELD = document.querySelector('#pages');
const IS_READ_FIELD = document.querySelector('#isRead');
const COVER_FILE_FIELD = document.querySelector('#cover');
const ADD_BOOK_BUTTON = document.querySelector('body>button');

MAIN.books = createSampleBooks();
MAIN.books.forEach(displayBookSample);

addEventListeners();

// Book object constructor. Represents a book card.
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

// Inserts corresponding html for a new Book card and pushes the Book object to the books array
function displayBook(book, index) {
    MAIN.insertAdjacentHTML('beforeend', book.coverPath ? createBookWithCoverHTML(book, index) : createBookWithoutCoverHTML(book, index));
    MAIN.books.push(book);
}

function displayBookSample(book, index) {
    MAIN.insertAdjacentHTML('beforeend', createBookSampleWithCoverHTML(book, index));
}

function addEventListeners() {
    document.querySelectorAll('article div').forEach(bookCard => bookCard.addEventListener('click', displayBookInfo));
    document.querySelectorAll('article .read-status').forEach(bookCardReadStatus => bookCardReadStatus.addEventListener('click', toggleReadStatus));
    document.querySelectorAll('article .close').forEach(bookCardRemoveButton => bookCardRemoveButton.addEventListener('click', removeBook));
    POPUP_FORM_CLOSE_BUTTON.addEventListener('click', displayBookInfo);
    ADD_BOOK_BUTTON.addEventListener('click', displayBookInfo);
    POPUP_FORM.addEventListener('click', displayBookInfo);
}

function newBookAddEventListeners(bookID) {
    const bookCard = getBookCardByIndex(bookID);
    bookCard.querySelector('.close').addEventListener('click', displayBookInfo);
    bookCard.querySelector('.read-status').addEventListener('click', toggleReadStatus);
    bookCard.querySelector('div').addEventListener('click', displayBookInfo);
}

function displayBookInfo(e) {
    if (this === e.target) {   // Callback function will only trigger if event caller is same as event target (stops bubbling)
        togglePopUp();
        const bookID = this.parentNode?.id;    // Value of null if caller's parent node is not a book card

        if (!POPUP_FORM.classList.contains('hidden') && bookID) {    // If not hidden and caller's parent node is a book card, fill fields and prime for book edit
            fillBookDataFields(bookID);

            SUBMIT_BUTTON.removeEventListener('click', createBookSubmission);
            SUBMIT_BUTTON.addEventListener('click', createBookEdit);
        } else if (!POPUP_FORM.classList.contains('hidden') && !bookID) // If not hidden and caller's parent node is not a book card, prime for new book submission
            SUBMIT_BUTTON.removeEventListener('click', createBookEdit);
        SUBMIT_BUTTON.addEventListener('click', createBookSubmission);
    }
}

function fillBookDataFields(bookID) {
    const book = MAIN.books[bookID];
    document.querySelector('#title').value = book.title;
    document.querySelector('#author').value = book.author;
    document.querySelector('#pages').value = book.pages;

    if (book.isRead) {
        document.querySelector('#isRead').checked = true;
    }
}

function emptyFields() {
    document.querySelector('#title').value = document.querySelector('#author').value = document.querySelector('#pages').value = document.querySelector('#cover').value = '';
    document.querySelector('#isRead').checked = false;
}

function createBookSubmission() {
    const bookID = MAIN.books.length;

    if (!TITLE_FIELD.checkValidity() || !AUTHOR_FIELD.checkValidity() || !PAGES_FIELD.checkValidity()) {
        reportInvalid(TITLE_FIELD, AUTHOR_FIELD, PAGES_FIELD);
    } else {
        const newBook = new Book(TITLE_FIELD.value, AUTHOR_FIELD.value, PAGES_FIELD.value, IS_READ_FIELD.checked, COVER_FILE_FIELD.files.length);
        displayBook(newBook, bookID);

        if (COVER_FILE_FIELD.files.length === 1) {
            setCover(bookID);
        }

        newBookAddEventListeners(bookID);
        togglePopUp()
    }

}

function reportInvalid(...fields) {
    for (const field of fields) {
        field.reportValidity();
    }
}

function createBookEdit() {
    // ToDo
    console.log('woof');
}

function togglePopUp() {
    document.querySelector('form').classList.toggle('hidden');
    emptyFields();
}

function toggleReadStatus(e) {
    //ToDo
    console.log(e);
}

function removeBook(e) {
    // ToDo
}

function getBookCardByIndex(bookID) {
    return document.querySelector(`#\\3${bookID} `);
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
            <img src="" alt="Book Cover">
        </article>`
}

function createBookSampleWithCoverHTML(book, index) {
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
    return `<article class="no-cover" id=${index}>
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
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
        </article>`
}


// The following code was taken from: https://stackoverflow.com/questions/31850732/save-a-file-image-to-localstorage-html 
// ,due to my lack of knowledge on file storage at this time.

// Add a change listener to the file input to inspect the uploaded file.
function setCover(bookID) {
    var img = getBookCardByIndex(bookID).querySelector('img');

    var file = COVER_FILE_FIELD.files[0];

    // Create a file reader
    var fReader = new FileReader();

    // Add complete behavior
    fReader.onload = function () {
        // Show the uploaded image to banner.
        img.src = fReader.result;

        // Save it when data complete.
        // Use your function will ensure the format is png.
        localStorage.setItem("imgData", getBase64Image(img));
        // You can just use as its already a string.
        // localStorage.setItem("imgData", fReader.result);
    };

    // Read the file to DataURL format.
    fReader.readAsDataURL(file);
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}