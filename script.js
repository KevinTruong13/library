'use strict';

const bookCards = document.querySelectorAll('article.hasCover');
bookCards.forEach(bookCard => {
    bookCard.addEventListener('mouseenter', showHover);
    bookCard.addEventListener('mouseleave', hideHover);
})

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
}

function showHover(e) {
    console.log(e);
}

function hideHover(e) {
    console.log('hi');
}