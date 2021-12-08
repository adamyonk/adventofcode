#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(2021, 2))
      .trim()
      .split("\n")
      .map((d) =>
        d.split(" ").map((i) => (isNaN(parseInt(i)) ? i : parseInt(i)))
      );

    const a = input.reduce(
      (acc, val) => {
        const [dir, dist] = val;
        switch (dir) {
          case "up":
            acc.y -= dist;
            break;
          case "down":
            acc.y += dist;
            break;
          case "forward":
            acc.x += dist;
            break;
        }
        return acc;
      },
      { x: 0, y: 0 }
    );
    console.log("part 1:", a.x * a.y);

    const b = input.reduce(
      (acc, val) => {
        const [dir, dist] = val;
        switch (dir) {
          case "up":
            acc.aim -= dist;
            break;
          case "down":
            acc.aim += dist;
            break;
          case "forward":
            acc.x += dist;
            acc.y += dist * acc.aim;
            break;
        }
        return acc;
      },
      { x: 0, y: 0, aim: 0 }
    );
    console.log("part 2:", b.x * b.y);
  } catch (e) {
    console.log(e);
  }
})();
