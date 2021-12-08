#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

// return 1 if whole subset, return -n for how many missing
const isSubset = (a, b) => {
  const has = a.split("").filter((l) => b.includes(l));
  const diff = has.length === a.length ? 1 : -(a.length - has.length);
  return diff;
};

const decode = (segments) => {
  return segments
    .sort((a, b) => {
      return a.length - b.length;
    })
    .reduce((acc, val) => {
      switch (val.length) {
        case 2: // 1
          acc.set(1, val);
          break;
        case 3: // 7
          acc.set(7, val);
          break;
        case 4: // 4
          acc.set(4, val);
          break;
        case 5: // 2 3 5
          if (isSubset(acc.get(1), val) === 1) {
            acc.set(3, val);
          } else if (isSubset(acc.get(4), val) === -1) {
            acc.set(5, val);
          } else {
            acc.set(2, val);
          }
          break;
        case 6: // 0 6 9
          if (isSubset(acc.get(3), val) === 1) {
            acc.set(9, val);
          } else if (isSubset(acc.get(1), val) === 1) {
            acc.set(0, val);
          } else {
            acc.set(6, val);
          }
          break;
        case 7: // 8
          acc.set(8, val);
          break;
      }
      return acc;
    }, new Map());
};

const parse = (display, segments) => {
  return display.map((digit) => {
    const match = [...segments.entries()].find((segment) =>
      segment.includes(digit)
    );
    return match ? match[0] : digit;
  });
};

(async () => {
  try {
    const input = (await getInput(2021, 8))
      .trim()
      .split("\n")
      .map((l) =>
        l
          .split(" | ")
          .map((s) => s.split(" ").map((s) => s.split("").sort().join("")))
      );

    const displays = input.map(([segments, display]) => {
      return parse(display, decode(segments));
    });

    const pt1 = [8, 7, 4, 1];
    console.log(
      "part 1:",
      displays.reduce((acc, display) => {
        display.forEach((segment) => pt1.includes(segment) && acc++);
        return acc;
      }, 0)
    );
    console.log(
      "part 2:",
      displays
        .map((d) => parseInt(d.join(""), 10))
        .reduce((acc, val) => (acc += val), 0)
    );
  } catch (e) {
    console.log(e);
  }
})();
