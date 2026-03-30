import { removeDuplicate } from "./lib/removeDupe.js";
import { Tree } from "./Tree.js";

const tree = new Tree();
const arr = removeDuplicate([20, 10, 20, 30, 2, 4, 35, 6, 2, 7, 32, 1, 7, 3, 8, 3, 6, 7, 23]).sort((a, b) => a - b);

tree.buildTree(arr);


// tree.deleteItem(5);
tree.prettyPrint(tree.root);



// tree.levelOrderForEach(val => console.log(val));
// tree.preOrderForEach(val => console.log(val));
// tree.inOrderForEach(val => console.log(val));
// tree.postOrderForEach(val => console.log(val));
tree.depth(6);

console.log(tree.isBalanced() ? "true" : "false");
// tree.height(1);