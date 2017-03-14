/* global TRUMP */

/* global count */
/* global getRandomInt */
/* global pickRandomElements */
/* global booleans2trumps */
/* global calculateCipherSize */

/* global AA_J_cont */
/* global AN_R_cont */
/* global JN_AR_repl */
/* global A_J_inv */

/* global substantiateR */
/* global substantiateN */

var errors = {
  not_square: false,
  nine_not_center: false,
  JQK_deficient: false
};

function initErrors() {
  for (var error in errors) {
    errors[error] = false;
  }
}

function encrypt(booleans) {
  initErrors();
  
  var trumps = booleans2trumps(booleans);
  
  // count how many times contraction can be executed
  var AA_J_max = AA_J_cont.getExecutablePositions(trumps).length;
  var AN_R_max = AN_R_cont.getExecutablePositions(trumps).length;
  var AA_J_quota, AN_R_quota;
  var contSum = undefined;
  
  // decide how many times to execute contraction
  var squares = [];
  for (var i = 1; i <= Math.floor(Math.sqrt(trumps.length + 1)); i++) {
    squares.push(Math.pow(i, 2));
  }
  var candidateRoot = undefined;
  squares.forEach(function (element, index) {
    if (trumps.length - (AA_J_max + AN_R_max) + 1 <= element
      && (contSum == undefined || (index % 2 == 0 && candidateRoot % 2 == 0))) {
      candidateRoot = index + 1;
      contSum = trumps.length + 1 - element;
    }
  });
  if (contSum == undefined) {
    errors['not_square'] = true;
    contSum = AA_J_max + AN_R_max;
  }
  
  // distribute quota of contraction
  if (AA_J_cont.min + AN_R_cont.min > contSum) {
    // if contSum is not enough to cover the minimum contraction count
    AA_J_quota = Math.round(contSum * AA_J_cont.min / (AA_J_cont.min + AN_R_cont.min));
    AN_R_quota = contSum - AA_J_quota;
  } else {
    // ratio
    var AA_J_range = [Math.ceil(contSum / 5), Math.floor(contSum / 3)];
    AA_J_quota = getRandomInt(AA_J_range[0], AA_J_range[1] + 1);
    AN_R_quota = contSum - AA_J_quota;
    
    // min
    var toAA_J = Math.max(AA_J_cont.min - AA_J_quota, 0);
    AA_J_quota += toAA_J; AN_R_quota -= toAA_J;
    var toAN_R = Math.max(AN_R_cont.min - AN_R_quota, 0);
    AA_J_quota -= toAN_R; AN_R_quota += toAN_R;
    
    // max
    toAN_R = Math.max(AA_J_quota - AA_J_max, 0);
    AA_J_quota -= toAN_R; AN_R_quota += toAN_R;
    toAA_J = Math.max(AN_R_quota - AN_R_max, 0);
    AA_J_quota += toAA_J; AN_R_quota -= toAA_J;
  }
  
  // execute contractions
  var AA_J_contractiblePositions = AA_J_cont.getExecutablePositions(trumps);
  trumps = AA_J_cont.execute(trumps, pickRandomElements(AA_J_contractiblePositions, AA_J_quota));
  var AN_R_contractiblePositions = AN_R_cont.getExecutablePositions(trumps);
  trumps = AN_R_cont.execute(trumps, pickRandomElements(AN_R_contractiblePositions, AN_R_quota));
  
  // execute replacements
  trumps = JN_AR_repl.execute(trumps);
  
  // execute inversions
  trumps = A_J_inv.execute(trumps, 0.5);
  
  // substantiate R and N
  trumps = substantiateR(trumps);
  trumps = substantiateN(trumps);
  
  errors['JQK_deficient'] = trumps.indexOf(TRUMP.J) == -1 || trumps.indexOf(TRUMP.Q) == -1 || trumps.indexOf(TRUMP.K) == -1;
  
  var size = calculateCipherSize(trumps.length + 1);
  
  // insert 9
  var ninePos = [Math.floor((size[0] - 1) / 2), Math.floor((size[1] - 1) / 2)];
  trumps.splice(size[0] * ninePos[1] + ninePos[0], 0, 9);
  if (size[0] % 2 == 0 || size[1] % 2 == 0) {
    errors['nine_not_center'] = true;
  }
  
  // to two-dimensional
  var twoDTrumps = [];
  trumps.forEach(function (element, index) {
    if (index % size[0] == 0) {
      twoDTrumps.push([]);
    }
    twoDTrumps[twoDTrumps.length - 1].push(element);
  });
  
  return twoDTrumps;
}