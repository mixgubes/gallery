'use strict'
var gElModal = document.querySelector('.modal');
var gNumber = 0;

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = '';

    books.map(book => {
        strHTML += `<tr>
        <td><div class="id-display">${book.id}</div></td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><div onclick="renderModal('${book.id}')" class="button read-button">Read</div></td>
        <td><div onclick="onUpdateBook('${book.id}')" class="button update-button">Update</div></td>
        <td><div onclick="onRemoveBook('${book.id}')" class="button delete-button">Delete</div></td>
        <td>
        <div class="rating-screen">
        <div onclick="onUpdateRate(-1,'${book.id}')"><i class="rate-button fas fa-minus-square"></i></div>
        <div class="rate">${book.details.rating}</div>
        <div onclick="onUpdateRate(1,'${book.id}')"><i class="rate-button fas fa-plus-square"></i></div>
        </div>
        </td>
        </tr>`
    });
    
    var elTableContainer = document.querySelector('tbody');
    elTableContainer.innerHTML = strHTML;
}

function renderModal(id) {
    var bookImg = getBookDetails(id, 'img');
    var bookText = getBookDetails(id, 'text');
    var bookName = getBookProperties(id, 'name');
    
    var strHTML = `<div onclick="onToggleModal()" class="modal-exit">X</div>
    <div class="bookImg">${bookImg}</div>
    <div>
    <div class="bookName"><h1>${bookName}</h1></div>
    <div class="bookText">${bookText}</div>
    </div>`
    
    gElModal.innerHTML = strHTML;
    onToggleModal()
}

function sortByKey(key){
    getSortedBooksByKey(key);
    renderBooks()
}

function renderPageNumber(){
    document.querySelector('.page-number').innerText = 'Page '+gCurrPage;
}

function onNextPage(){
    getNextPage();
    renderBooks();
    renderPageNumber()
}

function onLastPage(){
    getLastPage();
    renderBooks();
    renderPageNumber()
}

function onToggleModal() {
    gElModal.classList.toggle('hide');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var bookName = prompt('name?');
    if (!bookName) return
    var bookPrice = _getBookPrice()
    if (!bookPrice) bookPrice = 0;

    addBook(bookName, bookPrice);
    renderBooks();
}

function onUpdateRate(bookRating, bookId) {
    updateBookRate(bookRating, bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var newBookPrice = _getBookPrice();
    updateBookPrice(bookId, newBookPrice);
    renderBooks();
}

function _getBookPrice() {
    var bookPrice = +prompt('price?');
    return bookPrice;
}