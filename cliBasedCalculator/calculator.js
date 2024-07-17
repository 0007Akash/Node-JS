// Used process.argv inbuilt property which stores command line arguments in array
const argvs = process.argv;
// Created another array from the third element of argvs array which is exactly the user provided arguments
const argv = argvs.slice(2);
// Used inbuilt crypto module for random number generation
const crypto = require("crypto");

// 0, 1 and 2 index of argv array contains the operation , operator1 and operator2 respectively on which calculation need to be performed
const operation = argv[0];
const operator1 = parseFloat(argv[1]);
const operator2 = parseFloat(argv[2]);

// edge case to look if the argv array is empty implies that user has not given any arguments
if (argv.length < 1) {
  console.log("Provide valid operation");
}
// performing addition based on the arguments provided through the command line arguments
else if (operation === "add") {
  console.log(
    `${operation} of ${operator1} and ${operator2} is ${operator1 + operator2}`
  );
}
// performing subtraction based on the arguments provided through the command line arguments
else if (operation === "sub") {
  console.log(
    `${operation} of ${operator1} and ${operator2} is ${operator1 - operator2}`
  );
}
// performing multiplication based on the arguments provided through the command line arguments
else if (operation === "mult") {
  console.log(
    `${operation} of ${operator1} and ${operator2} is ${operator1 * operator2}`
  );
}
// performing division based on the arguments provided through the command line arguments
else if (operation === "divide") {
  console.log(
    `${operation} of ${operator1} and ${operator2} is ${operator1 / operator2}`
  );
}
// used sin, cos, tan operations to extract it's exact value in float
else if (operation === "sin") {
  if (argv.length === 2) {
    console.log(`${operation} ${operator1} is ${Math.sin(operator1)}`);
  } else {
    console.log("Invalid arguments --> Use like 'node <file path> sin 1'  ");
  }
} else if (operation === "cos") {
  if (argv.length === 2) {
    console.log(`${operation} ${operator1} is ${Math.cos(operator1)}`);
  } else {
    console.log("Invalid arguments --> Use like 'node <file path> cos 1'  ");
  }
} else if (operation === "tan") {
  if (argv.length === 2) {
    console.log(`${operation} ${operator1} is ${Math.tan(operator1)}`);
  } else {
    console.log("Invalid arguments --> Use like 'node <file path> tan 1'  ");
  }
}
// used crypto module to generate random numbers in binary format
else if (operation === "random") {
  if (argv.length < 2) {
    console.log("Provide length for random number generation.");
  } else {
    const randomBytes = crypto.randomBytes(operator1);
    const randomNumber = randomBytes.toString("binary");
    console.log(`Random number of length ${operator1} is :- ${randomNumber}`);
  }
} else {
  console.log("Invalid operation or arguments");
}
