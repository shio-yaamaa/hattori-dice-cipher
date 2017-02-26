/* global Image */

/* global TRUMP2NUMERAL */
/* global EXPANDABLE_TRUMP */

/* global getDevice */
/* global createFilledArray */
/* global flattenArray */
/* global getMargin */
/* global getElementSizeExcludingPadding */

var devicePxRatio = window.devicePixelRatio;
var idealCharSize = getDevice() == 'mobile' ? 30 : 50;

var BLUE_TO_GREEN_GRADIENT = {
  angleCoefficient: 1 / 3,
  stops: {
    '0': '0252bb',
    '1': '00a827'
  }
};
var BLUE_ONLY_GRADIENT = {
  angleCoefficient: 3 / 5,
  stops: {
    '0': '211f34',
    '0.3': '225eb7',
    '0.58': 'ccefeb',
    '0.62': 'ccefeb',
    '0.8': '3088c4',
    '1': '212d88'
  }
};

// load images
var loadedImagesCount = 0;
var allImagesCount = 0;
var allImagesLoaded = false;
var queueWaitingImageLoad = [];
function enqueueFunctionWaitingImageLoad(func) {
  if (allImagesLoaded) {
    console.log("全て読み込まれていたので実行します");
    func();
  } else {
    console.log("まだ読み込まれていないのでキューに登録します");
    queueWaitingImageLoad.push(func);
  }
}
var onloadEvent = function () {
  loadedImagesCount++;
  console.log("読み込まれた画像の数が" + loadedImagesCount + "になりました");
  if (loadedImagesCount == allImagesCount) {
    allImagesLoaded = true;
    console.log("全て読み込まれました、" + queueWaitingImageLoad.length + "個のタスクを実行します");
    while (queueWaitingImageLoad.length > 0) {
      (queueWaitingImageLoad.shift())();
    }
  }
};

// create image objects
var charImages = {
  char1: {normal: new Image(), yellow: new Image()},
  char2: {normal: new Image(), yellow: new Image()},
  char3: {normal: new Image(), yellow: new Image()},
  char4: {normal: new Image(), yellow: new Image()},
  char5: {normal: new Image(), yellow: new Image()},
  char6: {normal: new Image(), yellow: new Image()},
  char9: {normal: new Image()},
  charA: { light: new Image()},
  charJ: { light: new Image()},
  charQ: { light: new Image()},
  charK: { light: new Image()}
};
var diceImage = new Image();

// set allImagesCount
allImagesCount +=
  Object.keys(charImages).reduce(function (previousCharValue, currentCharValue) {
    return previousCharValue + Object.keys(charImages[currentCharValue]).reduce(function (previousTypeValue, currentTypeValue) {
      return previousTypeValue + 1;
    }, 0);
  }, 0)
  + 1; // diceImageの分

// set onload event and source
for (var charImage in charImages) {
  for (var charImageType in charImages[charImage]) {
    charImages[charImage][charImageType].onload = onloadEvent;
    charImages[charImage][charImageType].src = '/image/' + charImage.replace('char', '') + '_' + charImageType + '.png';
    console.log("ソースは" + charImages[charImage][charImageType].src + "です");
  }
}
var diceImage = new Image();
diceImage.onload = onloadEvent;
diceImage.src = '/image/dice.png';

function explainByCanvas(cipher) {
  var canvasSize = calculateCanvasSize(document.getElementById('highlight_alphabet'));
  showHighlightAlphabetCanvas(cipher, canvasSize);
  
  var nineRowIndex = cipher.reduce(function (previous, current, index) {
    return current.indexOf('9') == -1 ? previous : index;
  }, null);
  var centerIndex = createFilledArray(cipher.length, cipher[nineRowIndex].indexOf('9'));
  var initialCenterIndex = centerIndex.concat();
  
  // expand
  var expandedCipher = [];
  cipher.forEach(function (row, rowIndex) {
    expandedCipher.push([]);
    row.forEach(function (trump, trumpIndex) {
      if (parseInt(trump, 10)) {
        expandedCipher[rowIndex].push(trump);
      } else {
        Array.prototype.push.apply(expandedCipher[rowIndex], TRUMP2NUMERAL[trump]);
        // use spread operator when ES2015 is supported
      }
      if (trump.match(EXPANDABLE_TRUMP) && trumpIndex < initialCenterIndex[rowIndex]) {
        centerIndex[rowIndex]++;
      }
    });
  });
  
  // add spaces to align center
  var maxCenterIndex = Math.max.apply(Math, centerIndex);
  var alignedCipher = expandedCipher.map(function (element, index) {
    return createFilledArray(maxCenterIndex - centerIndex[index], '').concat(element);
  });
  
  var dataForSpotlightNine = showExpandCanvas(alignedCipher, canvasSize);
  showSpotlightNineCanvas(alignedCipher, canvasSize, dataForSpotlightNine['charSize'], dataForSpotlightNine['ninePos']);
  
  // remove 9 and devide by 9
  var cipherDevidedByNine = [];
  var flattenExpandedCipher = flattenArray(expandedCipher);
  flattenExpandedCipher.splice(
    flattenExpandedCipher.indexOf(flattenExpandedCipher.indexOf(9) == -1 ? '9' : 9),
    1
  );
  for (var i = 0; i < flattenExpandedCipher.length; i += 9) {
    cipherDevidedByNine.push(flattenExpandedCipher.slice(i, i + 9));
  }
  showDevideByNineCanvas(cipherDevidedByNine, canvasSize);
  showDiceCanvas(canvasSize);
}

