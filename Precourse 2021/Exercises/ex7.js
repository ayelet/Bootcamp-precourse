// ex7.js - Factorial 
// Author: Ayelet Danieli

'use strict';
const { type } = require('os');
const input = require('readline-sync');

// factorial using loops
function factorial(n) {
    let result = 1;
    for (let i=1; i <= n; i++) {
        result = result * i;
    }
    return result;
}

function checkInput(input) {
   // check if number not text
    if (isNaN(input))
        return false;
    // check that number is positive
    if (input <= 1)
        return false;

    // check that number is integer
    if (!Number.isInteger(input))
        return false;

    return true;
}

// // factorial using recursion implementation
// function factorial1(n) {
//     if (n == 0)
//         return 1;
//     if (n == 1)
//         return 1;
//     return n * factorial(n-1); 
// }

let n = Number(input.question("Please enter a number => "));
if (checkInput(n))
    console.log(n + "! (factorial) is " + factorial(n));
else
    console.log("Number should be positive integral number. Cannot assess factorial value");
