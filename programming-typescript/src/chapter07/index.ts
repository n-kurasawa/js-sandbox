import * as readlineSync from "readline-sync";
import { None, Option, Some } from "./option";

function ask(): Option<string> {
  let result = readlineSync.question("When is your birthday? ");
  if (result === null) {
    return new None();
  }
  return new Some(result);
}

function parse(birthday: string): Option<Date> {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return new None();
  }
  return new Some(date);
}

function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime())
  );
}

export function main() {
  const result = ask()
    .flatMap(parse)
    .flatMap((date) => new Some(date.toLocaleDateString()))
    .flatMap((date) => new Some("Date is " + date))
    .getOrElse("Invalid date input.");
  console.log(result);
}
