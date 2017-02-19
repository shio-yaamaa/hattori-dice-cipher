/* global TRUMP */

/* global getRandomBoolean */

var JN_AR_repl = {
  execute: function (trumps, max, probability) {
    var remain = max; // 変数名何とかならん？
    trumps.forEach(function (element, index) {
      if (remain > 0 && getRandomBoolean(probability) && element == TRUMP.J && trumps[index + 1] == TRUMP.N) {
        trumps.splice(index, 2, TRUMP.A, TRUMP.R);
        remain--;
      }
    });
    return trumps;
  }
};