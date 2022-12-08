import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = (await file(inputPath).text()).trimEnd().split("\n");
// const input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`
//   .trimEnd()
//   .split("\n");

const list = input.reduce(
  (acc, line) => {
    const args = line.split(" ");
    const path = acc.cwd.join("/");
    switch (args[0]) {
      case "$":
        switch (args[1]) {
          case "cd":
            switch (args[2]) {
              case "/":
                acc.cwd = [];
                break;
              case "..":
                acc.cwd.pop();
                break;
              default:
                acc.cwd.push(args[2]);
                break;
            }
            break;
          case "ls":
            break;
        }
        break;
      case "dir":
        acc.dirs.push(`${path ? "/" : ""}${path}/${args[1]}`);
        break;
      default: // files
        acc.files.push([
          `${path ? "/" : ""}${path}/${args[1]}`,
          Number(args[0]),
        ]);
        break;
    }
    return acc;
  },
  { cwd: [], files: [], dirs: ["/"] }
);

list.dirs = list.dirs.sort((a, b) => a.localeCompare(b));
list.files = list.files.sort((a, b) => a[0].localeCompare(b[0]));

const dirs = list.dirs.reduce((acc, dir) => {
  let size = 0;
  if (acc.has(dir)) {
    size = acc.get(dir);
  }
  list.files.forEach(([file, s]) => {
    if (file.includes(dir)) {
      size += s;
    }
  });
  acc.set(dir, size);
  return acc;
}, new Map());

const part1 = [...dirs]
  .filter(([_, size]) => size <= 100000)
  .reduce((acc, [_, size]) => (acc += size), 0);

console.log(part1);

{
  // First try was to walk the tree upwards from the file, summing sizes
  const _dirs = list.files.reduce((acc, f) => {
    // THIS WAS THE PROBLEM:
    // let dirSize = 0;
    // (Needed to be inside the do{} scope)
    const size = f[1];
    let dir = dirname(f[0]);
    // Work up the tree and assign size
    do {
      let dirSize = 0;
      if (acc.has(dir)) {
        dirSize = acc.get(dir);
      }
      dirSize += size;
      acc.set(dir, dirSize);
      dir = dirname(dir);
    } while (dir !== "C:\\");
    return acc;
  }, new Map());

  const _part1 = [..._dirs]
    .filter(([_, size]) => size <= 100000)
    .reduce((acc, [_, size]) => (acc += size), 0);

  console.log(_part1);
}

const total = 70000000;
const needed = 30000000;
const available = total - dirs.get("/");
const remove = needed - available;

const part2 = [...dirs]
  .sort((a, b) => a[1] - b[1])
  .find((d) => d[1] > remove)[1];

console.log(part2);
console.log();
