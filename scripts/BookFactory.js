export const BookFactory = (localStorageWrapper) => {
  let bookList = [];
  // console.log("BooklistInitial:",bookList)
  if (localStorageWrapper.getItem("books"))
    bookList = JSON.parse(localStorageWrapper.getItem("books"));

  // console.log("bookListAfter:",bookList)

  const checkBookList = (arr, name) => {
    return arr.some((el) => el.title === name);
  };

  const addBook = (id, author, title, checkbox) => {
    const newAuthor = author;
    const newTitle = title;
    if (newAuthor && newTitle && !checkBookList(bookList, title)) {
      let newBook;
      if (checkbox.checked === true) {
        newBook = {
          id: id,
          title: newTitle,
          author: newAuthor,
          checked: true,
        };
      } else {
        newBook = {
          id,
          title: newTitle,
          author: newAuthor,
          checked: false,
        };
      }
      bookList.push(newBook);
      localStorageWrapper.setItem("books", JSON.stringify(bookList));
      return newBook.id;
    }
  };

  const borrowBook = (id) => {
    const updatedBooks = bookList.map((item) => {
      let temp = Object.assign({}, item);
      if (temp.id === id) {
        temp.checked = true;
      }
      return temp;
    });
    bookList = updatedBooks;
    localStorageWrapper.setItem("books", JSON.stringify(bookList));
    return bookList[0].checked;
  };

  const returnBook = (id) => {
    const updatedBooks = bookList.map((item) => {
      let temp = Object.assign({}, item);
      if (temp.id === id) {
        temp.checked = false;
      }
      return temp;
    });
    bookList = updatedBooks;
    localStorageWrapper.setItem("books", JSON.stringify(bookList));
    return bookList[0].checked;
  };

  const removeBook = (id) => {
    const updatedBooks = bookList.filter((item) => item.id !== id);
    bookList = updatedBooks;
    localStorageWrapper.setItem("books", JSON.stringify(bookList));
    return bookList.length;
  };

  return {
    addBook,
    removeBook,
    borrowBook,
    returnBook,
  };
};

// //module.exports = BookFactory;
// const exportFunctions = {
//   BookFactory,
//   localStorageWrapper,
// };
// module.exports = exportFunctions;
