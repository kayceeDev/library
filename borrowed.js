
let books = document.querySelector("#book-list");


const displayBooks = (arr) => {
    arr = JSON.parse(arr);
    // clear everything inside <ul> with class=todo-items
    books.innerHTML = "";
    // run through each item inside todos
    arr.map((item) => {
        if(item.checked){

            const book = document.createElement("div");
            book.className = "book";
            book.setAttribute("data-index", item.id);
            book.innerHTML = `<p class='title'>Title: ${
              item.title
            }</p><p class='author'>Author: ${item.author}</p><button class="read-book"
            }>Borrowed</button><button class='remove-book'>Return Book</button>`;
            books.appendChild(book);
        }
    });
  };

  console.log(books)

  if(localStorage.length > 0){

      displayBooks(localStorage.books)
  }
