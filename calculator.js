"use strict";

const { Readline } = require("readline/promises");

const add = (a, b) => {
  return a + b;
};
const substract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const division = (a, b) => {
  if (b === 0) {
    return "ERROR: Division by Zero";
  }
  return a / b;
};

let calculate = (num1, num2, operator) => {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return "ERROR: INVALID NUMBER";
  }
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return substract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    if (num2 === 0) {
      return "ERRROR: Division by Zero";
    }
    return division(num1, num2);
  }
  return "ERROR: Invalid Operator";
};

//console.log(calculate(10, 5, "/"));

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startCalculator = () => {
  readline.question("Enter first number: ", (num1) => {
    readline.question("Enter second number: ", (num2) => {
      readline.question("choose operator (+, -, *, /):", (op) => {
        let n1 = parseFloat(num1);
        let n2 = parseFloat(num2);
        if (isNaN(n1) || isNaN(n2)) {
          console.log("error: invalid number");
        } else {
          if (op === "+") console.log(`RESULT : ${add(n1, n2)}`);
          else if (op === "-") console.log(`RESULT : ${substract(n1, n2)}`);
          else if (op === "*") console.log(`RESULT : ${multiply(n1, n2)}`);
          else if (op === "/") {
            n2 === 0
              ? console.log("ERROR: Cannot divide by Zero!")
              : console.log(`RESULT : ${division(n1, n2)}`);
          } else {
            console.log("ERROR: INVALID OPERATOR");
          }
        }
        readline.question(
          `Type 'exit' to quit or any key to continue: `,
          (choice) => {
            if (choice.toLowerCase() === "exit") readline.close();
            else startCalculator();
          },
        );
      });
    });
  });
};
startCalculator();
