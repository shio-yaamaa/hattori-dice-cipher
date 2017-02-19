function getDevice() {
  var ua = window.navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    return 'mobile';
  }
  return 'other';
}

// count the number of certain elements in array
function count(array, element) {
  return array.reduce(function (previousValue, currentValue) {
    return currentValue == element ? previousValue + 1 : previousValue;
  }, 0);
}

// return positions of elements in array
function multipleIndexOf(array, element) {
  return array.reduce(function (previousValue, currentValue, index) {
    if (currentValue == element) {
      previousValue.push(index);
    }
    return previousValue;
  }, []);
}

function createFilledArray(count, element) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array.push(element);
  }
  return array;
}

// flatten an array by one level
function flattenArray(array) {
  return Array.prototype.concat.apply([], array);
}

// get key which corresponds to the given value
// not used
function getKey(array, value) {
  return Object.keys(array).reduce(function (previousValue, currentValue) {
    return array[currentValue] == value ? currentValue : previousValue;
  }, null);
}

// return true with the given probability
function getRandomBoolean(probability) {
  return Math.random() < probability;
}

// get random int from [min, max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// pick m elements at random from array
function pickRandomElements(array, m) {
  var j, tmp;
  for (var i = 0; i < array.length - 1; i++) {
    j = getRandomInt(i, array.length);
    tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array.slice(0, m);
}

// pick count ints at random from [min, max)
function pickRandomInts(min, max, count) {
  var array = [];
  for (var i = min; i < max; i++) {
    array.splice(getRandomInt(0, array.length + 1), 0, i);
  }
  return array.slice(0, count);
}

function getMargin(element) {
  var computedStyle = getComputedStyle(element);
  return [
    parseFloat(computedStyle.marginTop),
    parseFloat(computedStyle.marginRight),
    parseFloat(computedStyle.marginBottom),
    parseFloat(computedStyle.marginLeft)
  ];
}

function getElementSizeExcludingPadding(element) {
  var computedStyle = getComputedStyle(element);
  return [
    element.clientWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)),
    element.clientHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom))
  ];
}