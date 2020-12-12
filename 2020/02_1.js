const {readAll} = require("./util");

const charCountInStr = (char, str) =>
  str.split("").reduce((accum, c) => (c === char ? accum + 1 : accum), 0);

const main = async () => {
  const input = await readAll();
  const data = input.map((row) => {
    const [count, char, pw] = row.split(" ");
    const [min, max] = count.split("-").map(Number);
    const charCount = charCountInStr(char[0], pw);
    return {
      min,
      max,
      char: char[0],
      pw,
      charCount,
      valid: charCount >= min && charCount <= max,
    };
  });

  const validCount = data.filter(({valid}) => valid).length;
  console.log(validCount);
};

main();
