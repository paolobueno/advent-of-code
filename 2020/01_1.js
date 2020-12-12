const {readAll} = require("./util");

const TARGET = 2020;

const main = async () => {
  const input = await readAll();
  const numbers = input.map(Number).sort((x, y) => x - y);
  let [bottom, top] = [0, numbers.length - 1];
  while (true) {
    while (numbers[bottom] + numbers[top] > TARGET && top > bottom) {
      top--;
    }
    if (numbers[bottom] + numbers[top] === TARGET) {
      console.log(
        [numbers[bottom], numbers[top]],
        numbers[bottom] * numbers[top],
      );
      return;
    } else {
      bottom++;
    }
  }
};

main();
