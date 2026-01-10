import * as readlineSync from "readline-sync";

function ask() {
  return readlineSync.question("When is your birthday? ");
}

function ask2() {
  let result = readlineSync.question("When is your birthday? ");
  if (result === null) {
    return [];
  }
  return [result];
}

function parse(birthday: string): Date[] {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return [];
  }
  return [date];
}

function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime())
  );
}

export function main() {
  parse(ask())
    .map((date) => date.toISOString())
    .forEach((date) => console.info("Date is", date));

  ask2()
    .map(parse)
    .map((date) => date.toISOString())
    .forEach((date) => console.info("Date is", date));
}
