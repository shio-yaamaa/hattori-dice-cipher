/* global Clipboard */

/* global LINE_BREAK_IN_URL_PARAM */

// save button (doesn't work in some browsers)
function setSaveButton(canvas) {
  document.getElementById('link_to_canvas_image').href = canvas.toDataURL('image/png');
}

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

// decrypt button
function setDecryptButton(trumps) {
  document.getElementById('decrypt').addEventListener('click', function () {
    window.location.href = '/decrypt/?cipher=' + trumps.reduce(function (previousValue, currentValue) {
      return previousValue + (previousValue == '' ? '' : LINE_BREAK_IN_URL_PARAM) + currentValue.join('');
    }, '');
  });
}