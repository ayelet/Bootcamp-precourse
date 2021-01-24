// ex13.js - Longest word
// Author: Ayelet Danieli

'use strict';
const input = require('readline-sync');
// string for testing purposes
//const testString = "Hello*& Beautiful soup144565 12345653434353";

// ommit all non-alpha characters
function trimNonAlphaChars(str){
    // use a regular expression to replace anythin that is not a to z 
    str = str.replace(/[^a-z +]+/gi, '');
    return str;
}
function findLongestWord(str) {
    str = trimNonAlphaChars(str);
    let wordArray = str.split(' ');
 
    let maxWord = "";
    let maxLen = 0;
    for (let word of wordArray) {

        if (word.length > maxLen) {
            maxLen = word.length;
            maxWord = word;
        }
    }

    return maxWord;
}

/// Input/Output to console
let str = input.question("Please enter a string => ");
let word = findLongestWord(str);
//let word = findLongestWord(testString);

console.log(word);