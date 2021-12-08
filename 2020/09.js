#!/usr/bin/env node --no-warnings
import {getInput} from "./fetchAOC.js";

const TEST = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

(async () => {
  try {
    const input = parse(await getInput(9));

    function parse(input) {
      return input.trim().split('\n').map(i => parseInt(i));
    }

    function sum(array) {
      return array.reduce((a, v) => (a += v, a), 0)
    }

    function sums(array) {
      return array.reduce((a, v, i) => {
        const rest = array.slice(i + 1)
        for (const b of rest) {
          a.push(sum([v, b]))
        }
        return a
      }, [])
    }

    function conSums(array) {
      return array.reduce((a, _v, i) => {
        const rest = array.slice(i)
        a = a.concat(rest.reduce((a, _v, i) => {
          const set = rest.slice(0, i);
          a.push([sum(set), set]);
          return a;
        }, []));
        return a;
      }, []);
    }

    function run(input) {
      const anomalies = [];
      for (let i = 25; i < input.length; i++) {
        if (!sums(input.slice(i - 25, i)).includes(input[i])) {
          anomalies.push(input[i])
        }
      }
      return anomalies;
    }
    const a = run(input)

    function run2(input) {
      const sums = conSums(input)
      const range = sums.filter(([sum]) => {
        return a.includes(sum)
      })[0][1];
      console.log(range)
      return sum([Math.min(...range), Math.max(...range)])
    }
    const b = run2(input);

    console.log('part 1:', a[0]);
    console.log("part 2:", b);
  } catch (e) {
    console.log(e);
  }
})();
