/* global Clipboard */

/* global LINE_BREAK_IN_URL_PARAM */

// save button (doesn't work in some browsers)
function setSaveButton(canvas) {
  document.getElementById('link_to_canvas_image').href = canvas.toDataURL('image/png');
}

// set the animation end listener
var copyMessageElement = document.getElementById('copy_message');
copyMessageElement.addEventListener('animationend', function () {
  copyMessageElement.classList.remove('copy_message_show');
});

// hide the copy button if the clipboard.js isn't available
if (!Clipboard.isSupported()) {
  document.getElementById('copy').parentElement.style.display = 'none';
}

// copy the cipher
function setClipboard(trumps) {
  new Clipboard('#copy', {
    text: function(trigger) {
      copyMessageElement.classList.add('copy_message_show');
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