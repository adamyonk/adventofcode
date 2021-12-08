#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const age = (n) => (n === 0 ? 6 : n - 1);

const addToMapKey = (map, key, val) => {
  if (map.has(key)) {
    map.set(key, map.get(key) + val);
  } else {
    map.set(key, val);
  }
};

(async () => {
  try {
    const input = (await getInput(2021, 6))
      .trim()
      .split(",")
      .map((d) => parseInt(d, 10));

    let fish = [...input];
    for (let day = 0; day < 80; day++) {
      const next = [];
      fish.forEach((f) => f === 0 && next.push(8));
      fish = fish.map(age);
      fish = fish.concat(next);
    }
    console.log("part 1:", fish.length);

    fish = [...input];
    // for (let day = 0; day < 256; day++) {
    //   fish = fish.flatMap((n) => (n === 0 ? [6, 8] : [n - 1]));
    // }

    // for (let day = 0; day < 256; day++) {
    //   for (let i = fish.length; i > 0; i--) {
    //     if (fish[i] === 0) {
    //       fish.splice(i, 1, 6);
    //       fish.push(8);
    //     } else {
    //       fish.splice(i, 1, fish[i] - 1);
    //     }
    //   }
    // }
    fish = fish.reduce((acc, val) => {
      addToMapKey(acc, val, 1);
      return acc;
    }, new Map());

    for (let day = 0; day < 256; day++) {
      const next = new Map();
      fish.forEach((val, key) => {
        if (key === 0) {
          addToMapKey(next, 6, val);
          addToMapKey(next, 8, val);
        } else {
          addToMapKey(next, key - 1, val);
        }
      });
      fish = next;
    }
    console.log("part 2:", [...fish.values()].reduce((acc, val) => acc += val, 0));
  } catch (e) {
    console.log(e);
  }
})();
