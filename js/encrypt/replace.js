/* global TRUMP */

/* global multipleIndexOf */
/* global getRandomInt */
/* global pickRandomElements */

/* global AA_J_cont */
/* global AN_R_cont */

var JN_AR_repl = {
  execute: function (trumps) {
    var executablePositions = this.getExecutablePositions(trumps);
    
    var JExcessCount = Math.max(multipleIndexOf(trumps, TRUMP.J).length - AA_J_cont.min, 0);
    var RDeficitCount = Math.max(AN_R_cont.min - multipleIndexOf(trumps, TRUMP.R).length, 0);
    var minReplaceCount = RDeficitCount; // R deficit count
    var maxReplaceCount = Math.min(executablePositions.length, JExcessCount); // executable count and J excess count
    var positions = pickRandomElements(
      executablePositions,
      minReplaceCount <= maxReplaceCount ? getRandomInt(minReplaceCount, maxReplaceCount + 1) : 0
    );
    
    var result = [];
    trumps.forEach(function (element, index) {
      if (positions.indexOf(index) != -1) {
        result.push(TRUMP.A);
      } else if (positions.indexOf(index - 1) != -1) {
        // if previous one is replaced
        result.push(TRUMP.R);
      } else {
        result.push(element);
      }
    });
    return result;
  },
  getExecutablePositions: function (trumps) {
    var positions = [];
    trumps.forEach(function (element, index) {
      if (element == TRUMP.J && trumps[index + 1] == TRUMP.N) {
        positions.push(index);
      }
    });
    return positions;
  }
  // todo: ここでR不足解消されたらerror消す
};