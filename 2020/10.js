#!/usr/bin/env node --no-warnings
import { getInput } from "./fetchAOC.js";

const test = `16
10
15
5
1
11
7
19
6
12
4`;

const test2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

(async () => {
  try {
    function parse(input) {
      return [
        0,
        ...input
          .trim()
          .split("\n")
          .map((i) => parseInt(i))
          .sort((a, b) => a - b),
      ];
    }

    const input = parse(await getInput(10));

    const device = Math.max(...input) + 3;
    const diff = {
      1: 0,
      2: 0,
      3: 0,
    };
    [...input, device].forEach((v, i, a) => {
      const b = a[i + 1];
      if (b) {
        diff[b - v]++;
      }
    });

    console.log("part 1:", diff[1] * diff[3]);

    // parse(test).forEach((v, i, a) => {
    //   const p = [v + 1, v + 2, v + 3].map(i => a.includes(i)).filter(Boolean).length
    //   if (p > 1) {
    //     matrix.push(p);
    //   }
    // })

    function run(input) {
      let matrix = [];
      let val = input[0];
      while (val < input[input.length - 1]) {
        let p = [];
        for (let i = val + 1; input.includes(i); i++) {
          p.push(i);
        }
        if (!p.length) {
          p = [val + 1, val + 2, val + 3].filter((i) => input.includes(i));
        }
        matrix.push(Math.pow(2, p.length - 1));
        val = p[p.length - 1];
      }
      return matrix;
    }

    function combos(matrix) {
      console.log({ matrix });
      // const l = matrix.length
      return matrix.reduce((a, v) => ((a = a * v), a), 1);
    }

    console.log("part 2:", combos(run(parse(test))));
    console.log("part 2:", combos(run(parse(test2))));
    console.log("part 2:", combos(run(input)));
    // 562949953421312 too high
  } catch (e) {
    console.log(e);
  }
})();
