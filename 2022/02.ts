import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = await file(inputPath).text();
// const input = `A Y
// B X
// C Z`;

const moves = {
  A: 1,
  B: 2,
  C: 3,

  X: 1,
  Y: 2,
  Z: 3,
} as const;

const games = input
  .trim()
  .split("\n")
  .map((game) => game.split(" "));

console.log(
  games.reduce((acc, game) => {
    const a = moves[game[0]];
    const b = moves[game[1]];
    acc += b;
    switch (a) {
      case 1:
        acc += b === 3 ? 0 : b === 1 ? 3 : 6;
        break;
      case 2:
        acc += b === 1 ? 0 : b === 2 ? 3 : 6;
        break;
      case 3:
        acc += b === 2 ? 0 : b === 3 ? 3 : 6;
        break;
    }

    return acc;
  }, 0)
);

console.log(
  games.reduce((acc, game) => {
    const a = moves[game[0]];
    const b = moves[game[1]];

    switch (a) {
      case 1:
        acc += b === 1 ? 3 : b === 2 ? 4 : 8;
        break;
      case 2:
        acc += b === 1 ? 1 : b === 2 ? 5 : 9;
        break;
      case 3:
        acc += b === 1 ? 2 : b === 2 ? 6 : 7;
        break;
    }

    return acc;
  }, 0)
);
