let title = document.getElementById("title");
let author = document.getElementById("author");
let borrowCheckbox = document.getElementById("borrow");
let books = document.querySelector("#book-list");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".back-drop");

function BookStore() {
  this.bookList = [];

  if (!localStorage.getItem("books") && this.bookList.length > 0) {
    localStorage.setItem("books", JSON.stringify(this.bookList));
  }
  if(localStorage.length >0){

      this.bookList = JSON.parse(localStorage.books);
  }
}

const checkBookList = (arr, name) => {
  if (arr.some((el) => el.title === name)) {
    return true;
  }
};

const showModal = () => {
  modal.classList.remove("display-none");
  backDrop.classList.remove("display-none");
};
const hideModal = () => {
  modal.classList.add("display-none");
  backDrop.classList.add("display-none");
};

BookStore.prototype.addBook = function () {
  const newAuthor = author.value;
  const newTitle = title.value;
  if (newAuthor && newTitle && !checkBookList(this.bookList, title)) {
    let newBook;
    if (borrowCheckbox.checked) {
      newBook = {
        id: new Date().getUTCMilliseconds(),
        title: newTitle,
        author: newAuthor,
        checked: true,
      };
    } else {
      newBook = {
        id: new Date().getUTCMilliseconds(),
        title: newTitle,
        author: newAuthor,
        checked: false,
      };
    }
    this.bookList.push(newBook);
    localStorage.setItem("books", JSON.stringify(this.bookList));
    displayBooks(localStorage.books);
  }
  author.value = "";
  title.value = "";
  borrowCheckbox.checked = false;
};

BookStore.prototype.removeBook = function (id) {
  const updatedBooks = this.bookList.filter((item) => item.id !== id);
  console.log(updatedBooks);
  this.bookList = updatedBooks;
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  displayBooks(localStorage.books);
};

BookStore.prototype.borrowBook = function (id) {
  const updatedBooks = this.bookList.map((item) => {
    let temp = Object.assign({}, item);
    if (temp.id === id) {
      temp.checked = true;
    }
    return temp;
  });
  this.bookList = updatedBooks;
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  displayBooks(localStorage.books);
};
BookStore.prototype.returnBook = function (id) {
  const updatedBooks = this.bookList.map((item) => {
    let temp = Object.assign({}, item);
    if (temp.id === id) {
      temp.checked = false;
    }
    return temp;
  });

  this.bookList = updatedBooks;
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  displayBooks(localStorage.books);
};

let library = new BookStore();

const displayBooks = (arr) => {
  arr = JSON.parse(arr);
  // clear everything inside <ul> with class=todo-items
  books.innerHTML = "";
  // run through each item inside todos
  arr.map((item) => {
    const book = document.createElement("div");
    book.className = "book";
    book.setAttribute("data-index", item.id);
    book.innerHTML = `<p class='title'>Title: ${
      item.title
    }</p><p class='author'>Author: ${item.author}</p><button class=${
      item.checked ? "read-book" : "not-read"
    }>${
      item.checked ? "Borrowed" : "Borrow Book"
    }</button><button class='remove-book'>Remove</button>`;
    books.appendChild(book);
  });
};

if(localStorage.length >0){

    displayBooks(localStorage.books);
}


addBookBtn.addEventListener("click", () => {
  showModal();
});

backDrop.addEventListener("click", () => {
  hideModal();
});

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  library.addBook();
  hideModal();
});

books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "remove-book";
  if (targetEle.className === selector) {
    let bookToRemove = targetEle.parentNode;
    library.removeBook(+bookToRemove.dataset.index);
  }
});

books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "not-read";
  if (targetEle.className === selector) {
    console.log("jjjj");
    let bookToBorrow = targetEle.parentNode;
    library.borrowBook(+bookToBorrow.dataset.index);
    // targetEle.textContent = "Borrowed";
  }
});
books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "read-book";
  if (targetEle.className === selector) {
    let bookToReturn= targetEle.parentNode;
    library.returnBook(+bookToReturn.dataset.index);
    // targetEle.textContent = "Borrowed";
  }
});
