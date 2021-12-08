#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(2021, 1))
      .trim()
      .split("\n")
      .map((d) => parseInt(d));

    const a = input.reduce((acc, val, i, arr) => {
      const prev = arr[i - 1];
      if (prev && prev < val) {
        acc++;
      }
      return acc;
    }, 0);
    console.log("part 1:", a);

    const b = input
      .reduce((acc, val, i) => {
        const [x, y, z] = [val, input[i + 1], input[i + 2]];
        if (x && y && z) {
          acc.push(x + y + z);
        }
        return acc;
      }, [])
      .reduce((acc, val, i, arr) => {
        const prev = arr[i - 1];
        if (prev && prev < val) {
          acc++;
        }
        return acc;
      }, 0);
    console.log("part 2:", b);
  } catch (e) {
    console.log(e);
  }
})();
