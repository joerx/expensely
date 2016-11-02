export default function parseInput(input) {
  const matches = input.match(/^(\w*)\s(\d*\.?\d*)/);
  return matches ?
    [matches[1], Number(matches[2])] :
    [null, null, `Cannot parse ${input}`];
}
