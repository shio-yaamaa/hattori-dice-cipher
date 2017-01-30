/* global string2trumps */
/* global trumps2numbers */
/* global numbers2booleans */

/* global encrypt */

/* global showPatternInput */
/* global showCipher */

showPatternInput(15);

var string = "Q52A252K332Q444KQQKJ6AQJ96J33A55J64K6243A6A64AQAK";
var booleans = numbers2booleans(trumps2numbers(string2trumps(string)));

console.log(booleans);

var cipher = encrypt(booleans);
showCipher(cipher, [7, 7]);