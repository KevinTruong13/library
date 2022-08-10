'use strict';

const bookCards = document.querySelectorAll('article');
bookCards.forEach(bookCard => {
    bookCard.addEventListener('mouseenter', showHover);
    bookCard.addEventListener('mouseleave', hideHover);
})

function showHover(e) {
    console.log(e);
}

function hideHover(e) {
    console.log('hi');
}