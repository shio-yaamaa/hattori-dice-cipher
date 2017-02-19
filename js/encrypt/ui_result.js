/* global Clipboard */

// copy the cipher
function setClipboard(trumps) {
  new Clipboard('#copy', {
    text: function(trigger) {
      return trumps.join('');
    }
});
}