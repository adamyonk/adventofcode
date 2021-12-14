#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const OPEN = /[<\{\(\[]/;
const CLOSE = /[>\}\)\]]/;
const ERROR_POINTS = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
const FIX_POINTS = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
const PAIRS = {
  "(": ")",
  "{": "}",
  "[": "]",
  "<": ">",
  ")": "(",
  "}": "{",
  "]": "[",
  ">": "<",
};

const complete = (line, buffer) => {
  return [...buffer]
    .reverse()
    .map((char) => PAIRS[char])
    .reduce((acc, char) => {
      acc = acc * 5 + FIX_POINTS[char];
      return acc;
    }, 0);
};

const validateLines = (lines) => {
  const errors = [];
  line: for (let line = 0; line < lines.length; line++) {
    const buffer = [];
    const string = lines[line];
    col: for (let col = 0; col < string.length; col++) {
      const char = string[col];
      if (char.match(OPEN)) {
        buffer.push(char);
      }
      if (char.match(CLOSE)) {
        const last = buffer.slice(-1)[0];
        const expect = PAIRS[last];
        if (char === expect) {
          buffer.pop();
        } else {
          const error = new Error(
            `${char} not a match for ${last}, expected ${expect}.`
          );
          error.name = "Illegal character";
          error.lineNumber = line;
          error.columnNumber = col;
          error.char = char;
          errors.push(error);
          col = string.length;
          continue line;
        }
      }
    }
    if (buffer.length !== 0) {
      const error = new Error(`${string}.`);
      error.name = "Incomplete line";
      error.line = string;
      error.buffer = buffer;
      error.lineNumber = line;
      errors.push(error);
    }
  }

  return errors;
};

(async () => {
  try {
    const input = (await getInput(2021, 10)).trim().split("\n");
    // const input = `
// [({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]
// `
    //   .trim()
    //   .split("\n");

    console.log(
      "part 1:",
      validateLines(input).reduce((acc, e) => {
        if (e.name === "Illegal character") {
          acc += ERROR_POINTS[e.char];
        }
        return acc;
      }, 0)
    );
    const scores = validateLines(input)
      .reduce((acc, e) => {
        if (e.name === "Incomplete line") {
          acc.push(complete(e.line, e.buffer));
        }
        return acc;
      }, [])
      .sort((a, b) => b - a);

    console.log("part 2:", scores[Math.floor(scores.length / 2)]);
  } catch (e) {
    console.log(e);
  }
})();
