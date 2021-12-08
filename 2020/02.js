#!/usr/bin/env node --no-warnings
import {getInput} from "./fetchAOC.js";

function intersection(setA, setB) {
  setA = new Set(setA)
  setB = new Set(setB)
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

function charIndices(char, string) {
  const indices = [];
  let p = 0;
  while (p > -1) {
    const i = string.indexOf(char, p)
    if (i > -1) {
      indices.push(i);
      p = i + 1
    } else {
      p = i
    }
  }
  return indices;
}

function isValid(string) {
  let {min, max, char, pw} = string.match(/(?<min>\d+)-(?<max>\d+) (?<char>.): (?<pw>.*)/).groups
  min = parseInt(min)
  max = parseInt(max)
  let count = pw.match(new RegExp(`${char}`, 'g'))
  count = count ? count.length : 0
  return count <= max && count >= min
}

function isValid2(string) {
  let {a, b, char, pw} = string.match(/(?<a>\d+)-(?<b>\d+) (?<char>.): (?<pw>.*)/).groups
  const positions = [parseInt(a) - 1, parseInt(b) - 1]
  const indices = charIndices(char, pw)
  const match = intersection(positions, indices)
  return match.size === 1
}

(async () => {
  try {
    const input = (await getInput(2))
      .trim()
      .split("\n")

    let output = input.reduce((a, v) => {
      if (isValid(v)) {
        a++;
      }
      return a
    }, 0);

    console.log('part 1', output)

    output = input.reduce((a, v) => {
      if (isValid2(v)) {
        a++;
      }
      return a
    }, 0);

    console.log('part 2', output)

  } catch (e) {
    console.log(e);
  }
})();
