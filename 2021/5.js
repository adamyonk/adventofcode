#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const plot = ([[startX, startY], [endX, endY]]) => {
  const run = endX - startX;
  const rise = endY - startY;
  const diff = Math.abs(rise) > Math.abs(run) ? rise : run;
  const out = [];
  for (let i = 0; i <= Math.abs(diff); i++) {
    let _run = Number.isFinite(i / run) ? i / run : 0;
    let _rise = Number.isFinite(i / rise) ? i / rise : 0;
    out.push(
      [
        Math.round(startX + _run * run * Math.sign(run)),
        Math.round(startY + _rise * rise * Math.sign(rise)),
      ].toString()
    );
  }
  return out;
};

const occurrences = (lines) =>
  lines.reduce((acc, val) => {
    val.forEach((coord) => {
      if (acc[coord] === undefined) {
        acc[coord] = 0;
      }
      acc[coord]++;
    });
    return acc;
  }, {});

(async () => {
  try {
    const input = (await getInput(2021, 5))
      .trim()
      .split("\n")
      .map((line) =>
        line
          .split(" -> ")
          .map((point) => point.split(",").map((s) => parseInt(s)))
      );

    // Only horizontal/vertical lines
    const simple = input.filter(([start, end]) => {
      return start[0] === end[0] || start[1] === end[1];
    });

    const simpleLines = Object.entries(occurrences(simple.map(plot))).filter(
      ([_, val]) => val > 1
    );

    const lines = Object.entries(occurrences(input.map(plot))).filter(
      ([_, val]) => val > 1
    );

    console.log("part 1:", simpleLines.length);
    console.log("part 2:", lines.length);
    // console.log("part 2:", input);
  } catch (e) {
    console.log(e);
  }
})();
