// ex11.js - Palindrome
// Author: Ayelet Danieli

'use strict';
const input = require('readline-sync');

function reverseString(str) {
    let newStr = str.split('').reverse().join('');
    return newStr;
}
function isPalindrom(str) {
    let reversedStr = reverseString(str);
    //console.log(reversedStr);
    let len = str.length;
    for (let i=0; i < len/2; i += 1) {
        if (str[i] != reversedStr[i])
            return false;
    }
    return true;
}

let origStr = input.question("Please enter a string => ");

let isPalindrome = isPalindrom(origStr);
console.log(isPalindrome + ": " + origStr + " is " + (isPalindrome ? "" : " not ") + "a palindrome");

