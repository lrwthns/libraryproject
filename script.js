let newBookButton = document.querySelector('#newBook');
let displayContainer = document.querySelector('#display-container');
let form = document.querySelector('#form');
let submitForm = document.querySelector('#submit');
let deleteBook = document.querySelector('#deleteBook');
let myLibrary = [];

//hides the form before it's toggled on
form.style.display = 'none';

//toggles the form
newBookButton.addEventListener('click', () => {
    form.style.display = 'block';
    newBookButton.style.display = 'none';
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
function displayBook(arr) {
    while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
    }
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        let newBookDisplayDiv = document.createElement('div');
        let txt = '';
        newBookDisplayDiv.classList.add('bookDisplay');
        displayContainer.appendChild(newBookDisplayDiv);
        txt += arr[i].info();
        newBookDisplayDiv.innerHTML = txt;
    }
}

//saves myLibrary to the local storage
function populateStorage(arr) {
    localStorage.setItem('savedLibrary', JSON.stringify(arr));
}

//checks if books have been added
function checkLocalStorage() {
    if (localStorage.length > 0) {
        let arr = localStorage.getItem('savedLibrary');
        let retrievedLibrary = JSON.parse(arr);
        for (let i = 0; i < retrievedLibrary.length; i++) {
            let newBookObject = new Book(retrievedLibrary[i].title, retrievedLibrary[i].author, retrievedLibrary[i].numOfPages, retrievedLibrary[i].readStatus);
            addBookToLibrary(newBookObject);
        }
        return displayBook(myLibrary);
    }
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
    populateStorage(myLibrary);
    displayBook(myLibrary);
    form.style.display = 'none';
    newBookButton.style.display = 'block';
})

//const walden = new Book('Walden', 'Thoreau', 265, 'is not finished.');
//const selfReliance = new Book('Self-Reliance', 'Ralph Waldo Emerson', 30, 'is finished.')