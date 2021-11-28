// const { expect } = require("@jest/globals");
const exportFunctions = require("./BookFactory");
const localStore = require("./localstorageWrapper");

describe("AddBook", function () {
  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
    // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
    localStorage.setItem.mockClear();
  });

  test("Add a book to list", () => {
    //Arrange
    let checkbox = { checked: true };
    const newBook = {
      id: 3,
      author: "kings",
      title: "purple",
      checkbox,
    };

    let _book = {
      id: newBook.id,
      title: newBook.title,
      author: newBook.author,
      checked: newBook.checkbox.checked,
    };

    let expected = 1; //

    const KEY = "books";

    let books = [
      {
        id: new Date().getUTCMilliseconds(),
        title: "kings 1",
        author: "purple",
        checked: true,
      },
      {
        id: new Date().getUTCMilliseconds(),
        title: "kings 2",
        author: "purple",
        checked: true,
      },
    ];

    let _localStorage = localStore;
    jest
      .spyOn(_localStorage, "getItem")
      .mockImplementation((KEY) => JSON.stringify(books));

    let finalBooks = [...JSON.parse(_localStorage.getItem(KEY)), _book];
    const _finalBooks = JSON.stringify(finalBooks);

    jest
      .spyOn(_localStorage, "setItem")
      .mockImplementation((KEY, _finalBooks) => {});

    //Act
    var bookFactory = exportFunctions.BookFactory(_localStorage);
    let actual = bookFactory.addBook(
      newBook.id,
      newBook.author,
      newBook.title,
      newBook.checkbox
    );

    //Assert
    expect(actual).toBe(newBook.id);
    expect({}).toMatchObject({});
    expect(_localStorage.getItem).toHaveBeenCalledWith(KEY);
    expect(_localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(_localStorage.setItem).toHaveBeenCalledWith(KEY, _finalBooks);
    //expect(_localStorage.getItem).toBe(bookStore);
  });
});

describe("Remove Book", function () {
  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
    // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
    localStorage.setItem.mockClear();
  });
  test("remove a book from a list", () => {
    //Arrange
        const KEY = "books";

    let books = [
      {
        id: 2,
        title: "kings 1",
        author: "purple",
        checked: true,
      },
      {
        id: new Date().getUTCMilliseconds(),
        title: "kings 2",
        author: "purple",
        checked: true,
      },
    ];

    let _localStorage = localStore;
    let expected = 1
    jest
      .spyOn(_localStorage, "getItem")
      .mockImplementation((KEY) => JSON.stringify(books));

    books.shift();
    const _finalBooks = JSON.stringify(books);

    jest
      .spyOn(_localStorage, "setItem")
      .mockImplementation((KEY, _finalBooks) => books);

    //Act
    const bookFactory = exportFunctions.BookFactory(_localStorage);

    let actual = bookFactory.removeBook(2);

    //Assert
    expect(actual).toEqual(expected);
    expect(_localStorage.getItem).toHaveBeenCalledWith(KEY);
    expect(_localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(_localStorage.setItem).toHaveBeenCalledWith(KEY, _finalBooks);
    // expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, bookStore)
  });
});

// describe("borrow book", function () {
//   beforeEach(() => {
//     // to fully reset the state between tests, clear the storage
//     localStorage.clear();
//     // and reset all mocks
//     jest.clearAllMocks();
//     // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
//     localStorage.setItem.mockClear();
//   });
//   test("borrow a book from a list when given an id", () => {
//     const bookParams = {
//       author: "kings",
//       title: "purple",
//     };

//     let checkbox = { checked: false };

//     let addbookId = testBookFactory.addBook(
//       bookParams.title,
//       bookParams.author,
//       bookParams.checkbox
//     );

//     let expected = true; //

//     //Act
//     let actual = testBookFactory.borrowBook(addbookId);

//     //Assert
//     expect(actual).toEqual(expected);
//     // expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, bookStore)
//   });
// });
// describe("return book", function () {
//   beforeEach(() => {
//     // to fully reset the state between tests, clear the storage
//     localStorage.clear();
//     // and reset all mocks
//     jest.clearAllMocks();
//     // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
//     localStorage.setItem.mockClear();
//   });

//   test("return a book to a list when given an id", () => {
//     const bookParams = {
//       author: "kings",
//       title: "purple",
//     };

//     let checkbox = { checked: true };

//     let expected = false; //

//     let addbookId = testBookFactory.addBook(
//       bookParams.title,
//       bookParams.author,
//       checkbox
//     );

//     //Act
//     let actual = testBookFactory.returnBook(addbookId);

//     //Assert
//     expect(actual).toBe(expected);
//     // expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, bookStore)
//   });
// });
