#!/usr/bin/env node --no-warnings
import { getInput } from "./fetchAOC.js";

(async () => {
  try {
    const ROWS = Array.from(Array(128).keys());
    const COLS = Array.from(Array(8).keys());

    function halve(a, d) {
      const half = a.length / 2;
      switch (d) {
        case 'F':
        case 'L':
          return a.slice(0,half);
        case 'B':
        case 'R':
          return a.slice(-half);
      }
    }

    function parseColumn(s) {
      s = s.slice(7,10)
      let cols = [...COLS]
      for (const d of s) {
        cols = halve(cols,d);
      }
      return cols[0]
    }

    function parseRow(s) {
      s = s.slice(0,7)
      let rows = [...ROWS]
      for (const d of s) {
        rows = halve(rows,d);
      }
      return rows[0]
    }

    function parseId(s) {
      const c = parseRow(s)
      const r = parseColumn(s)
      return c * 8 + r
    }

    function difference(setA, setB) {
      let _difference = new Set(setA)
      for (let elem of setB) {
        _difference.delete(elem)
      }
      return _difference
    }

    const input = (await getInput(5))
      .trim()
      .split('\n')
      .map(s => {
        return { s, col: parseColumn(s), row: parseRow(s), id: parseId(s) }
      });

    // const min = parseId('FFFFFFFLLL')
    // const max = parseId('BBBBBBBRRR')
    const ids = input.map(i => i.id)
    const min = Math.min(...ids)
    const max = Math.max(...ids)
    const range = Array.from(new Array(max-min), (x, i) => i + min);

    console.log("part 1:", max);
    console.log("part 2:", [...difference(range, ids)][0]);
  } catch (e) {
    console.log(e);
  }
})();
