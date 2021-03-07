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
        let deleteButton = document.createElement('button');
        let toggleReadStatus = document.createElement('button');
        let txt = '';
        newBookDisplayDiv.classList.add('bookDisplay');
        deleteButton.classList.add('deleteBook');
        toggleReadStatus.classList.add('readStatus');
        displayContainer.appendChild(newBookDisplayDiv);
        txt += arr[i].info();
        newBookDisplayDiv.innerHTML = txt;
        newBookDisplayDiv.appendChild(deleteButton);
        newBookDisplayDiv.appendChild(toggleReadStatus);
        deleteButton.innerHTML = 'Delete Book';
        toggleReadStatus.innerHTML = 'Not Read';
        deleteButton.addEventListener('click', () => {
            arr.splice(i, 1);
            populateStorage(myLibrary);
            return displayBook(myLibrary);
        })
        toggleReadStatus.addEventListener('click', () => {
            if (toggleReadStatus.innerHTML == 'Not Read') {
                return toggleReadStatus.innerHTML = 'Read';
            }
            return toggleReadStatus.innerHTML = 'Not Read';
        })
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

function resetForm() {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
    document.querySelector('#bookPages').value = '';
    document.querySelector('#bookHaveFinished').value = '';
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
    resetForm();
})
