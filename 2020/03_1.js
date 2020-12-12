const {readAll} = require("./util");

const main = async () => {
  const input = await readAll();
  const height = input.length;
  const width = input[0].length;
  let x = 0;
  let count = 0;
  for (let y = 0; y < height; y++) {
    const mod = x % width;
    console.log({y, x, mod, width, height});
    if (input[y][mod] === "#") {
      count++;
    }
    x += 3;
  }
  console.log(count);
};

main();
