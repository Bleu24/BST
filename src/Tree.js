import { removeDuplicate } from "./lib/removeDupe.js";
import { Node } from "./Node.js";

export class Tree {
    root = null;

    constructor() { }

    sortedBST(arr, start, end) {
        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);
        const parent = new Node(arr[mid]);

        parent.leftChild = this.sortedBST(arr, start, mid - 1);
        parent.rightChild = this.sortedBST(arr, mid + 1, end);

        return parent;
    }

    buildTree(arr) {
        const sorted = removeDuplicate(arr).sort((a, b) => a - b);
        this.root = this.sortedBST(arr, 0, sorted.length - 1);
        this.#prettyPrint(this.root);
        return this.root;
    }

    #prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.#prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        this.#prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


}