// ex12.js - Capitalize Vowels
// Author: Ayelet Danieli

'use strict';
const input = require('readline-sync');

// if char is a vowel return true, else return false
function isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
};
function capitalizeVowels(str) {
    let outputStr = "";
    for (let c of str)
    {
        if (isVowel(c))
            c = c.toUpperCase();

        outputStr += c;
    }
    return outputStr;
}

/// Input/Output to console
let origStr = input.question("Please enter a string => ");

let newStr = capitalizeVowels(origStr);

console.log(newStr);
