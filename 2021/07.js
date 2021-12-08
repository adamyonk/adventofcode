#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(2021, 7))
      .trim()
      .split(",")
      .map((s) => parseInt(s, 10));

    const min = Math.min(...input);
    const max = Math.max(...input);
    const length = max - min;

    const a = Array.from({ length }).map((_, i) => {
      const pos = i + min;
      return input.reduce((acc, val) => {
        acc += Math.abs(val - pos);
        return acc;
      }, 0);
    });
    console.log("part 1:", Math.min(...a));

    const b = Array.from({ length }).map((_, i) => {
      const pos = i + min;
      return input.reduce((acc, val) => {
        const dist = Math.abs(val - pos);
        const out = Array.from({ length: dist }).reduce((_acc, _, i) => {
          _acc += i + 1;
          return _acc;
        }, 0);
        acc += out;
        return acc;
      }, 0);
    });
    console.log("part 2:", Math.min(...b));
  } catch (e) {
    console.log(e);
  }
})();
