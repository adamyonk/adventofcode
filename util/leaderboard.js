#!/usr/bin/env node --no-warnings
import chalk from "chalk";
import { fetchAOC } from "./fetchAOC.js";

const gold = chalk.hex("#ffff66");
const silver = chalk.hex("#9999cc");
const grey = chalk.grey.dim;
const pink = chalk.hex("#f36");
const cal = Array.from({ length: 25 });

const est = () => {
  const date = new Date();
  const now_etc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours() - 5,
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(now_etc);
};

const daysAvailable = est().getUTCDate();
const leaderboards = [
  { id: "449091", name: "Personal" },
  { id: "631229", name: "Jeli" },
  { id: "240455", name: "InVision" },
];

(async () => {
  Promise.all(
    leaderboards.map(async (leaderboard) => {
      const response = await fetchAOC(
        `https://adventofcode.com/2021/leaderboard/private/view/${leaderboard.id}.json`
      );
      const json = await response.json();
      const members = Object.values(json.members).sort(
        (a, b) => b.local_score - a.local_score
      );

      console.log(pink(`\n\n${leaderboard.name} Leaderboard`));

      const maxRank = members.length.toString().length + 1;
      const maxScore = Math.max(
        ...members.map((m) => m.local_score.toString().length)
      );
      // const maxName = Math.max(...members.map((m) => m.name.length));

      console.log(
        grey(
          "".padStart(maxRank + maxScore + 2, " ") +
            cal.map((_, m) => (m + 1 > 19 ? 2 : m + 1 > 9 ? 1 : " ")).join("")
        )
      );
      console.log(
        grey(
          "".padStart(maxRank + maxScore + 2, " ") +
            cal.map((_, m) => (m + 1) % 10).join("")
        )
      );

      members.forEach((m, i) => {
        let rank = `${i + 1})`.padStart(maxRank, " ");
        let score = `${m.local_score}`.padStart(maxScore, " ");
        let days = cal
          .map((_, i) => {
            const day = i + 1;
            if (day > daysAvailable) {
              return " ";
            }
            const level = m.completion_day_level[(i + 1).toString()];
            const color = level
              ? Object.values(level).filter((v) => v.get_star_ts).length === 2
                ? gold
                : silver
              : grey;
            return color("*");
          })
          .join("");

        console.log(`${rank} ${score} ${days}  ${m.name}`);
      });
    })
  );
})();
