let newBook = document.querySelector('#newBook');
let bookDisplay = document.querySelector('#display');
let form = document.querySelector('#form');
let submitForm = document.querySelector('#submit');
let deleteBook = document.querySelector('#deleteBook');
let myLibrary = [];

//hides the form before it's toggled on
deleteBook.style.display = 'none';
form.style.display = 'none';

//toggles the form
newBook.addEventListener('click', () => {
    form.style.display = 'block';
    newBook.style.display = 'none';
})

//the constructor that creates the book object instances
function Book(title, author, numOfPages, readStatus) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.readStatus = readStatus
}

//prints info that will be put on the book display
Book.prototype.info = function() {
    return this.title+ ' by ' + this.author + ', ' + this.numOfPages + ' pages, ' + this.readStatus;
}

//add the book object into the myLibrary array
function addBookToLibrary(book) {
    let bookToBeAdded = book;
    return myLibrary.push(bookToBeAdded);
}

//display myLibrary array
function displayBook(library) {
    let txt = '';
    let bookProp;
    for (let i = 0; i < library.length; i++) {
            txt += library[i].info() + ' ';
    }
    return bookDisplay.innerHTML = txt;
}

//where input is processed after user clicks submit
submitForm.addEventListener('click', (ev) => {
    ev.preventDefault();
    let bookTitle = document.querySelector('#bookTitle').value;
    let bookAuthor = document.querySelector('#bookAuthor').value;
    let bookPages = document.querySelector('#bookPages').value;
    //check if the checkbox is ticked and turn it into a string
    let checkCheckbox = () => {
        let checkbox = document.querySelector('#bookHaveFinished');
            if (checkbox.checked == true) {
                return 'is finished.'
            } else {
                return 'is not finished.'
            }
        };
    let bookHaveFinished = checkCheckbox();
    //creates a new book object instance
    let submitBook = new Book(bookTitle, bookAuthor, bookPages, bookHaveFinished);
    addBookToLibrary(submitBook);
    displayBook(myLibrary);
    form.style.display = 'none';
    newBook.style.display = 'block';
})


//const walden = new Book('Walden', 'Thoreau', 265, 'is not finished.');
//const selfReliance = new Book('Self-Reliance', 'Ralph Waldo Emerson', 30, 'is finished.')