function calculateCanvasSize(canvas) {
  var canvasWidth;
  if (getDevice() == 'mobile') {
    canvasWidth = getMaxCanvasWidth(canvas);
  } else {
    // ここは後から調節
    canvasWidth = Math.min(720, getMaxCanvasWidth(canvas));
  }
  // 4:3で計算
  var canvasHeight = Math.round(canvasWidth * 3 / 4);
  return [canvasWidth, canvasHeight];
}

function getMaxCanvasWidth(canvas) {
  var canvasMargin = getMargin(canvas);
  return getElementSizeExcludingPadding(canvas.parentNode)[0] - (canvasMargin[1] + canvasMargin[3]);
}

function setCanvasSize(canvas, canvasContext, canvasSize) {
  canvas.width = canvasSize[0] * devicePxRatio;
  canvas.height = canvasSize[1] * devicePxRatio;
  canvas.style.width = canvasSize[0] + 'px';
  canvas.style.height = canvasSize[1] + 'px';
  canvasContext.scale(devicePxRatio, devicePxRatio);
  
  window.addEventListener('resize', function() {
    var recalculatedCanvasSize = calculateCanvasSize(canvas);
    var currentWidth = parseFloat(canvas.style.width);
    // 改変した、うまくいかなかったら考え直す, うまくいったら元のを直す
    if (currentWidth != recalculatedCanvasSize[0]) {
      canvas.style.width = recalculatedCanvasSize[0] + 'px';
      canvas.style.height = recalculatedCanvasSize[1] + 'px';
    }
  }, false);
}

function backgroundGradient(canvasContext, canvasSize, gradientType) {
  canvasContext.beginPath();
  var gradientAngleWidth = canvasSize[0] * gradientType['angleCoefficient'];
  var gradient = canvasContext.createLinearGradient(
    (canvasSize[0] - gradientAngleWidth) / 2, 0,
    (canvasSize[0] + gradientAngleWidth) / 2, canvasSize[1]
  );
  for (var stop in gradientType['stops']) {
    gradient.addColorStop(parseFloat(stop), '#' + gradientType['stops'][stop]);
  }
  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(0, 0, canvasSize[0], canvasSize[1]);
}

function showHighlightAlphabetCanvas(cipher, canvasSize) {
  var canvas = document.getElementById('highlight_alphabet');
  var canvasContext = canvas.getContext('2d');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  // background
  backgroundGradient(canvasContext, canvasSize, BLUE_TO_GREEN_GRADIENT);
  
  // character size
  var maxCharWidth = canvasSize[0] / cipher[0].length;
  var maxCharHeight = canvasSize[1] / cipher.length;
  var charSize = Math.min(idealCharSize, Math.min(maxCharWidth, maxCharHeight));
  
  // margin size
  var horizontalMargin = (canvasSize[0] - charSize * cipher[0].length) / 2;
  var verticalMargin = (canvasSize[1] - charSize * cipher.length) / 2;
  
  // draw characters
  cipher.forEach(function (row, rowIndex) {
    var y = verticalMargin + charSize * rowIndex;
    row.forEach(function (element, elementIndex) {
      var x = horizontalMargin + charSize * elementIndex;
      var image = charImages['char' + element][parseInt(element, 10) > 0 ? 'normal' : 'light'];
      enqueueFunctionWaitingImageLoad(function () {
        canvasContext.drawImage(image, x, y, charSize, charSize);
      });
    });
  });
}

function showExpandCanvas(alignedCipher, canvasSize) {
  var canvas = document.getElementById('expand');
  var canvasContext = canvas.getContext('2d');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  var ninePos; // used in showSpotlightNineCanvas()
  
  // background
  backgroundGradient(canvasContext, canvasSize, BLUE_TO_GREEN_GRADIENT);
  
  // character size
  var maxCharCountInRow = alignedCipher.reduce(function (previousValue, currentValue) {
    return Math.max(previousValue, currentValue.length);
  }, 0);
  var maxCharWidth = canvasSize[0] / maxCharCountInRow;
  var maxCharHeight = canvasSize[1] / alignedCipher.length;
  var charSize = Math.min(idealCharSize, Math.min(maxCharWidth, maxCharHeight));
  
  // margin size
  var horizontalMargin = (canvasSize[0] - charSize * maxCharCountInRow) / 2;
  var verticalMargin = (canvasSize[1] - charSize * alignedCipher.length) / 2;
  
  // draw characters
  alignedCipher.forEach(function (row, rowIndex) {
    var y = verticalMargin + charSize * rowIndex;
    row.forEach(function (element, elementIndex) {
      if (element != '') {
        var x = horizontalMargin + charSize * elementIndex;
        var image = charImages['char' + element]['normal'];
        enqueueFunctionWaitingImageLoad(function () {
          canvasContext.drawImage(image, x, y, charSize, charSize);
        });
        if (parseInt(element, 10) == 9) {
          ninePos = [x, y];
        }
      }
    });
  });
  
  return {
    charSize: charSize,
    ninePos: ninePos
  };
}

