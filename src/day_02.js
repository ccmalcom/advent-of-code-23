/**
 * Contains solutions for Day 2
 * Puzzle Description: https://adventofcode.com/2023/day/2
 */



const isPossible = (games) => {
  const targetCounts = { red: 12, green: 13, blue: 14 };
  let validGames = 0;
  games.forEach((game) => {
    // console.log(game);
    const hands = game.split(';');
    // console.log('hands', hands);
    let isValidGame = true;

    hands.forEach((hand) => {
      const cubeCounts = {
        red: 0,
        green: 0,
        blue: 0,
      };

      hand.match(/\b(\d+)\s*(red|green|blue)\b/g).forEach((str) => {
        const [count, color] = str.split(/\s+/);
        cubeCounts[color] += Number(count);
      });
      console.log('cubeCounts', cubeCounts);

      if (cubeCounts.red > targetCounts.red || cubeCounts.green > targetCounts.green || cubeCounts.blue > targetCounts.blue
      ) {
        isValidGame = false;
      }
    });
    if (isValidGame) {
      const gameId = game.match(/Game (\d+):/)[1];
      validGames += Number(gameId);
    }
  });

  return validGames;
};


export const levelOne = ({ input, lines }) => {
  // your code here
  return isPossible(lines);
};

const lowestPossibleDice = (games) => {
  // const targetCounts = { red: 12, green: 13, blue: 14 };
  let finalCounts = [];
  games.forEach((game) => {
    // console.log(game);
    const hands = game.split(';');
    // console.log('hands', hands);
    const gameCounts = { red:0, green:0, blue:0 };
    hands.forEach((hand) => {
      const handCounts = { red:0, green:0, blue:0 };
      hand.match(/\b(\d+)\s*(red|green|blue)\b/g)
        .forEach((str) => {
          const [count, color] = str.split(/\s+/);
          handCounts[color] += Number(count);
        });
      // console.log('handCounts', handCounts);
        if (gameCounts.red < handCounts.red && handCounts.red != null) {
          gameCounts.red = handCounts.red;
        }
        if (gameCounts.green < handCounts.green && handCounts.green != null) {
          gameCounts.green = handCounts.green;
        }
        if (gameCounts.blue < handCounts.blue && handCounts.blue != null) {
          gameCounts.blue = handCounts.blue;
        }
      });
      // console.log('#########gameCounts', gameCounts);
      finalCounts.push(gameCounts);
    });
    return finalCounts;
};


//For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
export const levelTwo = ({ input, lines }) => {
  // your code here
  let powerArray = [];
  lowestPossibleDice(lines).forEach((set) => {
    powerArray.push(set.red * set.green * set.blue);
  });

  powerArray = powerArray.reduce((a, b) => a + b, 0);
  return powerArray;

};
