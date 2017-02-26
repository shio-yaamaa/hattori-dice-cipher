/* global TRUMP */
/* global count */

////////////////////////////////////////////////
// toward encryption
////////////////////////////////////////////////

function booleans2trumps(booleans) {
  return booleans.map(function (boolean) {
    return boolean ? TRUMP.A : TRUMP.N;
  });
}

////////////////////////////////////////////////
// toward decryption
////////////////////////////////////////////////

// "2KQ46J" -> [2, 'K', 'Q', 4, 6, 'J']
function string2trumps(string) {
  return string.split('').map(function (char) {
    return parseInt(char) > 0 ? parseInt(char) : char;
  });
}

// [2, 'K', 'Q', 4, 6, 'J'] -> [2, 1, 3, 1, 2, 4, 6, 1, 1]
function trumps2numbers(trumps) {
  var numbers = [];
  trumps.forEach(function (element, index) {
    switch (element) {
      case TRUMP.A:
        numbers.push(1);
        break;
      case TRUMP.J:
        numbers.push(1, 1);
        break;
      case TRUMP.Q:
        numbers.push(1, 2);
        break;
      case TRUMP.K:
        numbers.push(1, 3);
        break;
      default:
        numbers.push(parseInt(element, 10));
    }
  });
  return numbers;
}

// remove 9 or '9' from array
function removeNine(array) {
  var nineIndex = array.indexOf(9);
  if (nineIndex == -1) {
    nineIndex = array.indexOf('9');
  }
  array.splice(nineIndex, 1);
  return array;
}

// [2, 1, 3, 1, 2, 4, 6, 1, 1] -> [false, true, false, true, false, false, false, true, true]
function numbers2booleans(numbers) {
  return numbers.map(function (number) {
    return number == 1;
  });
}

function booleans2numeral(booleans) {
  var numeral = [];
  for (var i = 0; i < booleans.length; i += 9) {
    numeral.push(count(booleans.slice(i, i + 9), true));
  }
  return numeral;
}

// width and height
function calculateCipherSize(cipherLength) {
  var longer = Math.ceil(Math.sqrt(cipherLength));
  var shorter = Math.ceil(cipherLength / longer);
  return [longer, shorter];
}