const readline = require("readline");

/**
 * @returns {Promise<string[]>}
 */
const readAll = () => {
  let res = [];
  const rl = readline.createInterface({
    input: process.stdin,
  });
  return new Promise((resolve, reject) => {
    process.stdin.on("end", () => resolve(res));
    rl.on("line", res.push.bind(res));
  });
};

module.exports = {
  readAll,
};
