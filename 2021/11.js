#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const pl = (input) => {
  const row = Math.sqrt(input.length);
  return input
    .reduce((acc, val, ind) => {
      acc += val.toString();
      if (ind % row === row - 1) {
        acc += "\n";
      }
      return acc;
    }, "")
    .trim();
};

(async () => {
  try {
    let length = 0;
    const input = (await getInput(2021, 11))
      .trim()
      .split("\n")
      .flatMap((l) => {
        length = l.length;
        return l.split("").map((s) => parseInt(s, 10));
      });

    const getAdjacent = (index) => {
      const north = index < length ? undefined : index - length;
      const east = index % length === length - 1 ? undefined : index + 1;
      const south =
        input.length - 1 - index < length ? undefined : index + length;
      const west = index % length === 0 ? undefined : index - 1;

      const northEast =
        north !== undefined && east !== undefined ? north + 1 : undefined;
      const southEast =
        south !== undefined && east !== undefined ? south + 1 : undefined;
      const southWest =
        south !== undefined && west !== undefined ? south - 1 : undefined;
      const northWest =
        north !== undefined && west !== undefined ? north - 1 : undefined;

      return [
        north,
        northEast,
        east,
        southEast,
        south,
        southWest,
        west,
        northWest,
      ];
    };

    const checkValues = (array) => {
      const high = array.reduce((acc, l, i) => {
        if (l > 9 && !array.flashed.includes(i)) {
          acc.push(i);
        }
        return acc;
      }, []);
      for (let i = 0; i < high.length; i++) {
        const index = high[i];
        flash(index, array);
      }
      if (high.length) {
        checkValues(array);
      }
    };

    const flash = (index, array) => {
      array.flashed.push(index);
      array.flashes++;
      const adjacent = getAdjacent(index).filter(
        (i) => i !== undefined && !array.flashed.includes(i)
      );
      for (let i = 0; i < adjacent.length; i++) {
        const ind = adjacent[i];
        const val = array[ind] + 1;
        array[ind] = val;
      }
    };

    let part1 = [...input];
    part1.flashes = 0;

    for (let i = 0; i < 100; i++) {
      part1.flashed = [];
      // Increase all by 1
      part1.forEach((l, i, a) => (a[i] = l + 1));

      checkValues(part1);

      // Reset flashed to 0
      part1.forEach((l, i, a) => {
        if (l > 9) {
          a[i] = 0;
        }
      });
    }
    console.log("part 1:", part1.flashes);

    let part2 = [...input];
    part2.flashes = 0;
    let allFlashed = null;

    for (let i = 0; allFlashed === null; i++) {
      part2.flashed = [];
      // Increase all by 1
      part2.forEach((l, i, a) => (a[i] = l + 1));

      checkValues(part2);
      if (part2.flashed.length === part2.length) {
        allFlashed = i + 1;
      }

      // Reset flashed to 0
      part2.forEach((l, i, a) => {
        if (l > 9) {
          a[i] = 0;
        }
      });
    }
    console.log("part 2:", allFlashed);
  } catch (e) {
    console.log(e);
  }
})();
