import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = (await file(inputPath).text()).trim();
const test = `
30373
25512
65332
33549
35390`.trim();
const grid = input.split("\n").map((row) => row.split("").map((s) => Number(s)));

const checkVisible = ({ x, y }: { x: number; y: number }) => {
  const height = grid[y][x];
  const yMax = grid.length - 1;
  const xMax = grid[0].length - 1;
  // Is visible if on the grid edge
  if (x === 0 || y === 0 || x === xMax || y === yMax) {
    return true;
  }
  const sightlines: Record<string, number[]> = { n: [], e: [], s: [], w: [] };
  // north
  for (let _y = y - 1; _y >= 0; _y--) {
    const val = grid[_y][x];
    sightlines.n.push(val);
  }
  // east
  for (let _x = x + 1; _x <= xMax; _x++) {
    const val = grid[y][_x];
    sightlines.e.push(val);
  }
  // south
  for (let _y = y + 1; _y <= yMax; _y++) {
    const val = grid[_y][x];
    sightlines.s.push(val);
  }
  // west
  for (let _x = x - 1; _x >= 0; _x--) {
    const val = grid[y][_x];
    sightlines.w.push(val);
  }
  return Object.keys(sightlines)
    .map((dir) => sightlines[dir].every((tree) => tree < height))
    .some((dir) => dir);
};

const visibility = grid.map((row, y) =>
  row.map((_, x) => checkVisible({ x, y }))
);
// for (let y = 0; y < grid.length; y++) {
//   const row = grid[y];
//   for (let x = 0; x < row.length; x++) {
//     const height = grid[y][x];
//     console.log(height, checkVisible({x, y}));
//   }
// }
console.log(visibility.flat().filter((v) => v).length);

const checkScore = ({ x, y }: { x: number; y: number }) => {
  const height = grid[y][x];
  const yMax = grid.length - 1;
  const xMax = grid[0].length - 1;

  const sightlines: Record<string, number> = { n: 0, e: 0, s: 0, w: 0 };
  // north
  for (let _y = y - 1; _y >= 0; _y--) {
    const val = grid[_y][x];
    sightlines.n++;
    if (val >= height) {
      break;
    }
  }
  // east
  for (let _x = x + 1; _x <= xMax; _x++) {
    const val = grid[y][_x];
    sightlines.e++;
    if (val >= height) {
      break;
    }
  }
  // south
  for (let _y = y + 1; _y <= yMax; _y++) {
    const val = grid[_y][x];
    sightlines.s++;
    if (val >= height) {
      break;
    }
  }
  // west
  for (let _x = x - 1; _x >= 0; _x--) {
    const val = grid[y][_x];
    sightlines.w++;
    if (val >= height) {
      break;
    }
  }
  return Object.values(sightlines).reduce((a, v) => (a *= v), 1);
};
const score = grid.map((row, y) => row.map((_, x) => checkScore({x,y}) ))
console.log(Math.max(...score.flat()));
console.log();
