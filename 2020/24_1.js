const {readAll} = require("./util");

/**
 * @param {string} line
 */
const parseLine = (line) => {
  const res = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "n" || char === "s") {
      res.push(char + line[++i]);
    } else {
      res.push(char);
    }
  }
  return res;
};

/**
 * @param {{x: number, y:number}} coords
 * @param {string} move
 */
const reduceMove = (coords, move) => {
  switch (move) {
    case "ne":
      return {x: coords.x + 0.5, y: coords.y + 0.5};
    case "se":
      return {x: coords.x + 0.5, y: coords.y - 0.5};
    case "e":
      return {x: coords.x + 1, y: coords.y};
    case "nw":
      return {x: coords.x - 0.5, y: coords.y + 0.5};
    case "sw":
      return {x: coords.x - 0.5, y: coords.y - 0.5};
    case "w":
      return {x: coords.x - 1, y: coords.y};
  }
};

const main = async () => {
  const input = await readAll();
  const painted = {};
  input.forEach((line) => {
    const moves = parseLine(line);
    const target = moves.reduce(reduceMove, {x: 0, y: 0});
    const key = `${target.x};${target.y}`;
    painted[key] = !painted[key];
  });
  const answer = Object.keys(painted).reduce((accum, k) => {
    return Boolean(painted[k]) ? accum + 1 : accum;
  }, 0);
  console.log(answer);
};

main();
