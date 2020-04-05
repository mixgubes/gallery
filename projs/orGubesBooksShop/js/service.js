'use strict'

const KEY = 'books';
var gBooks = _createBooks();
var gCurrPage = 0;
var gNumOfBooksToDisplay = 7;
var gStartIdx = 0;

function init() {
    renderBooks();
}

function getSortedBooksByKey(key) {
    gBooks.sort(function (book1, book2) {
        if (key === 'price') {
            var bookId1 = book1[key]
            var bookId2 = book2[key]
        } else {
            var bookId1 = book1[key].toUpperCase();
            var bookId2 = book2[key].toUpperCase();
        }
        if (bookId1 < bookId2) {
            return -1;
        }
        if (bookId1 > bookId2) {
            return 1;
        }
        return 0;
    });
}

function getBooksForDisplay() {
    var displayBooks = [];

    for (var i = gStartIdx; i < gStartIdx + gNumOfBooksToDisplay && i < gBooks.length; i++) {
        displayBooks.push(gBooks[i]);
    }
    return displayBooks;
}

function getLastPage() {
    if (gCurrPage <= 0) return
    gCurrPage--;
    gStartIdx -= gNumOfBooksToDisplay;
}

function getNextPage() {
    if (gBooks.length - gStartIdx <= gNumOfBooksToDisplay) return
    gCurrPage++;
    gStartIdx += gNumOfBooksToDisplay;
}

function getStartBookIndex() {
    if (gCurrPage === 0) return 0;
    gStartIdx = ((gCurrPage + 1) * gNumOfBooksToDisplay) - 1;
}

function updateBookPrice(bookId, bookPrice) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = bookPrice;
    _saveBooksToStorage();
}

function getBookDetails(bookId, detail) {
    const idx = gBooks.findIndex(book => book.id === bookId);
    var book = gBooks[idx];

    return book.details[detail];
}

function getBookProperties(bookId, property) {
    const idx = gBooks.findIndex(book => book.id === bookId);
    var book = gBooks[idx];
    var bookValue = book[property];

    return bookValue;
}

function getCurrPage() {
    return gCurrPage;
}

function updateBookRate(bookRating, bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks[bookIdx].details.rating += bookRating;
    if (gBooks[bookIdx].details.rating > 10) gBooks[bookIdx].details.rating = 10;
    if (gBooks[bookIdx].details.rating < 0) gBooks[bookIdx].details.rating = 0;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books && books.length) return books;
    books = [
        { id: makeId(5), name: 'aga', price: 30, 
        details: { text: '<p>' + getLoremIpsum(470) + '</p>', img: _getImgUrl(), rating: 0 } },
        { id: makeId(5), name: 'abddf', price: 50, 
        details: { text: '<p>' + getLoremIpsum(470) + '</p>', img: _getImgUrl(), rating: 0 } },
        { id: makeId(5), name: 'sgdh', price: 107, 
        details: { text: '<p>' + getLoremIpsum(470) + '</p>', img: _getImgUrl(), rating: 0 } }
    ]
    saveToStorage(KEY, books)
    return books;
}

function addBook(name, price) {
    var book = {
        name: name,
        price: price,
        id: makeId(5),
        details: { text: '<p>' + getLoremIpsum(470) + '</p>', img: _getImgUrl(), rating: 0 }
    }
    gBooks.push(book);
    _saveBooksToStorage();
}

function _getImgUrl() {
    var imgUrls = [
        `https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        `https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        `https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        `https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    ]
    var imgUrl = imgUrls[getRandomInt(0, imgUrls.length - 1)];
    return '<img src="' + imgUrl + '" alt="Book">';
}

function makeId(length) {
    var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
}

function getLoremIpsum(wordsCount) {
    var dummySentence = '';
    for (var i = 0; i < wordsCount; i++) {
        dummySentence += getWord() + ' ';
    }
    return dummySentence;
}

function getWord() {
    var dummyChar = 'q w e r t y u i o p a s d f g h j k l z x c v b n m'
    var dummyChars = dummyChar.split(' ');
    var randomNumberOfChar = getRandomInt(3, 5);
    var dummyString = [];

    for (var i = 0; i < randomNumberOfChar; i++) {
        dummyString.push(dummyChars[getRandomInt(0, dummyChars.length)])
    }
    return dummyString.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}