import { basename, dirname, resolve } from "path";
import { file, argv } from "bun";

const path = resolve(argv.at(-1));
const inputPath = `${dirname(path)}/input/${Number(
  basename(path).split(".")[0]
)}.input`;

const input = (await file(inputPath).text()).trimEnd();

for (let i = 0; i < input.length; i++) {
  const seq = input.slice(i, i + 4);
  if (new Set(seq.split("")).size === 4) {
    console.log(i + 4);
    break;
  }
}

for (let i = 0; i < input.length; i++) {
  const seq = input.slice(i, i + 14);
  if (new Set(seq.split("")).size === 14) {
    console.log(i + 14);
    break;
  }
}
