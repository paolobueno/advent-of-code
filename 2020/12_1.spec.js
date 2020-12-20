const {Robot} = require("./12_1");

test("clockwise", () => {
  const robot = new Robot(0, 0, "E");
  robot.clockwise(90);
  expect(robot.direction).toBe("S");
  robot.clockwise(270);
  expect(robot.direction).toBe("E");
  robot.clockwise(180);
  expect(robot.direction).toBe("W");
  robot.clockwise(90);
  expect(robot.direction).toBe("N");
});

test("counterClockwise", () => {
  const robot = new Robot(0, 0, "E");
  robot.counterClockwise(90);
  expect(robot.direction).toBe("N");
  robot.counterClockwise(270);
  expect(robot.direction).toBe("E");
  robot.counterClockwise(180);
  expect(robot.direction).toBe("W");
  robot.counterClockwise(90);
  expect(robot.direction).toBe("S");
});

test("forward", () => {
  const robot = new Robot(0, 0, "E");
  robot.forward(10);
  expect(robot.x).toBe(10);
  robot.clockwise(90);
  robot.forward(10);
  expect(robot.y).toBe(-10);
});
