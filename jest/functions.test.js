const {capitalize, reverse, calculator, analyzeArray, caesarCipher} = require('./functions');

test("Capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
});

test("Reverse the string", () => {
    expect(reverse("hello")).toBe("olleh");
});

test("Adding two numbers", () => {
    expect(calculator.add(3,2)).toBe(5);
});

test("Multiplying two numbers", () => {
    expect(calculator.multiply(20,5)).toBe(100);
});

test("CaesarCipher", () => {
    expect(caesarCipher('Hello, World!', 3)).toBe("Khoor, Zruog!");
});

test("Analyzing an Array", () => {
    expect(analyzeArray([1,8,3,4,2,6]))
    .toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
});