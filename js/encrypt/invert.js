/* global TRUMP */

/* global getRandomBoolean */

var A_J_inv = {
  execute: function (trumps, probability) {
    trumps.forEach(function (element, index) {
      if (getRandomBoolean(probability) && element == TRUMP.J && trumps[index + 1] == TRUMP.A) {
        trumps.splice(index, 2, TRUMP.A, TRUMP.J);
      }
    });
    return trumps;
  }
};