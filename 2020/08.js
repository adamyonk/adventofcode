#!/usr/bin/env node --no-warnings
import {getInput} from "./fetchAOC.js";

const TEST = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

(async () => {
  try {
    const input = (await getInput(8))

    function parse(string) {
      return string.trim().split('\n').map(i => i.split(' '))
    }

    function stringify(prg) {
      return prg.map(i => i.join(' ')).join('\n')
    }

    function run(prg, allowLoop = false) {
      prg = parse(prg);
      const commands = []
      let exit = null;
      let acc = 0;
      let pos = 0;
      while (!exit) {
        if (!allowLoop && commands.includes(pos)) {
          exit = 'Infinite loop';
          continue;
        }
        commands.push(pos);
        let [command, val] = prg[pos];
        val = parseFloat(val);
        switch (command) {
          case 'nop':
            pos++;
            break;
          case 'acc':
            acc += val;
            pos++;
            break;
          case 'jmp':
            pos += val;
            break;
          default:
            exit = 'Command not found'
        }
        if (pos >= prg.length) {
          exit = 'End of file'
        }
      }
      return [pos, acc, exit]
    }

    console.log("part 1:", run(input)[1]);

    const out = [];
    parse(input).forEach(([command], i) => {
      const alt = parse(input);
      let result;

      if (command === 'nop') {
        alt[i][0] = 'jmp';
        result = run(stringify(alt));
      } else if (command === 'jmp') {
        alt[i][0] = 'nop';
        result = run(stringify(alt));
      }

      if (result) {
        out.push(result);
      }
    })
    console.log("part 2:", out
      .filter(i => i.includes('End of file'))[0][1]
    );
  } catch (e) {
    console.log(e);
  }
})();
