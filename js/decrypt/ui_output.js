/* global smoothScroll */

/* global createPatternFrame */

function showResult(booleans, numeral) {
  // TODO: エンターキーでもsubmitできるようにしたい→implicit submission?
  document.getElementById('result').style.display = 'block';
  outputNumeral(numeral);
  outputPattern(booleans);
  smoothScroll.animateScroll(document.getElementById('result'));
}

function outputNumeral(numeral) {
  document.getElementById('numeral_answer').textContent = numeral.join('');
}

function outputPattern(booleans) {
  var container = document.getElementById('pattern_answer_container');
  // remove all tables
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // insert tables
  for (var i = 0; i < booleans.length; i += 9) {
    container.appendChild(createPatternFrame(booleans.slice(i, i + 9), null));
  }
}

function hideResult() {
  document.getElementById('result').style.display = 'none';
}