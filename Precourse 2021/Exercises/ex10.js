// ex10.js - Star instead of apace
// Author: Ayelet Danieli

'use strict';
const input = require('readline-sync');

let origStr = input.question("Please enter a string with spaces => ");
let tempArr = origStr.split(' ');
let outputStr = tempArr.join('*');

console.log(outputStr);