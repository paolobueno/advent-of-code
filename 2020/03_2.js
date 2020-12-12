const {readAll} = require("./util");

const main = async () => {
  const input = await readAll();
  const height = input.length;
  const width = input[0].length;
  let xs = [0, 0, 0, 0, 0];
  const increments = [1, 3, 5, 7, 0.5];
  let counts = [0, 0, 0, 0, 0];
  for (let y = 0; y < height; y++) {
    const mod = xs.map((x) => x % width);
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i];
      if (!mod[i] === Math.ceil(mod[i])) {
        continue;
      }
      if (input[y][mod[i]] === "#") {
        counts[i]++;
      }
    }
    xs = xs.map((x, i) => (x += increments[i]));
  }
  console.log(
    counts,
    counts.reduce((accum, c) => accum * c, 1),
  );
};

main();
