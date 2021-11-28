import { localStorageWrapper } from "./localstorageWrapper.js";
import { BookFactory } from "./BookFactory.js";

let title = document.getElementById("title");
let author = document.getElementById("author");
let borrowCheckbox = document.getElementById("borrow");
let books = document.querySelector("#book-list");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".back-drop");

const library = BookFactory(localStorageWrapper);

const showModal = () => {
  modal.classList.remove("display-none");
  backDrop.classList.remove("display-none");
};
const hideModal = () => {
  modal.classList.add("display-none");
  backDrop.classList.add("display-none");
};

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
      item.checked ? "Already Borrowed: click to return" : "Borrow Book"
    }</button><button class='remove-book'>Remove</button>`;
    books.appendChild(book);
  });
};

if (localStorage.length > 0) {
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
  let id = new Date().getUTCMilliseconds();
  let newAuthor = author.value;
  let newTitle = title.value;
  let checkbox = borrowCheckbox.checked;
  library.addBook(id, newAuthor, newTitle, checkbox);
  hideModal();
  displayBooks(localStorage.books);
});

books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "remove-book";
  if (targetEle.className === selector) {
    let bookToRemove = targetEle.parentNode;
    library.removeBook(+bookToRemove.dataset.index);
    displayBooks(localStorage.books);
  }
});

books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "not-read";
  if (targetEle.className === selector) {
    let bookToBorrow = targetEle.parentNode;
    library.borrowBook(+bookToBorrow.dataset.index);
    displayBooks(localStorage.books);
    // targetEle.textContent = "Borrowed";
  }
});
books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "read-book";
  if (targetEle.className === selector) {
    let bookToReturn = targetEle.parentNode;
    library.returnBook(+bookToReturn.dataset.index);
    displayBooks(localStorage.books);
    // targetEle.textContent = "Borrowed";
  }
});
