/**
 * Contains solutions for Day 3
 * Puzzle Description: https://adventofcode.com/2023/day/3
 */

const testLines = [
'467..114..',
'...*......',
'..35..633.',
'......#...',
'617*......',
'.....+.58.',
'..592.....',
'......755.',
'...$.*....',
'.664.598..'
]; //result: 4361

export const levelOne = ({ input, lines }) => {
    // your code here
    //input array of strings, containing numbers, symbols, and periods (ignored)
    //output sum of numbers adjacent to symbols, even diagonally (if number is +1 or -1 from symbox index of row above/previous line
    let total = 0;
    // lines = testLines;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        
        const numbers = lines[lineIndex].match(/\d+/g);
        // console.log('lineIndex:', lineIndex, 'numbers:', numbers);
        if (numbers != null) {
            let nextStart = 0;
            for (let number of numbers) {
                // console.log('number: ', number);
                let partOfSum = false;
                let numberStart = lines[lineIndex].indexOf(number, nextStart);
                nextStart = numberStart + 1;
                let numberEnd = numberStart + number.length;
                for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
                    // console.log('y: ', y);
                    for (let x = numberStart - 1; x <= numberEnd; x++) {
                        // console.log('x: ', x);
                        if (y >= 0 && y < lines.length && x >= 0 && x < lines[lineIndex].length) {
                            if (isNaN(parseInt(lines[y][x])) && lines[y][x] != '.') {
                                total += parseInt(number)
                                break;
                                // console.log('added number: ', number);
                            }
                        }
                    }
                }
            }
        }
    }
    return total;
}



export const levelTwo = ({ input, lines }) => {
    // your code here
};
