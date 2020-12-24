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

const neighbours = [
  [0.5, 0.5],
  [0.5, -0.5],
  [1, 0],
  [-0.5, 0.5],
  [-0.5, -0.5],
  [-1, 0],
];
const getNeighbourKeys = (x, y) =>
  neighbours.map(([xx, yy]) => [Number(x) + xx, Number(y) + yy].join(";"));

const shouldFlip = (key, tileMap) => {
  const [x, y] = key.split(";");
  const isPainted = Boolean(tileMap[key]);
  const neighbourKeys = getNeighbourKeys(x, y);
  const paintedNeighbours = neighbourKeys.reduce((accum, k) => {
    return tileMap[k] ? accum + 1 : accum;
  }, 0);

  if (isPainted) {
    return paintedNeighbours === 0 || paintedNeighbours > 2;
  } else {
    return paintedNeighbours === 2;
  }
};

/**
 * Adds neighbours to black tiles to map
 */
const expandTileMap = (tileMap) => {
  Object.keys(tileMap).forEach((k) => {
    if (!tileMap[k]) {
      return;
    }
    const [x, y] = k.split(";");
    const neighbourKeys = getNeighbourKeys(x, y);
    neighbourKeys.forEach((nk) => {
      if (typeof tileMap[nk] === "undefined") {
        tileMap[nk] = false;
      }
    });
  });
};

const iterate = (tileMap) => {
  expandTileMap(tileMap);
  const toFlip = Object.keys(tileMap).filter((k) => shouldFlip(k, tileMap));
  toFlip.forEach((k) => {
    tileMap[k] = !tileMap[k];
  });
};

const getPainted = (tileMap) =>
  Object.keys(tileMap).reduce((accum, k) => {
    return Boolean(tileMap[k]) ? accum + 1 : accum;
  }, 0);

const main = async () => {
  const input = await readAll();
  const tileMap = {};
  input.forEach((line) => {
    const moves = parseLine(line);
    const target = moves.reduce(reduceMove, {x: 0, y: 0});
    const key = `${target.x};${target.y}`;
    tileMap[key] = !tileMap[key];
  });

  for (let i = 0; i < 100; i++) {
    console.log({
      iteration: i,
      n: Object.keys(tileMap).length,
      painted: getPainted(tileMap),
    });
    iterate(tileMap);
  }

  const answer = getPainted(tileMap);
  console.log(answer);
};

main();
