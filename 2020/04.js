#!/usr/bin/env node --no-warnings
import { getInput } from "./fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(4)).trim().split('\n\n').map(s => {
      return s.replaceAll('\n', ' ').split(/ +/).reduce((a,v) => {
        const [key, val] = v.split(':')
        a[key] = val
        return a
      }, {})
    });

    const fields = [
      'byr', // (Birth Year)
      'iyr', // (Issue Year)
      'eyr', // (Expiration Year)
      'hgt', // (Height)
      'hcl', // (Hair Color)
      'ecl', // (Eye Color)
      'pid', // (Passport ID)
      // 'cid', // (Country ID)
    ];

    function valid1(i) {
      if (!fields.every(f => i.hasOwnProperty(f))) {
        return false
      }
      return true
    }

    function valid2(i) {
      // console.log(i)
      if (!fields.every(f => i.hasOwnProperty(f))) {
        // console.log('fields')
        return false
      }

      try {
        const byr = parseFloat(i.byr)
        if (byr < 1920 || byr > 2002) {
          // console.log('byr')
          return false;
        }

        const iyr = parseFloat(i.iyr)
        if (iyr < 2010 || iyr > 2020) {
          // console.log('iyr')
          return false;
        }

        const eyr = parseFloat(i.eyr)
        if (eyr < 2020 || eyr > 2030) {
          // console.log('eyr')
          return false;
        }

        const hgt = i.hgt.match(/(?<val>\d+)(?<unit>cm|in)/);
        if (!hgt) {
          {/* console.log('hgt', hgt) */}
          return false;
        }
        const hgt_val = parseFloat(hgt.groups.val);
        switch (hgt.groups.unit) {
          case 'in':
            if (hgt_val < 59 || hgt_val > 76) {
              // console.log('hgt in')
              return false
            }
            break;
          case 'cm':
            {/* console.log('hgt cm') */}
            if (hgt_val < 150 || hgt_val > 193) {
              return false
            }
            break;
          default:
            {/* console.log('hgt invalid') */}
            return false
        }

        const hcl = i.hcl.match(/^#[0-9a-f]{6}$/);
        if (!hcl) {
          {/* console.log('hcl') */}
          return false;
        }

        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(i.ecl)) {
          {/* console.log('ecl') */}
          return false;
        }

        const pid = i.pid.match(/^[0-9]{9}$/);
        if (!pid) {
          {/* console.log('pid') */}
          return false;
        }
      } catch (e) {
        return false;
      }

      return true;
    }

    console.log("part 1:", input.filter(i => valid1(i)).length);
    console.log("part 2:", input.filter(i => valid2(i)).length);
  } catch (e) {
    console.log(e);
  }
})();
