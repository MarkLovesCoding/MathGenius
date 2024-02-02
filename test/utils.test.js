import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  calculation,
  randomNumber,
  shuffle,
  createOptions,
  convertStringToArray,
  createDifficultyText,
  setHighLowVals,
  updateDifficultyRange,
  reformatOperator,
} from "../dist/js/utils";

test("add function adds two numbers correctly", () => {
  expect(add(1, 2)).toBe(3);
});

test("subtract function subtracts two numbers correctly", () => {
  expect(subtract(5, 3)).toBe(2);
});

test("multiply function multiplies two numbers correctly", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("divide function divides two numbers correctly", () => {
  expect(divide(10, 2)).toBe(5);
});

test("return percentage from fraction of two integers", () => {
  expect(percentage(3, 4)).toBe(75);
});
