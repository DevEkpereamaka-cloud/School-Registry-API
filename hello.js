"use strict";

const db = [
  {
    id: 1,
    userName: "zane",
    admin: false,
    isBlocked: true,
    balance: 10000,
  },
  {
    id: 2,
    userName: "sam",
    admin: false,
    isBlocked: false,
    balance: 5000,
  },
  {
    id: 3,
    userName: "bary",
    admin: true,
    isBlocked: false,
    balance: 7000,
  },
];

let getUser = (name, id) => {
  let result = db.find((user) => user.userName === name && user.id === id);
  return result || "USER NOT FOUND";
};

let toggleBlock = (name, id) => {
  let user = getUser(name, id);
  if (typeof user === "object" && user.id === id) {
    user.isBlocked = !user.isBlocked;
    return `THE USER ${user.userName} IS NOW ${user.isBlocked ? "BLOCKED" : "UNBLOCKED"}`;
  }
  return "INCORRECT USERNAME OR PIN";
};
let transactionHistory = [];

let sendMoney = (fromId, toId, amount) => {
  let sender = db.find((user) => user.userName === fromId);
  let receiver = db.find((user) => user.userName === toId);
  if (typeof sender !== "object" || typeof receiver !== "object") {
    return "TRANSACTIOM FAILED: ONE OR BOTH USERS NOT FOUND";
  } else if (
    typeof sender === "object" &&
    typeof receiver === "object" &&
    sender.isBlocked === false &&
    receiver.isBlocked === false
  ) {
    if (sender.balance >= amount) {
      sender.balance -= amount;
      receiver.balance += amount;
      const receipt = {
        sender: sender.userName,
        receiver: receiver.userName,
        amount: amount,
        date: new Date().toLocaleString(),
      };

      transactionHistory.push(receipt);
      return `TRANSACTION SUCCESSFUL: ${sender.userName} HAS SUCCESSFULLY SENT ${amount} TO ${receiver.userName};`;
    }
  } else if (sender.isBlocked === true || receiver.isBlocked === true) {
    return "TRANSACTION FAILED: ONE OR BOTH USERS ARE BLOCKED";
  } else if (sender.balance < amount) {
    return "INSUFFICIENT FUNDS";
  }
  return "transaction failed";
};

console.log(transactionHistory);
console.log(getUser("zane", 1));
console.log(getUser("sam", 2));
console.log(sendMoney("zane", "sam", 500));
console.log(toggleBlock("zane", 1));
console.log(sendMoney("zanev", "sam", 1000));
console.log(sendMoney("zane", "sam", 1000));
console.log(transactionHistory);
console.log(getUser("sam", 2));
console.log(getUser("zane", 1));
