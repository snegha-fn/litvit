console.log('This is ES6 version of Project 2');

class Book {
    constructor(name, author,regno, type) {
        this.name = name;
        this.author = author;
        this.regno=regno;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.regno}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        return book.name.length >= 2 && book.author.length >= 2;
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText = type === 'success' ? 'Success' : 'Error!';
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 5000);
    }

    static searchBooks() {
        let input = document.getElementById('searchTxt').value.toLowerCase();
        let rows = document.querySelectorAll('#tableBody tr');

        rows.forEach(row => {
            let bookName = row.cells[0].textContent.toLowerCase();
            let author = row.cells[1].textContent.toLowerCase();
            let regno = row.cells[2].textContent.toLowerCase();
            let type = row.cells[3].textContent.toLowerCase();

            if (bookName.includes(input) || author.includes(input) || regno.includes(input)||type.includes(input)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

document.getElementById('searchTxt').addEventListener('input', Display.searchBooks);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let regno = document.getElementById('regno').value;
    let type;
    let Business = document.getElementById('Business');
    let programming = document.getElementById('programming');
    let fashion = document.getElementById('fashion');
    let science=document.getElementById('science');
    let law=document.getElementById('law');

    if (Business.checked) {
        type = Business.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (fashion.checked) {
        type = fashion.value;
    }
    else if (science.checked) {
        type = science.value;
    }
    else if (law.checked) {
        type = law.value;
    }

    let book = new Book(name, author, regno,type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');
    } else {
        display.show('danger', 'Sorry, Please add a book');
    }

    e.preventDefault();
}
