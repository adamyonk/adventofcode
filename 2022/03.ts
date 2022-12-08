import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

function pritoriyForChar(string: string) {
  const code = string.charCodeAt(0);
  // uppercase
  if (code >= 65 && code <= 90) {
    return code - 38;
  }
  // lowercase
  if (code >= 97 && code <= 122) {
    return code - 96;
  }
  // out of range
  throw new Error("Char out of range");
}

function intersection(sets: Set<any>[]): Set<any> {
  return sets.reduce(function (a, b) {
    const int = new Set();
    const all = new Set([...b, ...a]);
    for (const i of all) {
      if (a.has(i) && b.has(i)) {
        int.add(i);
      }
    }
    return int;
  }, sets[0]);
}

function findCommonChar(strings: string[]) {
  return Array.from(
    intersection(strings.map((string) => new Set(string.split(""))))
  )[0];
}

function priorityForGroups(groups: string[][]) {
  return (
    groups
      // Find the shared item
      .map(function (g) {
        const item = findCommonChar(g);
        const priority = pritoriyForChar(item);
        return priority;
      })
      // Sum
      .reduce((a, v) => (a += v), 0)
  );
}

const input = await file(inputPath).text();

const bags = input.trim().split("\n");

const byFrontBack = bags
  // Split into front/back groups
  .map(function (bag) {
    const front = bag.slice(0, bag.length / 2);
    const back = bag.slice(bag.length / 2, bag.length);
    return [front, back];
  });
console.log(priorityForGroups(byFrontBack));

// Split into groups of 3
const byTeam = bags.reduce<typeof bags[]>(
  function (a, v) {
    let group = a[a.length - 1];
    if (group.length === 3) {
      group = [];
      a.push(group);
    }
    group.push(v);
    return a;
  },
  [[]]
);

console.log(priorityForGroups(byTeam));
