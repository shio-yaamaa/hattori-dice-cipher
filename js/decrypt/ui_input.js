/* global decrypt */

document.getElementById('submit_cipher').addEventListener('click', function () {
  console.log('submitted');
  
  // devide by ¥n and split into arrays of single characters
  decrypt(
    document.getElementById('cipher_input').value
      .replace(/¥s/g, '').replace(/¥n+/g, "¥n")
      .replace(/(^\n|\n$)/g, '')
      .split("¥n")/*.map(function (row) {
        return row.split('');
      })*/
  );
});