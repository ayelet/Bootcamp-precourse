// ex6.js - validate integer
// Author: Ayelet Danieli
'use strict';
const input = require('readline-sync');


let isValidated = false;
do {
 let msg = "Please choose a number LARGER than 10 ";
 let num = input.question(msg);
 if (num > 10)
    isValidated = true;
} while (!isValidated);

console.log("Thank you!");