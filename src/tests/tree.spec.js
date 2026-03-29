import { Tree } from "../Tree.js";
import { removeDuplicate } from "../lib/removeDupe.js";

const tree = new Tree();
const arr = removeDuplicate([20, 10, 20, 30, 2, 4, 35, 6, 2, 7, 32, 1, 7, 3, 8, 3, 6, 7, 23]).sort((a, b) => a - b);

tree.buildTree(arr);

describe("includes()", () => {
    test("23 is true", () => {
        expect(tree.includes(23)).toBeTruthy();
    });

    test("4 is true", () => {
        expect(tree.includes(4)).toBeTruthy();
    });


    test("99 is false", () => {
        expect(tree.includes(5)).toBeFalsy();
    });

});

describe("insert()", () => {
    test("5", () => {
        tree.insert(5);
        expect(tree.includes(5)).toBeTruthy();
    });

})