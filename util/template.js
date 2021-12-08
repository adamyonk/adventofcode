#!/usr/bin/env node --no-warnings
import { getInput } from "../util/fetchAOC.js";

(async () => {
  try {
    const input = (await getInput(2021, 1)).trim();

    console.log("part 1:", input);
    // console.log("part 2:", input);
  } catch (e) {
    console.log(e);
  }
})();
