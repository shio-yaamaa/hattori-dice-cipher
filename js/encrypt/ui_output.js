/* global smoothScroll */

/* global getDevice */
/* global getMargin */
/* global getElementSizeExcludingPadding */

/* global calculateCipherSize */

/* global setSaveButton */
/* global setClipboard */
/* global setDecryptButton */

var cipherCanvasPadding = 1;  // relative to fontSize
var marginBetweenCipherChar = 0.5;  // relative to fontSize

function showResult(trumps, errors) {
  document.getElementById('result').style.display = 'block';
  var canvas = showCipherCanvas(trumps);
  showErrors(errors);
  setSaveButton(canvas);
  setClipboard(trumps);
  setDecryptButton(trumps);
  smoothScroll.animateScroll(document.getElementById('result'));
}

function showErrors(errors) {
  var errorExist = false;
  for (var error in errors) {
    document.getElementById(error).style.display = errors[error] ? 'block' : 'none';
    errorExist = errorExist || errors[error];
  }
  document.getElementById('error').style.display = errorExist ? 'block' : 'none';
}

function showCipherCanvas(trumps) {
  //var cipherSize = calculateCipherSize(trumps.length);
  
  var canvas = document.getElementById('cipher_canvas');
  var canvasContext = canvas.getContext('2d');
  var devicePxRatio = window.devicePixelRatio;
  
  // canvas size
  var cipherCanvasDimen = calculateCipherCanvasDimen(canvas, [trumps[0].length, trumps.length]);
  canvas.width = cipherCanvasDimen['canvasWidth'] * devicePxRatio;
  canvas.height = canvas.width * cipherCanvasDimen['widthToHeight'];
  canvas.style.width = cipherCanvasDimen['canvasWidth'] + 'px';
  canvas.style.height = (parseFloat(canvas.style.width) * cipherCanvasDimen['widthToHeight']) + 'px';
  canvasContext.scale(devicePxRatio, devicePxRatio);
  
  // resize the canvas according to the window size
  window.addEventListener('resize', function() {
    var maxWidth = getMaxCanvasWidth(canvas);
    var currentWidth = parseFloat(canvas.style.width);
    if (currentWidth > maxWidth || currentWidth < cipherCanvasDimen['canvasWidth']) {
      canvas.style.width = maxWidth + 'px';
      canvas.style.height = (parseFloat(canvas.style.width) * cipherCanvasDimen['widthToHeight']) + 'px';
    }
  }, false);
  
  // canvas settings
  canvasContext.font = canvasContext.font.replace(/\d+px/, cipherCanvasDimen['fontSize'] + 'px');
  canvasContext.textAlign = 'center';
  canvasContext.textBaseline = 'middle';
  
  // background
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  
  // char
  canvasContext.fillStyle = 'black';
  var posY, posX;
  trumps.forEach(function (row, rowIndex) {
    posY = cipherCanvasDimen['fontSize']
      * (cipherCanvasPadding + rowIndex + 0.5 + marginBetweenCipherChar * rowIndex);
    row.forEach(function (element, elementIndex) {
      posX = cipherCanvasDimen['fontSize']
        * (cipherCanvasPadding + elementIndex + 0.5 + marginBetweenCipherChar * elementIndex);
      canvasContext.fillText(trumps[rowIndex][elementIndex] || '', posX, posY);
    });
  });
  
  return canvas;
}

function calculateCipherCanvasDimen(canvas, cipherSize) {
  var idealFontSize = getDevice() == 'mobile' ? 24 : 32;
  var maxFontSize = getMaxCanvasWidth(canvas)
    / (cipherCanvasPadding * 2 + cipherSize[0] + marginBetweenCipherChar * (cipherSize[0] - 1));
  var fontSize = Math.min(idealFontSize, maxFontSize);
  var canvasWidth = fontSize
    * (cipherCanvasPadding * 2 + cipherSize[0] + marginBetweenCipherChar * (cipherSize[0] - 1));
  var canvasHeight = canvasWidth - (cipherSize[0] - cipherSize[1]) * (fontSize * (1 + marginBetweenCipherChar));
  return {
    canvasWidth: canvasWidth,
    widthToHeight: canvasHeight / canvasWidth,
    fontSize: fontSize
  };
}

function getMaxCanvasWidth(canvas) {
  var canvasMargin = getMargin(canvas);
  return getElementSizeExcludingPadding(canvas.parentNode)[0] - (canvasMargin[1] + canvasMargin[3]);
}