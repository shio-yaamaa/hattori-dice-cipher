/* global TRUMP */
/* global EXPANDABLE_TRUMP */

/* global createFilledArray */
/* global flattenArray */

var validateErrors = {
  invalidChar: {
    id: 'invalid_char',
    message: 'Invalid character included',
    examine: function (cipher) {
      var validChar = /([1-6]|9|A|J|Q|K)/;
      return flattenArray(cipher).reduce(function (previous, current) {
        return previous || !current.match(validChar);
      }, false);
    }
  },
  invalidNineCount: {
    id: 'invalid_nine_count',
    message: 'Include one "9"',
    examine: function (cipher) {
      return flattenArray(cipher).reduce(function (previous, current) {
        return previous + (current == '9' ? 1 : 0);
      }, 0) != 1;
    }
  },
  cannotDevideByNine: {
    id: 'cannot_devide_by_nine',
    message: 'Invalid number of characters',
    examine: function (cipher) {
      return (flattenArray(cipher).reduce(function (previous, current) {
        return previous + current.match(EXPANDABLE_TRUMP) ? 1 : 0;
      }, flattenArray(cipher).length) - 1) / 9 != 0;
    }
  }
};

function decrypt(cipher) {
  console.log(cipher);
  
  // validate
  var isError = false;
  for (var error in validateErrors) {
    var isError = validateErrors[error].examine(cipher);
    document.getElementById(validateErrors[error]['id']).style.display
      = isError ? 'block' : 'none';
    if (isError) {
      return;
    }
  }
  
  var nineRowIndex = cipher.reduce(function (previous, current, index) {
    return current.indexOf('9') == -1 ? previous : index;
  }, null);
  var centerIndex = createFilledArray(cipher.length, cipher[nineRowIndex].indexOf('9'));
  
  // expand
  var expandedCipher;
  cipher.forEach(function (row, rowIndex) {
    expandedCipher.push([]);
    row.forEach(function (trump, trumpIndex) {
      expandedCipher[rowIndex].push(...TRUMP[trump]);
      if (trump.match(EXPANDABLE_TRUMP) && trumpIndex < centerIndex) {
        if (rowIndex == nineRowIndex) {
          centerIndex.forEach(function (element) {}); // できるのか？
        } else {
          centerIndex[rowIndex]++; // できるのか？
        }
      }
    });
  });

}