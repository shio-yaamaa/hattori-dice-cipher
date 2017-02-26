/* global decrypt */

document.getElementById('submit_cipher').addEventListener('click', function () {
  // devide by \n and split into arrays of single characters
  decrypt(
    document.getElementById('cipher_input').value
      .replace(/\n+/g, "\n")
      .replace(/(^\n|\n$)/g, '')
      .toUpperCase()
      .split(/\n/)
      .map(function (row) {
        return row.replace(/\s/g, '').split('');
      })
  );
});