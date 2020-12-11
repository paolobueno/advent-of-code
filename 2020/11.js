const {readAll} = require("./util");
/**
 * @param {number} x
 * @param {number} y
 * @param {string[][]} board
 */
const nextState = (x, y, board) => {
  const seat = board[y][x];
  if (seat === ".") {
    return [seat, false];
  }
  const height = board.length;
  const width = board[0].length;
  let occupied = 0;
  const [minX, maxX] = [Math.max(0, x - 1), Math.min(x + 1, width - 1)];
  const [minY, maxY] = [Math.max(0, y - 1), Math.min(y + 1, height - 1)];
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (j === y && i === x) {
        continue;
      }
      if (!board[j]) {
        console.log({board, row: board[j], i, j});
      }
      const neighbour = board[j][i];
      if (neighbour === "#") {
        occupied++;
      }
    }
  }

  if (seat === "L") {
    if (occupied === 0) {
      return ["#", true];
    } else {
      return [seat, false];
    }
  }

  if (seat === "#") {
    if (occupied >= 4) {
      return ["L", true];
    } else {
      return [seat, false];
    }
  }
};

/**
 * @param {string[][]} board
 */
const countOccupied = (board) =>
  board.reduce(
    (accum, row) =>
      row.reduce((accum2, seat) => (seat === "#" ? accum2 + 1 : accum2), accum),
    0,
  );

/**
 * @param {string[][]} board
 */
const iterate = (board) => {
  const res = board.map((row) => [...row]);
  let dirty = false;
  const height = board.length;
  const width = board[0].length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [seat, hasChanged] = nextState(x, y, board);
      if (hasChanged) {
        dirty = true;
      }
      res[y][x] = seat;
    }
  }
  return [res, dirty];
};

const main = async () => {
  const input = await readAll();
  const board = input.map((line) => [...line]);
  let iterations = 0;

  let [next, dirty] = iterate(board);
  iterations++;
  console.log({
    dirty,
    height: next.length,
    width: next[0].length,
    occ: countOccupied(next),
    iterations,
  });
  while (dirty) {
    [next, dirty] = iterate(next);
    iterations++;
  }
  console.log({board, next, dirty, occ: countOccupied(next), iterations});
};

main();
