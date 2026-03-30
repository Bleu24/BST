import { getSuccessor, removeDuplicate } from "./lib/removeDupe.js";
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
        return this.root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    search(node, value) {
        if (!node) return false;
        if (node.value === value) return true;
        return this.search(node.leftChild, value) || this.search(node.rightChild, value);
    }

    includes(value) {
        return this.search(this.root, value);
    }

    insert(value) {
        const insertAlgo = (node, value) => {

            if (!node) return new Node(value);

            if (node.value > value) node.leftChild = insertAlgo(node.leftChild, value);
            else if (node.value < value) node.rightChild = insertAlgo(node.rightChild, value);

            return node;
        }

        this.root = insertAlgo(this.root, value);
    }

    deleteItem(value) {

        const deleteAlgo = (node, value) => {

            if (!node) return null;
            if (node.value > value) node.leftChild = deleteAlgo(node.leftChild, value);
            if (node.value < value) node.rightChild = deleteAlgo(node.rightChild, value);

            if (node.value === value) {

                if (node.leftChild && node.rightChild) {
                    const succ = getSuccessor(node);
                    node.value = succ.value;
                    node.rightChild = deleteAlgo(node.rightChild, succ.value);
                    return node;
                }

                if (node.leftChild || node.rightChild) {
                    return node.leftChild || node.rightChild;
                }


                if (!node.leftChild && !node.rightChild) {
                    return null;
                }
            }

            return node;
        }

        this.root = deleteAlgo(this.root, value);

    }

    levelOrderForEach(callback) {
        if (!callback) throw new Error("Callback is required!");

        if (!this.root) return null;
        let queue = [];
        queue.push(this.root);

        while (!(queue.length === 0)) {
            const curr = queue[0];
            callback(curr.value);
            if (curr.leftChild) queue.push(curr.leftChild);
            if (curr.rightChild) queue.push(curr.rightChild);
            queue = queue.slice(1);
        }

    }

    preOrderForEach(callback) {
        if (!callback) throw new Error("Callback is required!");

        if (!this.root) return null;

        const visitNode = (node) => {
            if (!node) return;

            callback(node.value);

            visitNode(node.leftChild);
            visitNode(node.rightChild);
        }

        visitNode(this.root);
    }

    inOrderForEach(callback) {
        if (!callback) throw new Error("Callback is required!");

        if (!this.root) return null;

        const visitNode = (node) => {
            if (!node) return;

            visitNode(node.leftChild);
            callback(node.value);
            visitNode(node.rightChild);
        }

        visitNode(this.root);
    }

    postOrderForEach(callback) {
        if (!callback) throw new Error("Callback is required!");

        if (!this.root) return null;

        const visitNode = (node) => {
            if (!node) return;

            visitNode(node.leftChild);
            visitNode(node.rightChild);
            callback(node.value);
        }

        visitNode(this.root);
    }

    height(value) {
        const search = (node, value) => {
            if (!node) return null;

            if (node.value === value) return node;

            if (node.value > value) return search(node.leftChild, value);
            else if (node.value < value) return search(node.rightChild, value);

            return node;
        }

        const calcHeight = (node) => {

            if (!node) return -1;
            if (!node.leftChild && !node.rightChild) return 0;

            let leftHeight = calcHeight(node.leftChild);
            let rightHeight = calcHeight(node.rightChild);

            return 1 + Math.max(leftHeight, rightHeight);
        }

        const node = search(this.root, value);
        const height = calcHeight(node);
        console.log(height);
        return height

    }

    depth(value) {
        const calcHeight = (node, value) => {
            if (!node) return undefined;

            if (node.value === value) return 0;

            if (node.value > value) {
                return calcHeight(node.leftChild, value) + 1;
            }
            else if (node.value < value) {
                return calcHeight(node.rightChild, value) + 1;
            }

        }

        const height = calcHeight(this.root, value);
        console.log(Number.isNaN(height) ? undefined : height);

        return Number.isNaN(height) ? undefined : height;
    }

    isBalanced() {

        const isBalancedAlgo = (node) => {
            if (!node) return 0;

            const leftHeight = isBalancedAlgo(node.leftChild);
            const rightHeight = isBalancedAlgo(node.rightChild);

            if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;

            return Math.max(leftHeight, rightHeight) + 1;

        }

        return isBalancedAlgo(this.root) > 0;
    }

    rebalance() {
        const nodes = [];

        this.inOrderForEach(nodeValue => nodes.push(nodeValue));

        return this.buildTree(nodes);
    }







}