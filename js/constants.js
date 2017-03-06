var FRAME_COUNT_MIN = 1;
var FRAME_COUNT_MAX = 1000;
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

var TRUMP2NUMERAL = {
  A: [1],
  J: [1, 1],
  Q: [1, 2],
  K: [1, 3]
};

var EXPANDABLE_TRUMP = /(J|Q|K)/;

var LINE_BREAK_IN_URL_PARAM = 'n';