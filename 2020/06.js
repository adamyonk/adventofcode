#!/usr/bin/env node --no-warnings
import { getInput } from "./fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(6)).trim().split('\n\n');

    console.log("part 1:", input
      .map(g => {
        const people = g.split('\n').map(p => {
          return p.split('');
        })
        return new Set(people.flat())
      })
      .reduce((a,v) => {
        a = a+v.size
        return a
      }, 0)
    )
    console.log("part 2:", input
      .map(g => g.split('\n').map(p => p.split('')))
      .map(intersection)
      .reduce((a,v) => {
        a = a+v.size
        return a
      }, 0)
    )
  } catch (e) {
    console.log(e);
  }
})();

function intersection(array) {
  const x = new Set();
  for (const a of array) {
    for (const i of a) {
      if (array.every(_a => _a.includes(i))) {
        x.add(i)
      }
    }
  }
  return x
}
