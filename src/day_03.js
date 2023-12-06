/**
 * Contains solutions for Day 3
 * Puzzle Description: https://adventofcode.com/2023/day/3
 */
const getNumIndicies = (startIndex, endIndex) => {
  const indexArr = [];
  for (let i = startIndex; i <= endIndex; i++) {
    indexArr.push(i);
  }
  return indexArr;
}

const createCapturedNumbers = (line, regex) => {
  const capturedNumbers = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    // Extract the matched number and its indices
    const [number] = match;
    const indices = getNumIndicies(match.index, match.index + number.length - 1);
    // Add the number and its indices to the array
    capturedNumbers.push({ number, indices });
  }
  //# console.log('#####capturedNumbersReturn:', capturedNumbers);
  return capturedNumbers;
}


const isAdjacentToSymbol = (grid, regex) => {
  let digitMatch = false;
  for (let digit of grid) {
    // console.log(digit, regex.test(digit));
    if (regex.test(digit)) {
      digitMatch = true;
      break;
    }
    //else do nothing, check next digit
  };
  // no adjacent symbols
  return digitMatch;
}

export const levelOne = ({ input, lines }) => {
  // your code here
  //input array of strings, containing numbers, symbols, and periods (ignored)
  //output sum of numbers adjacent to symbols, even diagonally (if number is +1 or -1 from symbox index of row above/previous line
  const numberRegex = /(?:[+-]?\d+\d+)|(?:[+-]?\d+)/g;
  const symbolRegex = /[^A-Za-z0-9.]/g;
  let total = 0;
  let topLine, middleLine, bottomLine = null;
  lines.forEach((currentLine, lineIndex) => {
    console.log('lineIndex:', lineIndex);
    if (lineIndex === 0) {
      topLine = currentLine;
      console.log('First line');
    } else if (lineIndex === 1) {
      console.log('second line');
      middleLine = currentLine;
      let capturedNumbers = createCapturedNumbers(topLine, numberRegex);

      capturedNumbers.forEach((numberObj) => {
        const { number, indices } = numberObj;
        for (let index of indices) {
          let grid = [topLine[index - 1], topLine[index + 1], middleLine[index - 1], middleLine[index + 1], middleLine[index]];
          const isAdjacent = isAdjacentToSymbol(grid, symbolRegex);
          if (isAdjacent) {
            // console.log('isAdjacentToSymbol! number:', number);
            total += Number(number);
            console.log('total:', total);
            break;
          }
        }
      });
    } else {
      bottomLine = currentLine;
      let capturedNumbers = createCapturedNumbers(middleLine, numberRegex);
      capturedNumbers.forEach((numberObj) => {
        const { number, indices } = numberObj;
        // console.log(indices);
        for (let index of indices) {
          let grid = [middleLine[index - 1], topLine[index - 1], bottomLine[index - 1], middleLine[index + 1], topLine[index + 1], bottomLine[index + 1], topLine[index], bottomLine[index]];
          const isAdjacent = isAdjacentToSymbol(grid, symbolRegex);
          if (isAdjacent) {
            // console.log('isAdjacentToSymbol! number:', number);
            total += Number(number);

            break;
          }
        }
      });

      if (lineIndex === lines.length - 1) {
        console.log('Last line');
        capturedNumbers = createCapturedNumbers(bottomLine, numberRegex);
        capturedNumbers.forEach((numberObj) => {
          const { number, indices } = numberObj;
          // console.log(indices);
          for (let index of indices) {
            let grid = [bottomLine[index - 1], bottomLine[index + 1], middleLine[index - 1], middleLine[index + 1], middleLine[index]];
            const isAdjacent = isAdjacentToSymbol(grid, symbolRegex);
            if (isAdjacent) {
              // console.log('isAdjacentToSymbol! number:', number);
              total += Number(number);
              console.log('total:', total);
              break;
            }
          }
        });
      }
      topLine = middleLine;
      middleLine = bottomLine;
    }

  });
  console.log(total);
  return total;
}



export const levelTwo = ({ input, lines }) => {
  // your code here
};
