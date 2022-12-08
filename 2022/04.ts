import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = await file(inputPath).text();

const pairs = input.trim().split('\n').map(pair => pair.split(',').map(elf => elf.split('-').map(s => Number(s))))

const contains = pairs.filter(([a, b]) => {
  // a contains b
  if (a[0] <= b[0] && a[1] >= b[1]) {
    return true;
  }
  // b contains a
  if (b[0] <= a[0] && b[1] >= a[1]) {
    return true;
  }
  return false;
})

console.log(contains.length);

const overlap = pairs.filter(([a, b]) => {
  // a contains b
  if (a[0] <= b[0] && a[1] >= b[0]) {
    return true;
  }
  if (b[0] <= a[0] && b[1] >= a[0]) {
    return true;
  }
  return false;
})

console.log(overlap.length);
