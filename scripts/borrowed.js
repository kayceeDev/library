import { localStorageWrapper } from "./localstorageWrapper.js";
import { BookFactory } from "./BookFactory.js";

const library = BookFactory(localStorageWrapper);
let books = document.querySelector("#book-list");

const isBorrowed = (arr) => {
  return arr.every((e) => e.checked === false);
};

const displayBooks = (arr) => {
  arr = JSON.parse(arr);
  // clear everything inside <ul> with class=todo-items
  books.innerHTML = "";
  // run through each item inside todos
  if (isBorrowed(arr)) {
    books.innerHTML = "<p>All books have been returned</p>";
  } else {
    arr.map((item) => {
      if (item.checked) {
        const book = document.createElement("div");
        book.className = "book";
        book.setAttribute("data-index", item.id);
        book.innerHTML = `<p class='title'>Title: ${item.title}</p><p class='author'>Author: ${item.author}</p><button class="read-book"
              }>Borrowed</button><button class='remove-book'> Return Book</button>`;
        books.appendChild(book);
      }
    });
  }
};

if (localStorage.length > 0) {
  displayBooks(localStorage.books);
}

books.addEventListener("click", (e) => {
  const targetEle = e.target;
  let selector = "remove-book";
  if (targetEle.className === selector) {
    let bookToReturn = targetEle.parentNode;
    library.returnBook(+bookToReturn.dataset.index);
    targetEle.textContent = "Book Returned";
  }
  setTimeout(() => {
    displayBooks(localStorage.books);
  }, 2000);
});
