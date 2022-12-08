import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = await file(inputPath).text();

const elves = input
  .split("\n\n")
  .map((e) =>
    e
      .split("\n")
      .map((d) => Number(d))
      .reduce((a, v) => (a += v), 0)
  )
  .sort((a, b) => b - a);
console.log(elves[0]);
console.log(elves.slice(0, 3).reduce((a, v) => (a += v), 0));
