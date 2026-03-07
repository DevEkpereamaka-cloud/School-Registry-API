"use strict";

const { Readline } = require("readline/promises");

const readline = require("readline").createInterface({
  input: proccess.stdin,
  outp: process.stdout,
});
const calculator = () => {
  readline.question("Pick a number: ", (num1) => {
    readline.question("pick an operator: ", (op) => {
      readline.question("Pick another number: ", (num2) => {
        let n1 = parseFloat(num1);
        let n2 = parseFloat(num2);
        if (isNaN(num1) || isNaN(num2)) {
          console.log("Error invalid number");
        } else {
          if (op === "+") console.log(`RESULT: ${n1 + n2}`);
          else if (op === "-") console.log(`RESULT: ${n1 - n2}`);
          else if (op === "*") console.log(`RESULT: ${n1 * n2}`);
          else if (op === "/") {
            n2 === 0
              ? console.log("ERROR CANT DIVIDE BY ZERO")
              : console.log(n1 / n2);
          } else {
            console.log("ERROR INVALID OPERATOR:");
          }
        }
        readline.question(
          "type 'exit' to quit OR any key to continue",
          (choice) => {
            if (choice.toLowerCase === "exit") readline.close;
            else calculator();
          },
        );
      });
    });
  });
};
calculator();
