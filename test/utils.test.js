import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  calculation,
  randomNumber,
  createOptions,
  convertStringToArray,
  createOperatorTextAndIcon,
  createDifficultyText,
  setHighLowVals,
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
test("checks calculation function calls proper functions properly", () => {
  expect(calculation(3, 4, "+")).toBe(7);
  expect(calculation(4, 3, "-")).toBe(1);
  expect(calculation(3, 4, "x")).toBe(12);
  expect(calculation(9, 3, "÷")).toBe(3);
});
test("return check if random number between span", () => {
  expect(randomNumber(1, 10)).toBeLessThan(10);
  expect(randomNumber(1, 10)).toBeGreaterThanOrEqual(1);
});
test("return correct amount of option numbers", () => {
  const options = createOptions(7, 7, "+");
  expect(options.length).toBe(4);
  expect(options).toContain(14);
});
test("test convertStringToArray and return array from string", () => {
  const options = convertStringToArray("array");
  expect(options).toEqual(["a", "r", "r", "a", "y"]);
});
test("return array of text and color assigned to operator", () => {
  const addOpArray = createOperatorTextAndIcon("+");
  const subOpArray = createOperatorTextAndIcon("-");
  const mulOpArray = createOperatorTextAndIcon("x");
  const divOpArray = createOperatorTextAndIcon("÷");

  expect(addOpArray).toEqual(["Addition", "#6ee06e"]);
  expect(subOpArray).toEqual(["Subtraction", "#00bdff"]);
  expect(mulOpArray).toEqual(["Multiplication", "#f5ba42"]);
  expect(divOpArray).toEqual(["Division", "#e46fe4"]);
});
test("check difficulty text arrays", () => {
  const noviceCheck = createDifficultyText("2");
  const geniusCheck = createDifficultyText("5");

  expect(noviceCheck).toEqual(["Novice", "yellow"]);
  expect(geniusCheck).toEqual(["Genius!", "purple"]);
});
test("check high and low values", () => {
  const addValues = setHighLowVals("5", "+");
  const subValues = setHighLowVals("5", "-");
  const mulValues = setHighLowVals("5", "x");
  const divValues = setHighLowVals("5", "÷");
  expect(addValues).toEqual([50, 0]);
  expect(subValues).toEqual([100, 0]);
  expect(mulValues).toEqual([12, 4]);
  expect(divValues).toEqual([12, 3]);
});
test("check difficulty text arrays", () => {
  const a = reformatOperator("+");
  const m = reformatOperator("x");

  expect(a).toEqual("addition");
  expect(m).toEqual("multiplication");
});
