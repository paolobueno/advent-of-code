const {Robot} = require("./12_2");

test("clockwise", () => {
  const robot = new Robot();
  robot.clockwise(90);
  expect(robot.waypoint).toBe({x: 4, y: -10});
});

test("forward", () => {});
