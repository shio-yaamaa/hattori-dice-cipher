/* global TRUMP */

/* global count */
/* global getRandomInt */
/* global pickRandomInts */
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
  console.log(booleans);
  
  initErrors();
  
  var trumps = booleans2trumps(booleans);
  
  // count how many times contraction can be executed
  var AA_J_max = AA_J_cont.count(trumps);
  var AN_R_max = AN_R_cont.count(trumps);
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
      console.log(index + 1 + "をcandidateRootにします");
      contSum = trumps.length + 1 - element;
    }
  });
  if (contSum == undefined) {
    errors['not_square'] = true;
    contSum = AA_J_max + AN_R_max;
  }
  console.log("contSum: " + contSum);
  
  // distribute quota of contraction
  if (AA_J_cont.min + AN_R_cont.min > contSum) {
    errors['JQK_deficient'] = true;
    AA_J_quota = Math.round(contSum * AA_J_cont.min / (AA_J_cont.min + AN_R_cont.min));
  } else {
    AA_J_quota = Math.min(
      AA_J_max,
      AA_J_cont.min + getRandomInt(0, contSum - AA_J_cont.min - AN_R_cont.min + 1)
    );
    console.log("AA_J_quota: " + AA_J_quota);
  }
  AN_R_quota = contSum - AA_J_quota;
  console.log("AN_R_quota: " + AN_R_quota);
  if (AN_R_max < AN_R_quota) {
    AA_J_quota += AN_R_quota - AN_R_max;
    AN_R_quota = AN_R_max;
    console.log("quota訂正");
    console.log("AA_J_quota: " + AA_J_quota);
    console.log("AN_R_quota: " + AN_R_quota);
  }
  
  console.log("before contractions");
  console.log(trumps);
  
  // execute contractions
  trumps = AA_J_cont.execute(trumps, pickRandomInts(0, AA_J_max, AA_J_quota));
  trumps = AN_R_cont.execute(trumps, pickRandomInts(0, AN_R_max, AN_R_quota));
  
  console.log("after contractions");
  console.log(trumps);
  
  // execute replacements
  trumps = JN_AR_repl.execute(trumps, count(trumps, TRUMP.J) - AA_J_cont.min, 0.5);
  
  console.log("after replacements");
  console.log(trumps);
  
  // execute inversions
  trumps = A_J_inv.execute(trumps, 0.5);
  
  // Jのミニマム数は、contに持たせるべきではない！
  
  // substantiate R and N
  trumps = substantiateR(trumps);
  trumps = substantiateN(trumps);
  
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
  console.log(twoDTrumps);
  
  return twoDTrumps;
}