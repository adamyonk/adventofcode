#!/usr/bin/env node --no-warnings
import {getInput} from "./fetchAOC.js";
import {inspect} from 'util';

const TEST = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const TESTB = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

(async () => {
  try {
    const BAG = 'shiny gold';
    const input = (await getInput(7))
    // const input = (TEST)
    // const input = (TESTB)
      .trim()
      .split('\n')
      .reduce((a, v) => {
        const {bag, children} = v.match(/(?<bag>.*) bags contain (?<children>.*)\./).groups
        a[bag] = children.split(', ').reduce((a, v) => {
          if (v === 'no other bags') {
            a = null
          } else {
            const {bag, count} = v.match(/(?<count>\d+) (?<bag>.*) bags?/).groups
            a.push([parseFloat(count), bag])
          }
          return a
        }, [])
        return a;
      }, {});

    const matches = {}
    const totals = {}

    function walkTree(bag, depth = 0, top = '', count = 1, multiplier = 1) {
      if (!depth) {top = bag}
      const children = input[bag]

      // Count the gold bags
      if (bag === BAG) {
        matches[top] = matches[top] || 0;
        matches[top] = matches[top] + count;
      }

      if (children) {
        for (const [_count, child] of children) {
          walkTree(child, depth + 1, top, _count, multiplier * _count)
          totals[top] = totals[top] || 0;
          totals[top] = totals[top] + multiplier * _count;
        }
      }
    }

    Object.keys(input).map(i => walkTree(i));
    console.log("part 1:", Object.keys(matches).filter(i => i !== BAG).length);
    console.log("part 2:", totals[BAG]);
  } catch (e) {
    console.log(e);
  }
})();
