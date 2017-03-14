/* global TRUMP */

/* global multipleIndexOf */
/* global getRandomInt */
/* global pickRandomElements */
/* global distributeAtRandom */

function substantiateR(trumps) {
  var RPositions = multipleIndexOf(trumps, TRUMP.R);
  var QKPositions = pickRandomElements(RPositions, RPositions.length);
  for (var i = 0; i < QKPositions.length; i++) {
    trumps[QKPositions[i]] = i % 2 == 0 ? TRUMP.Q : TRUMP.K;
  }
  return trumps;
}

function substantiateN(trumps) {
  var NPositions = multipleIndexOf(trumps, TRUMP.N);
  
  if (NPositions.length < (6 - 2 + 1) * 2) {
    // Nが少なすぎて2個ずつ未満しか配分できない
    // 6から順に配分
    for (var i = 6; i >= 2; i--) {
      NPositions = multipleIndexOf(trumps, TRUMP.N);
      
      // iの個数を決定
      var iPositionCount = NPositions.length > i - 2 + 1 ? 2 : 1;
      
      // ランダムに選ばれた場所のtrumpをiに変える
      pickRandomElements(NPositions, iPositionCount).forEach(function (element) {
        trumps[element] = String(i);
      });
      
      // Nが枯渇したらbreak
      if (NPositions.length - iPositionCount <= 0) {
        break;
      }
    }
  } else {
    var distributed = distributeAtRandom(NPositions.length, 6 - 2 + 1, 2, NPositions.length / (6 - 2 + 1) * 0.146);
    
    for (var i = 2; i <= 6; i++) {
      NPositions = multipleIndexOf(trumps, TRUMP.N);
      
      // iの個数
      var iPositionCount = distributed[i - 2];
      
      // ランダムに選ばれた場所のtrumpをiに変える
      pickRandomElements(NPositions, iPositionCount).forEach(function (element) {
        trumps[element] = String(i);
      });
    }
  }
  return trumps;
}