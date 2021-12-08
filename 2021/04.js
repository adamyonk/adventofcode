#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

const ROW = 5;

const rows = (board) => {
  const rows = [];
  for (let i = 0; i < board.length; i += ROW) {
    rows.push(board.slice(i, i + ROW));
  }
  return rows;
};

const columns = (board) => {
  const columns = [];
  for (let i = 0; i < ROW; i++) {
    columns.push([]);
    for (let _i = 0; _i < ROW; _i++) {
      columns[i].push(board[i + _i * ROW]);
    }
  }
  return columns;
};

const bingo = (arrays) => {
  return arrays.some((array) => array.every((number) => number.includes("x")));
};

const winningBoard = (board) => {
  return bingo(columns(board)) || bingo(rows(board));
};

const score = (board) => {
  return board
    .filter((number) => !number.includes("x"))
    .map((number) => parseInt(number, 10))
    .reduce((acc, val) => (acc += val), 0);
};

(async () => {
  try {
    const input = (await getInput(2021, 4)).trim().split("\n\n");
    let [draws, ...boards] = input;
    draws = draws.split(",");
    boards = boards.map((board) =>
      board.split("\n").join(" ").trim().split(/\W+/)
    );

    let winners = [];

    draws.forEach((draw) => {
      boards = boards.map((board, i) => {
        const next = board.map((number) => {
          if (draw === number) {
            return `x${number}`;
          }
          return number;
        });
        if (winningBoard(next) && !winners.find(board => board.index === i)) {
          winners.push({ index: i, score: score(next) * draw });
        }
        return next;
      });
    });
    console.log(winners);
    console.log("part 1:", winners[0].score);
    console.log("part 1:", [...winners].reverse()[0].score);

    // console.log("part 1:", input);
    // console.log("part 2:", input);
  } catch (e) {
    console.log(e);
  }
})();
