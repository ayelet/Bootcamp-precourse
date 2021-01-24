// ex9.js - Prime Numbers
// Author: Ayelet Danieli

'use strict';
const input = require('readline-sync');

// check if number n is prime. returns true if prime, else false
function isPrime(n) {
    // look if number is divide by any of the numbers
    // (it is enough to check all the numbers up to the sqrt(n))
    let m = Math.floor(Math.sqrt(n));

    for (let i=3; i <= m; i += 2) {
        if (n % i == 0)
            return false;
    }
    return true;
}

function findPrimes(n) {
    let primeArray = new Array();
    if (n >= 2)
        primeArray.push(2);

    for (let i=3; i <= n; i += 2) {
        // skip all the easy ones
        if ((i != 3 && i%3 == 0) || (i != 5 && i % 5 == 0) || (i != 7 && i%7 == 0))
            continue;
        if (!isPrime(i))
            continue;
        // if number is prime - add it to the array
        primeArray.push(i);
    }
    return primeArray;
}

let n = input.questionInt("Please enter a number => ");
console.log("Prime numbers from 1 to " + n + ":");

console.log(findPrimes(n));
