const myLibrary = [];

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    
    this.info = function() {
        const infoString = `${this.title} by ${this.author}, ${this.numPages} pages, ${isRead ? `has been read` : `not read yet`}`;
        console.log(infoString);
        return infoString;
    }
}

// Form
const bookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('add-book-title');
const authorInput = document.getElementById('add-book-author');
const pagesInput = document.getElementById('add-book-pages');
const readInput = document.getElementById('add-book-read');
const submitBtn = document.getElementById('submit-book');

// Books grid
const booksGrid = document.querySelector('.books__section');

// Event listeners
bookForm.addEventListener('submit', submitBook);
booksGrid.addEventListener('click', handleBookActions);

// Functions
function submitBook(event) {
    event.preventDefault();

    const bookTitle = titleInput.value;
    const bookAuthor = authorInput.value;
    const bookPages = pagesInput.value;
    const bookRead = readInput.checked;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    resetGrid();
    displayBooks(myLibrary);
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function createBookElement(book, index) {
    const bookMarkup = `
        <div class="book__data">
        <h3 class="book__title">${book.title}</h3>
        <p class="book__author">by ${book.author}</p>
        <p class="book__pages"><strong>${book.numPages}</strong> pages</p>
        </div>
        <div class="book__actions">
        <button class="action-btn read-btn">${book.isRead ? 'Completed' : 'Not read'}</button>
        <button class="action-btn remove-btn" data-book-index="${index}">Remove</button>
        </div>
    `;
    const bookElement = document.createElement('article');
    bookElement.classList.add('book');
    bookElement.innerHTML = bookMarkup;
    return bookElement
}

function displayBooks(library) {
    library.forEach((book, index) => {
        const bookElement = createBookElement(book, index);
        booksGrid.appendChild(bookElement);
    });
}

function handleBookActions(event) {
    if (event.target.classList.contains('remove-btn')) {
      const bookIndex = event.target.dataset.bookIndex;
      removeBookFromLibrary(bookIndex);
    }
}

function removeBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    resetGrid();
    displayBooks(myLibrary);
}

function resetGrid() {
    booksGrid.innerHTML = '';
}

