#!/usr/bin/env node --no-warnings
import {getInput} from "./fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(1))
      .trim()
      .split("\n")
      .map(m => parseFloat(m));

    const key = 2020;

    let output;

    input.every((a, i) => {
      input.every((b, _i) => {
        const s = new Set([i, _i])
        if (s.size === 2 && a + b === key) {
          output = a * b;
          return false
        }
        return true
      })
      return true;
    })

    console.log('part one:', output)

    input.every((a, i) => {
      input.every((b, _i) => {
        input.every((c, __i) => {
          const s = new Set([i, _i, __i])
          if (s.size === 3 && a + b + c === key) {
            output = a * b * c;
            return false
          }
          return true
        })
        return true;
      })
      return true;
    })

    console.log('part two:', output)

  } catch (e) {
    console.log(e);
  }
})();
