/* global TRUMP2NUMERAL */
/* global EXPANDABLE_TRUMP */

/* global flattenArray */

/* global trumps2numbers */
/* global removeNine */
/* global numbers2booleans */
/* global booleans2numeral */

/* global showResult */
/* global hideResult */

/* global explainByCanvas */
/* global explainByText */

var validateErrors = {
  invalidChar: {
    id: 'invalid_char',
    message: 'Invalid character included',
    examine: function (cipher) {
      var validChar = /([1-6]|9|A|J|Q|K)/;
      return flattenArray(cipher).reduce(function (previousValue, currentValue) {
        return previousValue || !currentValue.match(validChar);
      }, false);
    }
  },
  invalidNineCount: {
    id: 'invalid_nine_count',
    message: 'Include one "9"',
    examine: function (cipher) {
      return flattenArray(cipher).reduce(function (previousValue, currentValue) {
        return previousValue + (currentValue == '9' ? 1 : 0);
      }, 0) != 1;
    }
  },
  cannotDevideByNine: {
    id: 'cannot_devide_by_nine',
    message: 'Invalid number of characters',
    examine: function (cipher) {
      return (flattenArray(cipher).reduce(function (previousValue, currentValue) {
        return previousValue + (currentValue.match(EXPANDABLE_TRUMP) ? 1 : 0);
      }, flattenArray(cipher).length) - 1) % 9 != 0;
    }
  }
};

function decrypt(cipher) {
  // validate
  var errorExist = false;
  for (var error in validateErrors) {
    var isError = validateErrors[error].examine(cipher);
    document.getElementById(validateErrors[error]['id']).style.display
      = isError ? 'inline-block' : 'none';
    errorExist = errorExist || isError;
  }
  document.getElementById('error').style.display = errorExist ? 'inline-block' : 'none';
  if (errorExist) {
    hideResult();
    return;
  }
  
  var booleans = numbers2booleans(removeNine(trumps2numbers(flattenArray(cipher))));
  showResult(booleans, booleans2numeral(booleans));
  
  explainByCanvas(cipher);
  explainByText(booleans.length);
}