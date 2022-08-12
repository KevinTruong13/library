'use strict';

const books = createSampleBooks();
displayBook(books[0], 0);

function Book(title, author, pages, isRead, coverPath = null) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
    this.coverPath = coverPath;
}

function createSampleBooks() {
    const books = [];
    books[0] = new Book('The Hobbit', 'J. R. R. Tolkien', 352, true, 'Hobbit.jpeg');
    books[1] = new Book('Dune', 'Frank Herbert', 412, false, 'Dune.jpg');
    books[2] = new Book('Harry Potter and the Sorcerer\'s Stone', 'J. K. Rowling', 223, true, 'Harry_Potter.jpg');
    return books;
}

// function displayBook(book, index) {
//     const main = document.querySelector('main');
//     const card = document.createElement(`article`);
//     const onHover = document.createElement('div');
//     card.setAttribute('id', index);
//     const closeButton = document.createElement(`button`);
//     closeButton.setAttribute('class', 'close');
//     closeButton.textContent = 'Remove';
//     const closeIcon = document.createElement('span');
//     closeIcon.setAttribute('class', 'material-symbols-outlined');
//     closeIcon.textContent = 'close';


//     closeButton.appendChild(closeIcon);
//     onHover.appendChild(closeButton);
//     card.appendChild(onHover);
//     main.appendChild(card);
// }

function displayBook(book, index) {
    const main = document.querySelector('main');
    main.insertAdjacentHTML('beforeend',
        `<article id="${index}">
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
            </div>ß
            <img src="./images/${book.coverPath}" alt="Book Cover">
        </article>`);
}