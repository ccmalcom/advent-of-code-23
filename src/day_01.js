/**
 * Contains solutions for Day 1
 * Puzzle Description: https://adventofcode.com/2023/day/1
 */

const findTotalCalibration = (lines) => {
  //loop through strings in array
  let total = 0;
  lines.forEach((str) => {
    //get first numerical digit of string
    const firstDigit = parseInt(str.match(/\d/), 10);
    //get last numerical digit of string
    const lastDigit = parseInt(str.match(/\d(?=\D*$)/), 10);
    // concat first and last didgit and push to numberArray
    let finalNumber = parseInt(`${firstDigit}${lastDigit}`, 10);
    total += finalNumber;
  });
  console.log('total: ', total);
  return total;
}

export const levelOne = ({ input, lines }) => {
  // your code here
  return findTotalCalibration(lines);
};

// add up numbers in array
const sum = (numbers) => numbers.reduce((acc, x) => acc + x, 0);

// get first and last digit of each string in array
const sumOfCalibrationValues = (lines, filterDigitCharsFn, mapDigitFn) =>
  sum(
    lines
      //            (line) => [...line.matchAll(digitRegex)].map((match) => match[1]),
      .map((line) => filterDigitCharsFn(line))
      .map((digitChars) => [digitChars[0], digitChars.at(-1)])
      //                                      (str) => wordToDigit.get(str) || str
      .map((firstAndLast) => firstAndLast.map(mapDigitFn))
      .map((digits) => Number(digits.join("")))
  );


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
  return sumOfCalibrationValues(
    lines,
    // spread string into array of characters, filter with regex(returns [match, firstCaptureGroup]), return array of firstCaptureGroup
    (line) => [...line.matchAll(digitRegex)].map((match) => match[1]),
    // map each string to its digit or return the string if it is not a word
    (str) => wordToDigit.get(str) || str
  );
};
