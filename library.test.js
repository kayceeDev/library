const BookFactory = require("./BookFactory");
const mockLocalStorage = require("./mockLocalStorage");

describe("AddBook", function () {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });
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
    const testBookFactory = BookFactory();
    const bookBarams = {
      author: "kings",
      title: "purple",
    };
    const checkbox = {
      checked: true,
    };
    let expected = 1; //

    const KEY = "books",
      VALUE = {
        id: new Date().getUTCMilliseconds(),
        title: "kings",
        author: "purple",
        checked: true,
      };

    let bookStore = JSON.stringify([VALUE]);

    //Act
    let actual = testBookFactory.addBook(
      bookBarams.title,
      bookBarams.author,
      checkbox
    );

    //Assert
    expect(actual).toEqual(expected);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, bookStore);
    expect(localStorage.__STORE__[KEY]).toBe(bookStore);
  });
});

describe("Remove Book", function () {
  test("remove a book from a list", () => {
    const BookFactory = BookFactory();
    const bookList = [
      {
        id: 2,
        author: "kings",
        title: "purple",
        checked: true,
      },
    ];

    let expected = 0; //
    // const KEY = "books";
    // let bookStore = JSON.stringify(bookList);

    //Act
    let actual = BookFactory.removeBook(2);

    //Assert
    expect(actual).toEqual(expected);
  });
});
