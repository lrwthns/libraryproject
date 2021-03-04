let newBook = document.querySelector('#newBook');
let bookDisplay = document.querySelector('#display');
let form = document.querySelector('#form');
let submitForm = document.querySelector('#submit');
let deleteBook = document.querySelector('#deleteBook');

deleteBook.style.display = 'none';
form.style.display = 'none';

newBook.addEventListener('click', () => {
    form.style.display = 'block';
    newBook.style.display = 'none';
})

function Book(title, author, numOfPages, readStatus) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.readStatus = readStatus
}

Book.prototype.info = function() {
    return this.title+ ' by ' + this.author + ', ' + this.numOfPages + ' pages, ' + this.readStatus;
}

function addBookToLibrary(book) {
    let bookToBeAdded = book;
    return myLibrary.push(bookToBeAdded);
}

const walden = new Book('Walden', 'Thoreau', 265, 'is not finished.');
const selfReliance = new Book('Self-Reliance', 'Ralph Waldo Emerson', 30, 'is finished.')
let myLibrary = [];



function displayBook(library) {
    let txt = '';
    let bookProp;
    for (let i = 0; i < library.length; i++) {
            txt += library[i].info() + ' ';
    }
   return bookDisplay.innerHTML = txt;
}


submitForm.addEventListener('click', (ev) => {
    ev.preventDefault();
    let bookTitle = document.querySelector('#bookTitle').value;
    let bookAuthor = document.querySelector('#bookAuthor').value;
    let bookPages = document.querySelector('#bookPages').value;
    // let bookHaveFinished = document.querySelector('#bookHaveFinished').value;
    let checkCheckbox = () => {
        let checkbox = document.querySelector('#bookHaveFinished');
            if (checkbox.checked == true) {
                return 'is finished.'
            } else {
                return 'is not finished.'
            }
        };
    let bookHaveFinished = checkCheckbox();
    let submitBook = new Book(bookTitle, bookAuthor, bookPages, bookHaveFinished);
    addBookToLibrary(submitBook);
    displayBook(myLibrary);
    form.style.display = 'none';
    newBook.style.display = 'block';
})
