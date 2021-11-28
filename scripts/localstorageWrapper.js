export const localStorageWrapper = (function () {
  return {
    getItem: function (key) {
      return localStorage.getItem(key);
    },
    setItem: function (key, value) {
      localStorage.setItem(key, value);
    },
    removeItem: function (key) {
      localStorage.removeItem(key);
    },
    clear: function () {
      localStorage.clear();
    },
  };
})();

//   module.exports = localStorageWrapper
