/* global TRUMP */

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
// remove '9'
function string2trumps(string) {
  return string.replace('9', '').split('').map(function (char) {
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
        numbers.push(element);
    }
  });
  return numbers;
}

// [2, 1, 3, 1, 2, 4, 6, 1, 1] -> [false, true, false, true, false, false, false, true, true]
function numbers2booleans(numbers) {
  return numbers.map(function (number) {
    return number == 1;
  });
}