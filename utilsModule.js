const fs = require("fs");

const bookUtilModule = (() => {
  const checkBookList = (arr, name) => {
    if (arr.some((el) => el.title === name)) {
      return true;
    }
  };

  function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  return {
    checkBookList,
    writeDataToFile,
  };
})();

console.log(bookUtilModule);

module.exports = bookUtilModule;
