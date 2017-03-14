/* global TRUMP */

var AA_J_cont = {
  getExecutablePositions: function (trumps) {
    var positions = [];
    var A_sequence = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A) {
        A_sequence++;
        if (trumps[index + 1] == TRUMP.A && A_sequence % 2 == 1) {
          positions.push(index);
        }
      } else {
        A_sequence = 0;
      }
    });
    return positions;
  },
  execute: function (trumps, positions) {
    var result = [];
    trumps.forEach(function (element, index) {
      if (positions.indexOf(index) != -1) {
        result.push(TRUMP.J);
      } else if (positions.indexOf(index - 1) == -1) {
        // if previous one is not contracted
        result.push(element);
      }
    });
    return result;
  },
  min: 1
};

var AN_R_cont = {
  getExecutablePositions: function (trumps) {
    var positions = [];
    var A_sequence = 0;
    trumps.forEach(function (element, index) {
      if (element == TRUMP.A) {
        A_sequence++;
        if (trumps[index + 1] == TRUMP.N && A_sequence % 2 == 1) {
          positions.push(index);
        }
      } else {
        A_sequence = 0;
      }
    });
    return positions;
  },
  execute: function (trumps, positions) {
    var result = [];
    trumps.forEach(function (element, index) {
      if (positions.indexOf(index) != -1) {
        result.push(TRUMP.R);
      } else if (positions.indexOf(index - 1) == -1) {
        // if previous one is not contracted
        result.push(element);
      }
    });
    return result;
  },
  min: 2
};