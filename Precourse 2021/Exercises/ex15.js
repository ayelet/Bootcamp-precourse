// ex15.js  - Join 2 array
// Author: Ayelet Danieli

'use strict';

////////////////////////////////////////
// method 1: iterating through both array
function joinArrays(arr1, arr2) {
    let arr3 = [];
    let i;
    for (i of arr1) {
        arr3.push(i);
    }
    for (i of arr2)
        arr3.push(i);

    return arr3;
}

////////////////////////////////
// method2: using concat
function joinArraysByConcat(arr1, arr2) {
    return arr1.concat(arr2);
}


let sentence1 = "Hello World";
let sentence2 = "How are you doing today";

let arr1 = sentence1.split(" ");
//let arr2 = [];
let arr2 = sentence2.split(" ");

let arr3 = joinArrays(arr1, arr2);
console.log(arr3);

let arr4 = [1,2,3,4,5];
//let arr5 = [];
let arr5 = [6,7,8,9,10];

console.log(joinArraysByConcat(arr4, arr5));