function showSpotlightNineCanvas(alignedCipher, canvasSize, charSize, ninePos) {
  var canvas = document.getElementById('spotlight_nine');
  var canvasContext = canvas.getContext('2d');
  var canvasToCopyFrom = document.getElementById('expand');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  console.log(ninePos);
  console.log(charSize);
  enqueueFunctionWaitingImageLoad(function () {
    // copy from the previous canvas
    canvasContext.drawImage(canvasToCopyFrom, 0, 0, canvasSize[0], canvasSize[1]);
    
    var circlePos = [ninePos[0] + charSize / 2, ninePos[1] + charSize / 2];
    var circleRadius = charSize / 2; 
    
    // draw shadow
    canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    canvasContext.beginPath();
    canvasContext.rect(0, 0, canvasSize[0], canvasSize[1]);
    canvasContext.arc(circlePos[0], circlePos[1], circleRadius, 0, 2 * Math.PI, true);
    canvasContext.fill();
  });
}

function showDevideByNineCanvas(cipherDevidedByNine, canvasSize) {
  var canvas = document.getElementById('devide_by_nine');
  var canvasContext = canvas.getContext('2d');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  // background
  backgroundGradient(canvasContext, canvasSize, BLUE_TO_GREEN_GRADIENT);
  
  // character size
  var maxCharWidth = canvasSize[0] / 9;
  var maxCharHeight = canvasSize[1] / cipherDevidedByNine.length;
  var charSize = Math.min(idealCharSize, Math.min(maxCharWidth, maxCharHeight));
  
  // margin size
  var horizontalMargin = (canvasSize[0] - charSize * 9) / 2;
  var verticalMargin = (canvasSize[1] - charSize * cipherDevidedByNine.length) / 2;
  
  // draw characters
  cipherDevidedByNine.forEach(function (row, rowIndex) {
    var y = verticalMargin + charSize * rowIndex;
    row.forEach(function (element, elementIndex) {
      var x = horizontalMargin + charSize * elementIndex;
      var image = charImages['char' + element]['normal'];
      enqueueFunctionWaitingImageLoad(function () {
        canvasContext.drawImage(image, x, y, charSize, charSize);
      });
    });
  });
}// enqueueFunctionWaitingImageLoadを使う

function showDiceCanvas(canvasSize) {
  var canvas = document.getElementById('dice');
  var canvasContext = canvas.getContext('2d');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  // background
  backgroundGradient(canvasContext, canvasSize, BLUE_ONLY_GRADIENT);
  
  // draw dice
  var diceSize = [undefined, undefined];
  diceSize[1] = canvasSize[1] * 0.7;
  diceSize[0] = diceSize[1] / diceImage.height * diceImage.width;
  enqueueFunctionWaitingImageLoad(function () {
    canvasContext.drawImage(
      diceImage,
      (canvasSize[0] - diceSize[0]) / 2,
      (canvasSize[1] - diceSize[1]) / 2,
      diceSize[0],
      diceSize[1]
    );
  });
  
  // draw Hattori's horn
  var hornTop = canvasSize[1] * 0.214;
  var hornSize = [canvasSize[0] * 0.041, canvasSize[1] * 0.054];
  canvasContext.fillStyle = 'black';
  canvasContext.beginPath();
  canvasContext.moveTo(canvasSize[0], hornTop);
  canvasContext.lineTo(canvasSize[0] - hornSize[0], hornTop + hornSize[1]);
  canvasContext.lineTo(canvasSize[0], hornTop + hornSize[1] / 2);
  canvasContext.fill();
}

function showEmbeddingCanvas(canvasSize, secondRowTop) {
  var canvas = document.getElementById('embedding');
  var canvasContext = canvas.getContext('2d');
  setCanvasSize(canvas, canvasContext, canvasSize);
  
  // background
  backgroundGradient(canvasContext, canvasSize, BLUE_TO_GREEN_GRADIENT);
  
  // second row and below
  
}

function explainByText(booleansCount) {
  var excludeNineCount = booleansCount;
  var expandedNumberCount = booleansCount + 1;
  var answerDigit = excludeNineCount / 9;
  
  Array.prototype.forEach.call(document.getElementsByClassName('expanded_number_count'), function(element) {
    element.textContent = expandedNumberCount;
  });
  Array.prototype.forEach.call(document.getElementsByClassName('exclude_nine_count'), function(element) {
    element.textContent = excludeNineCount;
  });
  Array.prototype.forEach.call(document.getElementsByClassName('answer_digit'), function(element) {
    element.textContent = answerDigit;
  });
}