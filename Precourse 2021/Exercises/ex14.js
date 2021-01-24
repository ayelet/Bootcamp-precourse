// ex14.js - Min & Max
// Author: Ayelet Danieli

'use strict';


// create an n sized array with random numbers
// if n < 0 create a zero sized array
function createArray(n) {
    if (n < 0)
        n = 0;
    if (n > Number.MAX_SAFE_INTEGER)
        n = Number.MAX_SAFE_INTEGER;

    let arr = [];

    for (let i=0; i < n; i += 1) {
        arr.push(Math.floor(Math.random() * 50 + 1)); // random range 1-50
    }
    return arr;
}

// find the minimun and maximum of an array
function findMinMax(arr) {
    if (arr.length < 1) {
        console.log("Array is empty");
        return;
    }

    let min = 51;
    let max = 0;
    let i;
    for (i of arr) {
        if (i < min)
            min = i;
        if (i > max)
            max = i;
    }
    console.log(`min is ${min}`);
    console.log(`max is ${max}`);
}

let arr = createArray(20);
console.log(arr);
findMinMax(arr);