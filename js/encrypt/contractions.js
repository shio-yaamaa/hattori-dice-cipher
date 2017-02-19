/* global TRUMP */

var AA_J_cont = {
  count: function (trumps) {
    var count = 0;
    var A_sequence = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A) {
        A_sequence++;
        if (trumps[index + 1] == TRUMP.A && A_sequence % 2 == 1) {
          count++;
        }
      } else {
        A_sequence = 0;
      }
    });
    return count;
  },
  execute: function (trumps, posArray) {
    var currentPos = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A && trumps[index + 1] == TRUMP.A) {
        if (posArray.indexOf(currentPos) != -1) {
          trumps.splice(index, 2, TRUMP.J);
        }
        currentPos++;
      }
    });
    return trumps;
  },
  min: 1
};

var AN_R_cont = {
  count: function (trumps) {
    var count = 0;
    var A_sequence = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A) {
        A_sequence++;
        if (trumps[index + 1] == TRUMP.N && A_sequence % 2 == 1) {
          count++;
        }
      } else {
        A_sequence = 0;
      }
    });
    return count;
  },
  execute: function (trumps, posArray) {
    var currentPos = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A && trumps[index + 1] == TRUMP.N) {
        if (posArray.indexOf(currentPos) != -1) {
          trumps.splice(index, 2, TRUMP.R);
        }
        currentPos++;
      }
    });
    return trumps;
  },
  min: 2
};