/* global TRUMP */

/* global count */
/* global getRandomInt */
/* global pickRandomInts */
/* global booleans2trumps */

/* global AA_J_cont */
/* global AN_R_cont */
/* global JN_AR_repl */
/* global A_J_inv */

/* global substantiateR */
/* global substantiateN */

function encrypt(booleans) {
  console.log(booleans);
  
  var trumps = booleans2trumps(booleans);
  
  var contSum = (Math.pow(8, 2) - 1) - (Math.pow(7, 2) - 1);
  
  // count how many times contraction can be executed
  var AA_J_max = AA_J_cont.count(trumps);
  var AN_R_max = AN_R_cont.count(trumps);
  var AA_J_quota, AN_R_quota;
  
  // distribute quota of contraction
  if (AA_J_max + AN_R_max < contSum) {
    console.log("不可能！");
  } else {
    if (AA_J_cont.min + AN_R_cont.min > contSum) {
      AA_J_quota = Math.round(contSum * AA_J_cont.min / (AA_J_cont.min + AN_R_cont.min));
    } else {
      AA_J_quota = Math.min(
        AA_J_max,
        AA_J_cont.min + getRandomInt(0, contSum - AA_J_cont.min - AN_R_cont.min + 1)
      );
    }
    AN_R_quota = contSum - AA_J_quota;
    if (AN_R_max < AN_R_quota) {
      AA_J_quota += AN_R_quota - AN_R_max;
      AN_R_quota = AN_R_max;
    }
  }
  
  // execute contractions
  trumps = AA_J_cont.execute(trumps, pickRandomInts(0, AA_J_max, AA_J_quota));
  trumps = AN_R_cont.execute(trumps, pickRandomInts(0, AN_R_max, AN_R_quota));
  
  // execute replacements
  trumps = JN_AR_repl.execute(trumps, count(trumps, TRUMP.J) - AA_J_cont.min, 0.5);
  
  // execute inversions
  trumps = A_J_inv.execute(trumps, 0.5);
  console.log(trumps);
  
  // Jのミニマム数は、contに持たせるべきではない！
  
  // substantiate R and N
  trumps = substantiateR(trumps);
  trumps = substantiateN(trumps);
  
  // insert 9
  trumps.splice(Math.floor(trumps.length / 2), 0, 9)
  // どんなsizeであっても真ん中に入れられるようにする
  
  return trumps;
}