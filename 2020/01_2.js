const {readAll} = require("./util");

const TARGET = 2020;

const main = async () => {
  const input = await readAll();
  const numbers = input.map(Number).sort((x, y) => x - y);
  let [bottom, mid, top] = [0, 1, numbers.length - 1];
  while (true) {
    while (top > mid && mid > bottom) {
      if (numbers[bottom] + numbers[mid] + numbers[top] === TARGET) {
        console.log(
          [numbers[bottom], numbers[mid], numbers[top]],
          numbers[bottom] * numbers[mid] * numbers[top],
        );
        return;
      }

      if (mid < top - 1) {
        mid++;
      } else {
        top--;
        mid = bottom + 1;
      }
    }

    if (numbers[bottom] + numbers[mid] + numbers[top] === TARGET) {
      console.log(
        [numbers[bottom], numbers[mid], numbers[top]],
        numbers[bottom] * numbers[mid] * numbers[top],
      );
      return;
    } else {
      bottom++;
      mid = bottom + 1;
      top = numbers.length - 1;
    }
  }
};

main();
