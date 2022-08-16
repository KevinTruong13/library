'use strict';

const main = document.querySelector('main');
main.books = createSampleBooks();
main.books.forEach(displayBookSample);
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
    main.books.push(book);
}

function displayBookSample(book, index) {
    const main = document.querySelector('main');
    main.insertAdjacentHTML('beforeend', createBookSampleWithCoverHTML(book, index));
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
        togglePopUp();
        const submitButton = document.querySelector('.submit');
        const bookID = this?.id;

        if (!popUpForm.classList.contains('hidden') && bookID) {
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
        document.querySelector('#isRead').checked = true;
    }
}

function emptyFields() {
    document.querySelector('#title').value = document.querySelector('#author').value = document.querySelector('#pages').value = '';
    document.querySelector('#isRead').checked = false;
    document.querySelector('#cover').value = '';
}

function createBookSubmission() {
    const titleField = document.querySelector('#title');
    const authorField = document.querySelector('#author');
    const pagesField = document.querySelector('#pages');
    const isReadField = document.querySelector('#isRead');
    const coverFileField = document.querySelector('#cover');
    const bookID = main.books.length;

    if (!titleField.checkValidity() || !authorField.checkValidity() || !pagesField.checkValidity()) {
        reportInvalid(titleField, authorField, pagesField);
    } else {
        const newBook = new Book(titleField.value, authorField.value, pagesField.value, isReadField.checked, coverFileField.files.length);
        displayBook(newBook, bookID);

        if (coverFileField.files.length === 1) {
            setCover(bookID);
        }

        togglePopUp()
    }

}

function reportInvalid(...fields) {
    for (const field of fields) {
        field.reportValidity();
    }
}

function createBookEdit() {
    console.log('woof');
}

function togglePopUp() {
    document.querySelector('form').classList.toggle('hidden');
    emptyFields();
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
            </div>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
        </article>`
}


// The following code was taken from: https://stackoverflow.com/questions/31850732/save-a-file-image-to-localstorage-html ,due to my lack of file storage at this time.

// Add a change listener to the file input to inspect the uploaded file.
function setCover(bookID) {
    var img = document.querySelector(`#\\3${bookID}  img`);
    const coverInput = document.getElementById('cover');

    var file = coverInput.files[0];

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