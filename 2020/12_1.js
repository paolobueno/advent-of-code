const {readAll} = require("./util");

const directions = ["N", "E", "S", "W"];

class Robot {
  x = 0;
  y = 0;
  direction = "E";
  constructor(x, y, direction) {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
    if (direction) {
      this.direction = direction;
    }
  }
  toString() {
    return `Robot ${x} ${y} ${direction}`;
  }

  forward(n) {
    this.move(this.direction, n);
  }

  move(direction, n) {
    switch (direction) {
      case "E":
        this.x += n;
        break;
      case "W":
        this.x -= n;
        break;
      case "N":
        this.y += n;
        break;
      case "S":
        this.y -= n;
        break;
    }
  }
  clockwise(n) {
    const currDirection = directions.indexOf(this.direction);
    const newDirection = (4 + currDirection + n / 90) % 4;
    this.direction = directions[newDirection];
  }
  counterClockwise(n) {
    this.clockwise(-n);
  }

  command(direction, n) {
    switch (direction) {
      case "F":
        this.forward(n);
        break;
      case "R":
        this.clockwise(n);
        break;
      case "L":
        this.counterClockwise(n);
        break;
      default:
        this.move(direction, n);
        break;
    }
  }
}

const main = async () => {
  const input = await readAll();
  const robot = new Robot();
  input.forEach((line) => {
    const [direction, ...num] = line;
    const n = Number(num.join(""));
    robot.command(direction, n);
  });
  console.log(robot);
  console.log(`answer: ${Math.abs(robot.x) + Math.abs(robot.y)}`);
};

main();

module.exports = {Robot};
