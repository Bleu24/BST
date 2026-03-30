import { removeDuplicate } from "./lib/removeDupe.js";
import { Tree } from "./Tree.js";

const tree = new Tree();
const arr = removeDuplicate([20, 10, 20, 30, 2, 4, 35, 6, 2, 7, 32, 1, 7, 3, 8, 3, 6, 7, 23]).sort((a, b) => a - b);

tree.buildTree(arr);

console.log(tree.isBalanced()); // true

tree.levelOrderForEach(v => console.log(v));
tree.preOrderForEach(v => console.log(v));
tree.inOrderForEach(v => console.log(v));
tree.postOrderForEach(v => console.log(v));

tree.insert(1230);
tree.insert(246);
tree.insert(834);

console.log(tree.isBalanced()); //false
tree.rebalance();

console.log(tree.isBalanced()); //true

tree.levelOrderForEach(v => console.log(v));
tree.preOrderForEach(v => console.log(v));
tree.inOrderForEach(v => console.log(v));
tree.postOrderForEach(v => console.log(v));