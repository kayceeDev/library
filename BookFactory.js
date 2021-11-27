const BookFactory = () => {
  let bookList = [];

  if (localStorage.getItem("books"))
    bookList = JSON.parse(localStorage.getItem("books"));
  console.log("Booklist len:", bookList.length);
  console.log("books in local storage", localStorage.getItem("books"));

  const checkBookList = (arr, name) => {
    return arr.some((el) => el.title === name);
  };

  const addBook = (author, title, checkbox) => {
    const newAuthor = author;
    const newTitle = title;
    if (newAuthor && newTitle && !checkBookList(bookList, title)) {
      let newBook;
      if (checkbox.checked) {
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
      bookList.push(newBook);
      localStorage.setItem("books", JSON.stringify(bookList));
      console.log("books in local storage 2", localStorage.getItem("books"));
      return bookList.length;
    }
  };

  const removeBook = (id) => {
    const updatedBooks = bookList.filter((item) => item.id !== id);
    bookList = updatedBooks;
    localStorage.setItem("books", JSON.stringify(bookList));
    displayBooks(localStorage.books);
    return bookList.length;
  };

  return {
    addBook,
    removeBook,
  };
};

console.log(BookFactory().addBook());

module.exports = BookFactory;
