#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(2022, 1)).trim();
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
  } catch (e) {
    console.log(e);
  }
})();
