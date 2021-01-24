// Exercise 3: Let the user type a number (0...9) and output its verbal form
// Author: Ayelet Danieli

let numbers = ['ZERO', 'ONE', 'TWO', 'THREE',
                 'FOUR', 'FIVE', 'SIX',
                 'SEVEN', 'EIGHT', 'NINE'];

function getNumberByName(index) {
    return numbers[index] || "number should be between 0 to 9";
}
const input = require('readline-sync');

let index = input.question("Please enter a number between 0 to 9 ");

console.log(getNumberByName(index));