/* global TRUMP */

/* global multipleIndexOf */
/* global getRandomInt */
/* global pickRandomElements */

function substantiateR(trumps) {
  var RPositions = multipleIndexOf(trumps, TRUMP.R);
  var QKPositions = pickRandomElements(RPositions, 2);
  for (var i = 0; i < trumps.length; i++) {
    if (trumps[i] == TRUMP.R) {
      if (QKPositions.indexOf(i) != -1) {
        trumps[i] = QKPositions.indexOf(i) == 0 ? TRUMP.Q : TRUMP.K;
      } else {
        trumps[i] = getRandomInt(0, 2) == 0 ? TRUMP.Q : TRUMP.K;
      }
    }
  }
  return trumps;
}

function substantiateN(trumps) {
  var NPositions = multipleIndexOf(trumps, TRUMP.N);
  var six2twoPositions = pickRandomElements(NPositions, NPositions.length);
  for (var i = 0; i < trumps.length; i++) {
    if (trumps[i] == TRUMP.N) {
      trumps[i] = six2twoPositions.indexOf(i) % (6 - 2 + 1) * -1 + 6
      /*
      if (six2twoPositions.indexOf(i) != -1) {
        trumps[i] = six2twoPositions.indexOf(i) * -1 + 6;
      } else {
        trumps[i] = getRandomInt(0, 6) + 1;
      }*/
    }
  }
  return trumps;
}