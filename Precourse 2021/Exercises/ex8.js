// ex8.js - Seven Boom
// Author: Ayelet Danieli

'use strict';
//const input = require('readline-sync');
let str = "";
for (let i=0; i <= 100; i += 1) {
    if ((i%7 == 0) || 
        ((i-7)%10 == 0) ||
        ((i > 70) && (i < 80)))
        str += "BOOM"
    else
        str += i;
    if (i < 100)
        str += ', ';
}

console.log(str);