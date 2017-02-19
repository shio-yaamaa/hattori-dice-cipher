/* global smoothScroll */

/* global getDevice */
/* global getMargin */
/* global getElementSizeExcludingPadding */

/* global calculateCipherSize */

/* global setClipboard */

var cipherCanvasPadding = 1;  // relative to fontSize
var marginBetweenCipherChar = 0.5;  // relative to fontSize

function showResult(trumps, errors) {
  // TODO: Type Aならエンターキーでもsubmitできるようにしたい→implicit submission?
  document.getElementById('result').style.display = 'block';
  //showCipher(trumps);
  showCipherCanvas(trumps);
  showErrors(errors);
  setClipboard(trumps);
  smoothScroll.animateScroll(document.getElementById('result'));
}

/*function showCipher(trumps) {
  var size = calculateCipherSize(trumps.length);
  
  var table = document.getElementById('cipher_table');
  
  // empty the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  
  table.style.display = 'inline-block';
  for (var y = 0; y < size[1]; y++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for (var x = 0; x < size[0]; x++) {
      var td = document.createElement('td');
      td.textContent = trumps[y * size[0] + x];
      tr.appendChild(td);
    }
  }
}*/

function showErrors(errors) {
  var errorExist = false;
  for (var error in errors) {
    document.getElementById(error).style.display = errors[error] ? 'block' : 'none';
    errorExist = errorExist || errors[error];
  }
  document.getElementById('error').style.display = errorExist ? 'block' : 'none';
}

function showCipherCanvas(trumps) {
  var cipherSize = calculateCipherSize(trumps.length);
  
  var canvas = document.getElementById('cipher_canvas');
  var canvasContext = canvas.getContext('2d');
  var devicePxRatio = window.devicePixelRatio;
  
  // canvas size
  var cipherCanvasPx = calculateCipherCanvasPx(canvas, cipherSize);
  canvas.width = cipherCanvasPx['canvasWidth'] * devicePxRatio;
  canvas.height = canvas.width * cipherCanvasPx['widthToHeight'];
  canvas.style.width = cipherCanvasPx['canvasWidth'] + 'px';
  canvas.style.height = (parseFloat(canvas.style.width) * cipherCanvasPx['widthToHeight']) + 'px';
  canvasContext.scale(devicePxRatio, devicePxRatio);
  
  // resize the canvas according to the window size
  window.addEventListener('resize', function() {
    var maxWidth = getMaxCanvasWidth(canvas);
    var currentWidth = parseFloat(canvas.style.width);
    if (currentWidth > maxWidth || currentWidth < cipherCanvasPx['canvasWidth']) {
      canvas.style.width = maxWidth + 'px';
      canvas.style.height = (parseFloat(canvas.style.width) * cipherCanvasPx['widthToHeight']) + 'px';
    }
  }, false);
  
  // canvas settings
  //canvasContext.font = cipherCanvasPx['fontSize'] + 'px';// + ' ' + '"Shadows Into Light Two"';
  canvasContext.font = canvasContext.font.replace(/\d+px/, cipherCanvasPx['fontSize'] + 'px');
  canvasContext.textAlign = 'center';
  canvasContext.textBaseline = 'middle';
  
  // background
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  
  // char
  canvasContext.fillStyle = 'black';
  var posY, posX;
  for (var y = 0; y < cipherSize[1]; y++) {
    posY = cipherCanvasPx['fontSize'] * (cipherCanvasPadding + y + 0.5 + marginBetweenCipherChar * y);
    for (var x = 0; x < cipherSize[0]; x++) {
      posX = cipherCanvasPx['fontSize'] * (cipherCanvasPadding + x + 0.5 + marginBetweenCipherChar * x);
      canvasContext.fillText(trumps[y * cipherSize[0] + x] || '', posX, posY);
    }
  }
  
  // save button (doesn't work in some browsers)
  document.getElementById('link_to_canvas_image').href = canvas.toDataURL('image/png');
}

function calculateCipherCanvasPx(canvas, cipherSize) {
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