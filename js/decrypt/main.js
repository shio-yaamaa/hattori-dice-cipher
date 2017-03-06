/* global smoothScroll */

/* global LINE_BREAK_IN_URL_PARAM */

/* global decrypt */

smoothScroll.init();

// decrypt the cipher specified as an URL parameter
window.location.search.substring(1).split('&').forEach(function (param) {
  if (param.split('=')[0] == 'cipher') {
    var cipherRows = param.split('=')[1].split(LINE_BREAK_IN_URL_PARAM);
    
    // set the cipher as the value of input field
    document.getElementById('cipher_input').value = cipherRows.join("\n");
    
    // decrypt the cipher
    decrypt(cipherRows.map(function (row) {
      return row.split('');
    }));
  }
});