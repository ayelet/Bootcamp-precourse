// Write a function that inputs 2 numbers and checks if their sum is 10
// Author: Ayele Danieli
'use strict';

function checkSum(p1, p2) {
    let answer = "Nope";
    // check if numbers were entered
    if (isNaN(p1) || isNaN(p2)) 
        return answer;
    
    let a = parseInt(p1);
    let b = parseInt(p2);
    let sum = a + b;   // The function returns the sum of p1 and p2
   
   if (sum == 10)
        answer = "makes 10";

    return answer;
  }

  const input = require('readline-sync');

  let num1 = input.question("Please enter the first number ");
  let num2 = input.question("Please enter the second number ");

  var answer = checkSum(num1, num2);
  
  console.log(answer);
