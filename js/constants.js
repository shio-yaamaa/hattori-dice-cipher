var FRAME_COUNT_MIN = 1;
var FRAME_COUNT_MAX = 16;
var FRAME_COUNT_DEFAULT = 7;

var NUMERAL2BOOLEANS = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false,  true, false, false, false, false],
  [ true, false, false, false, false, false, false, false,  true],
  [ true, false, false, false,  true, false, false, false,  true],
  [ true, false,  true, false, false, false,  true, false,  true],
  [ true, false,  true, false,  true, false,  true, false,  true],
  [ true, false,  true,  true, false,  true,  true, false,  true],
  [ true, false,  true,  true,  true,  true,  true, false,  true],
  [ true,  true,  true,  true, false,  true,  true,  true,  true],
  [ true,  true,  true,  true,  true,  true,  true,  true,  true]
];

var TRUMP = {
  A: 'A',
  J: 'J',
  Q: 'Q',
  K: 'K',
  R: 'R',
  N: 'N'
};

var EXPANDABLE_TRUMP = /(J|Q|K)/;