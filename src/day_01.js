/**
 * Contains solutions for Day 1
 * Puzzle Description: https://adventofcode.com/2023/day/1
 */


export const levelOne = ({ input, lines }) => {
  // your code here
  let total = 0;
  lines.forEach((str) => {
    //get first numerical digit of string
    const firstDigit = Number(str.match(/\d/));
    //get last numerical digit of string
    const lastDigit = Number(str.match(/\d(?=\D*$)/));
    // concat first and last didgit and push to numberArray
    let finalNumber = Number(`${firstDigit}${lastDigit}`);
    total += finalNumber;
  });
  console.log('total: ', total);
  return total;
};



export const levelTwo = ({ lines }) => {
  const digitRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  const wordToDigit = new Map([
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
  ]);

  let total = 0;

  lines.forEach((line) => {
    const digitChars = [...line.matchAll(digitRegex)].map((match) => match[1]);
    const firstAndLast = [digitChars[0], digitChars.at(-1)];
    const digits = firstAndLast.map((str) => wordToDigit.get(str) || str);
    const finalNumber = Number(digits.join(""));
    total += finalNumber;
  });

  return total;
};
