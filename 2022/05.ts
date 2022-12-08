import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = (await file(inputPath).text()).trimEnd().split("\n");
const stacks = input
  .slice(0, 8)
  .map((row) =>
    row.match(/...\s?/g).map((crate) => crate.match(/[A-Z]/)?.[0] || null)
  )
  .reverse()
  .reduce<string[][]>((acc, row) => {
    row.forEach((crate, index) => {
      if (!acc[index]) {
        acc[index] = [];
      }
      if (crate) {
        acc[index].push(crate);
      }
    });
    return acc;
  }, []);

const moves = input.slice(10).map((move) => {
  const match = move.match(
    /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/
  );
  // For some reason named capture groups aren't working?
  let [_, count, from, to] = match;
  return { count: Number(count), from: Number(from), to: Number(to) };
});

function handle9000(
  stacks: string[][],
  move: { count: number; from: number; to: number }
) {
  for (let i = move.count; i > 0; i--) {
    stacks[move.to - 1].push(stacks[move.from - 1].pop());
  }
  return stacks;
}

const part1 = moves
  .reduce(
    (acc, move) => handle9000(acc, move),
    JSON.parse(JSON.stringify(stacks)) as typeof stacks
  )
  .map((stack) => stack.pop())
  .join("");

console.log(part1);

function handle9001(
  stacks: string[][],
  move: { count: number; from: number; to: number }
) {
  stacks[move.to - 1].push(
    ...stacks[move.from - 1].splice(-move.count, move.count)
  );
  return stacks;
}

const part2 = moves
  .reduce(
    (acc, move) => handle9001(acc, move),
    JSON.parse(JSON.stringify(stacks)) as typeof stacks
  )
  .map((stack) => stack.pop())
  .join("");

console.log(part2);
