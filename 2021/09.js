#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    let length = 0;
    // const input = `
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// `
      const input = (await getInput(2021, 9))
      .trim()
      .split("\n")
      .flatMap((l) => {
        length = l.length;
        return l.split("").map((s) => parseInt(s, 10));
      });

    const getAdjacent = (index) => {
      const west = index % length === 0 ? undefined : index - 1;
      const east = index % length === length - 1 ? undefined : index + 1;
      const north = index < length ? undefined : index - length;
      const south = input.length - index < length ? undefined : index + length;

      return [north, east, south, west];
    };

    const lowPoints = input.reduce((acc, val, ind) => {
      const adjacent = getAdjacent(ind);
      if (
        adjacent
          .filter((pos) => pos !== undefined)
          .every((pos) => val < input[pos])
      ) {
        acc.push(ind);
      }

      return acc;
    }, []);
    console.log(
      "part 1:",
      lowPoints.reduce((acc, pos) => (acc += 1 + input[pos]), 0)
    );

    const getBasin = (index, set) => {
      // don't check values already in the set
      if (set.has(index)) {
        return set;
      }

      // 9 doesn't count in the basin
      const val = input[index];
      if (val === 9) {
        return set;
      }

      set.add(index);
      // get adjacent values and check recursively
      getAdjacent(index)
        .filter((pos) => pos !== undefined)
        .filter((pos) => val < input[pos])
        .forEach((pos) => {
          getBasin(pos, set);
        });

      return set;
    };

    const basins = lowPoints
      .reduce((acc, pos) => {
        const basin = getBasin(pos, new Set());
        acc.push(basin);
        return acc;
      }, [])
      .sort((a, b) => b.size - a.size) // sort by size
      .slice(0, 3) // top 3
      .reduce((acc, val) => (acc *= val.size), 1); // multiply

    console.log("part 2:", basins);
  } catch (e) {
    console.log(e);
  }
})();
