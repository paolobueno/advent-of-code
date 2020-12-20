const {readAll} = require("./util");

const rotateCounterClockwise = ([x, y], angle) => {
  const radian = angle * (Math.PI / 180);
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  return [Math.round(x * cos - y * sin), Math.round(x * sin - y * cos)];
};

class Robot {
  x = 0;
  y = 0;
  waypoint = {x: 10, y: 1};
  constructor(x, y, wx, wy) {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
    if (wx && wy) {
      this.waypoint = {x: wx, y: wy};
    }
  }
  toString() {
    return `Robot ${x} ${y} ${direction}`;
  }

  forward(n) {
    for (let i = 0; i < n; i++) {
      this.x += this.waypoint.x;
      this.y += this.waypoint.y;
    }
  }

  move(direction, n) {
    switch (direction) {
      case "E":
        this.waypoint.x += n;
        break;
      case "W":
        this.waypoint.x -= n;
        break;
      case "N":
        this.waypoint.y += n;
        break;
      case "S":
        this.waypoint.y -= n;
        break;
    }
  }
  clockwise(n) {
    this.counterClockwise(-n);
  }
  counterClockwise(n) {
    [this.waypoint.x, this.waypoint.y] = rotateCounterClockwise(
      [this.waypoint.x, this.waypoint.y],
      n,
    );
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
