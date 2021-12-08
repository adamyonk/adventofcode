#!/usr/bin/env node --no-warnings
import { getInput } from "./fetchAOC.js";

const OPEN = ".";
const TREE = "#";
const BREADCRUMB_OPEN = 'O';
const BREADCRUMB_TREE = 'X';

(async () => {
  try {
    const input = (await getInput(3)).trim();

    function run(movement = {x:3,y:1}) {
      const i = input.split('\n').map(s => s.split(''));
      const MAX_Y = i.length - 1
      const MAX_X = i[0].length - 1
      const p = {x:0,y:0};

      function advance(n=1) {
        p.x = p.x+(movement.x*n)
        if (p.x > MAX_X) {
          p.x = p.x - MAX_X - 1
        }

        p.y = p.y+(movement.y*n)
        if (p.y > MAX_Y) {
          throw new Error("You're out of range")
        }
      }

      function stringify() {
        return i.map(a => a.join('')).join('\n')
      }

      function count() {
        const s = stringify();
        return {
          [BREADCRUMB_OPEN]: s.match(new RegExp(BREADCRUMB_OPEN, 'g')).length,
          [BREADCRUMB_TREE]: s.match(new RegExp(BREADCRUMB_TREE, 'g')).length,
        }
      }

      while (p.y < i.length - 1) {
        advance()

        if (i[p.y][p.x] === OPEN) {
          i[p.y][p.x] = BREADCRUMB_OPEN;
        }
        else {
          i[p.y][p.x] = BREADCRUMB_TREE;
        }
      }

      return count()
    }

    console.log("part 1:", run()[BREADCRUMB_TREE]);
    const set = [
      {x: 1, y: 1},
      {x: 3, y: 1},
      {x: 5, y: 1},
      {x: 7, y: 1},
      {x: 1, y: 2},
    ]
    console.log("part 2:",
      set.map(m => run(m)).reduce((a,v) => {
        a = a * v[BREADCRUMB_TREE]
        return a
      }, 1)
    );
  } catch (e) {
    console.log(e);
  }
})();
