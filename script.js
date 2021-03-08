let newBookButton = document.querySelector('#newBook');
let displayContainer = document.querySelector('#display-container');
let form = document.querySelector('#form');
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
   return `${this.title} by ${this.author} ${this.numOfPages} pages`;
}

//adds the book object into the myLibrary array
function addBookToLibrary(book) {
    let bookToBeAdded = book;
    return myLibrary.push(bookToBeAdded);
}

//sets initial read status
function toggleReadStatusText (prop, textbox) {
    if (prop == false) {
        textbox.innerHTML = 'Not Read';
    } else {
        textbox.innerHTML = 'Read';
    }
}

//displays all the book object in myLibrary 
function displayBook(arr) {
    //this reset the display container so there won't be multiple displays of the same book when myLibrary is updated
    while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
    }
    //for each book object in the myLibrary array..
    for (let i = 0; i < arr.length; i++) {
        //create new elements in a display
        let newBookDisplayDiv = document.createElement('div');
        let textArea = document.createElement('div');
        let deleteButton = document.createElement('button');
        let toggleReadStatus = document.createElement('button');
        //add class for each new element
        newBookDisplayDiv.classList.add('bookDisplay');
        textArea.classList.add('displayText');
        deleteButton.classList.add('deleteBook');
        toggleReadStatus.classList.add('readStatus');
        //append elements to their parents
        displayContainer.appendChild(newBookDisplayDiv);
        newBookDisplayDiv.appendChild(textArea);
        textArea.innerHTML += arr[i].info();
        newBookDisplayDiv.appendChild(deleteButton);
        newBookDisplayDiv.appendChild(toggleReadStatus);
        deleteButton.innerHTML = 'Delete Book';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this book?')) {
            arr.splice(i, 1);
            populateStorage(myLibrary);
            return displayBook(myLibrary);
            }
        })    
        toggleReadStatusText(arr[i].readStatus, toggleReadStatus);
        toggleReadStatus.addEventListener('click', () => {
            if (toggleReadStatus.innerHTML == 'Not Read') {
                arr[i].readStatus = true;
                populateStorage(myLibrary);
                return toggleReadStatus.innerHTML = 'Read';
            } else {
                arr[i].readStatus = false;
                populateStorage(myLibrary);
                return toggleReadStatus.innerHTML = 'Not Read';
            }
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
        } return displayBook(myLibrary);
    }
}

//this resets the form
function resetForm() {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
    document.querySelector('#bookPages').value = '';
    document.querySelector('#bookHaveFinished').value = '';
}

//where input is processed after user clicks submit
form.addEventListener('submit', (event) => {
    //stop the default process of submitting the form, replacing the action with our own functions, without this the display would only flash briefly before it's gone
    event.preventDefault();
    let bookTitle = document.querySelector('#bookTitle').value;
    let bookAuthor = document.querySelector('#bookAuthor').value;
    let bookPages = document.querySelector('#bookPages').value;
    //check if the checkbox is ticked and turn it into a string
    let checkCheckbox = () => {
        let checkbox = document.querySelector('#bookHaveFinished');
            if (checkbox.checked == true) {
                return true;
            }
            return false;
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

//calls the function that will return saved MyLibrary array if there's one
checkLocalStorage();