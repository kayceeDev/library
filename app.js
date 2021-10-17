let title = document.getElementById("title");
let author = document.getElementById("author");
let borrowCheckbox = document.getElementById("borrow");
let books = document.querySelector("#book-list");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".back-drop");

function BookStore() {
  this.bookList = [];
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
  if ((newAuthor && newTitle) && !checkBookList(this.bookList, title)) {
      if(borrowCheckbox.checked){
          this.bookList.push({
            id: new Date().getUTCMilliseconds(),
            title: newTitle,
            author: newAuthor,
            checked: true,
          })
        } else{
          this.bookList.push({
              id: new Date().getUTCMilliseconds(),
              title: newTitle,
              author: newAuthor,
              checked: false,
            });
      }
  }
  author.value = '';
  title.value = '';
  borrowCheckbox.checked = false 
  displayBooks(this.bookList);
};

let library = new BookStore();

console.log();

const displayBooks = (arr) => {
  // clear everything inside <ul> with class=todo-items
  books.innerHTML = "";
  // run through each item inside todos
  arr.map((item) => {
    const book = document.createElement("div");
    book.className = 'book'
    book.innerHTML = `<p class='title'>Title: ${
      item.title
    }</p><p class='author'>Author: ${item.author}</p><button class=${
      item.checked ? "read-book" : "not-read"
    }>${
      item.checked ? "Read" : "Not Read"
    }</button><button class='remove-book'>Remove</button>`;
    books.appendChild(book)
  });
};

addBookBtn.addEventListener("click", () => {
  showModal();
});

backDrop.addEventListener("click", () => {
  hideModal();
});

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  library.addBook();
  hideModal()
});
