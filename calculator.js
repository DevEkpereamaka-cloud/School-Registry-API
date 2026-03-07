"use strict";
const readline = require("readline").createInterface({
  input: proccess.stdin,
  outp: process.stdout,
});

const calculator = () => {
  readline.question("PICK A NUMBER: ", (num1) => {
    readline.question("PICK ANOTHER NUMBER: ", (num2) => {
      readline.question("PICK A SIGN (+, -, *, /): ", (operator) => {
        let n1 = parseFloat(num1);
        let n2 = parseFloat(num2);
        if (isNaN(n1) || isNaN(n2)) {
          console.log("ERROR INVALID NUMBER");
          else {
            if (operator === '+') 
              console.log(`RESULT: ${n1 + n2}`);
            else if(operator === '-') 
              console.log(`RESULT: ${n1 - n2}`);
            else if(operator === '*') 
              console.log(`RESULT: ${n1 * n2}`);
            else (operator === '/') 
            n2 === 0 ? 'ERROR CANT DIVIDE BY ZERO' : n1 / n2;

          }
        }

      });
    });
  });
};
