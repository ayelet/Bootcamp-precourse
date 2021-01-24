// ex16.js  - Reverse list
// Author: Ayelet Danieli

'use strict';

function reverseList(arr) {
    let halfway = Math.floor(arr.length/2);
    for (let i=0; i < halfway; i++)
    {
        let temp = arr[i];
        arr[i] = arr[n-1-i];
        arr[n-1-i] = temp;
    }
    return arr;
}

// create an n sized array
let arr = [];
let n= 49;
for (let i = 0; i < n; i += 1) {
    arr.push(i);
}

console.log(arr);
console.log(reverseList(arr));