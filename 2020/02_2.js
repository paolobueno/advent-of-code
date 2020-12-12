const {readAll} = require("./util");

const main = async () => {
  const input = await readAll();
  const data = input.map((row) => {
    const [count, char, pw] = row.split(" ");
    const [min, max] = count.split("-").map(Number);
    const [charMin, charMax] = [pw[min - 1], pw[max - 1]];
    return {
      row,
      min,
      max,
      char: char[0],
      charMin,
      charMax,
      pw,
      valid: (charMin === char[0]) !== (charMax === char[0]),
    };
  });

  console.log({data});
  const validCount = data.filter(({valid}) => valid).length;
  console.log(validCount);
};

main();
