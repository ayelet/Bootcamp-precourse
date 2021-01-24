// Exercise 4 - Restaurant recommendation
// Author: Ayelet Danieli

'use strict';

const { sep } = require('path');
var readlineSync = require('readline-sync');
var thr = require('throw');

// Pseudo database thingies
let foodTypes = ['Thai', 'Chinese', 'Indian', 'Israeli', 'Italian'];
let restName = [ 'Giraffe', 'Peking Duck', 'Indira', 'Messa', 'Pronto' ];
let separator = '\n*****************************\n';
try {
    console.log("Welcome!");
    // Wait for user's input
    let name = readlineSync.question('May I have your name? ');
    console.log('Hi ' + name + '!');

    let numVisitors = readlineSync.question('How many people would like to join in? ');

    // check if a user entered a number, throw an error if not
    if (Number.isNaN(Number.parseInt(numVisitors))) {
        throw new Error("Stop Execution");
    }

    let isKosher = false;
    let isMehadrin = false;
    if (readlineSync.keyInYN('Are you searching for a kosher restaurant?')) {
        // 'Y' key was pressed.
        isKosher = true;
        if (readlineSync.keyInYN('Should it be Kosher Lemehadrin?')) {
            isMehadrin = true;
        }
    } 

    let type = readlineSync.keyInSelect(foodTypes, 'What type of food would you like?');

    let kosherState = isKosher ? "Kosher" : "Non kosher";
    if (isMehadrin)
    kosherState = kosherState +  ' Lemehadrin';

    console.log(separator);
    let msg = 'Well, ' + name + ', my recommendation for a party of ' + numVisitors + ' in a ' + kosherState + ' ' + foodTypes[type] + ' Restaurant:';
    console.log(msg);
    console.log(restName[type]);
    console.log(separator);
}

catch(err) {
    console.log(separator + err + ', Goodbye' + separator);

}