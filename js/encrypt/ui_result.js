/* global Clipboard */

// copy the cipher
function setClipboard(trumps) {
  new Clipboard('#copy', {
    text: function(trigger) {
      return trumps.reduce(function (previousValue, currentValue) {
        return previousValue + (previousValue == '' ? '' : "\n") + currentValue.join('');
      }, '');
    }
});
}