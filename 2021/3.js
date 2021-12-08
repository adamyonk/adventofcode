#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const countBitPositions = (input, pos) => {
  return input.reduce(
    (acc, val) => {
      if (val[pos] === "0") {
        acc["0"]++;
      } else {
        acc["1"]++;
      }
      return acc;
    },
    { 0: 0, 1: 0 }
  );
};


(async () => {
  try {
    const input = (await getInput(2021, 3)).trim().split("\n");
    const len = Array.from({ length: input[0].length })

    let gamma = "";
    let epsilon = "";

    len.forEach((_, i) => {
      const bits = countBitPositions(input, i);

      if (bits["0"] > bits["1"]) {
        gamma += "0";
        epsilon += "1";
      } else {
        gamma += "1";
        epsilon += "0";
      }
    });
    const a = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log('part 1:', a); // 2743844

    const o2 = len.reduce(
      (acc, _, i) => {
        if (acc.length === 1) {
          return acc;
        }
        const bits = countBitPositions(acc, i);
        return acc.filter((v) => {
          if (bits["0"] > bits["1"]) {
            return v[i] === "0";
          } else {
            return v[i] === "1";
          }
        });
      },
      [...input]
    )[0];

    const co2 = len.reduce(
      (acc, _, i) => {
        if (acc.length === 1) {
          return acc;
        }
        const bits = countBitPositions(acc, i);
        return acc.filter((v) => {
          if (bits["1"] < bits["0"]) {
            return v[i] === "1";
          } else {
            return v[i] === "0";
          }
        });
      },
      [...input]
    )[0];
    // console.log(o2);
    // console.log(co2);
    const b = parseInt(o2, 2) * parseInt(co2, 2);
    console.log('part 2:', b); // 2737342
    // console.log("part 2:", input);
  } catch (e) {
    console.log(e);
  }
})();
