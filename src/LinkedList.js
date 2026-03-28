import { Node } from "./Node.js";

export class LinkedList {

    head = null;


    constructor() { }

    append(value) {
        if (!this.head) this.head = new Node(value);
        else {
            let currentNode = this.head;
            while (currentNode) {
                if (!currentNode.nextNode) {
                    currentNode.nextNode = new Node(value);
                    break;
                }
                else currentNode = currentNode.nextNode;
            }
        }
    }

    prepend(value) {
        if (!this.head) this.head = new Node(value);
        else {
            const oldHead = this.head;
            const newNode = new Node(value);

            this.head = newNode;
            newNode.nextNode = oldHead;
        }
    }

    size() {
        if (!this.head) return 0;

        let currentNode = this.head;
        let counter = 0;

        while (currentNode) {
            counter++;
            currentNode = currentNode.nextNode;
        }

        return counter;
    }

    Head() {
        if (!this.head) return undefined;
        return this.head.value;
    }

    tail() {
        if (!this.head) return undefined;

        let currentNode = this.head;
        let tail = undefined;

        while (currentNode) {
            tail = currentNode;
            currentNode = currentNode.nextNode;
        }

        return tail.value;
    }

    at(index) {
        let currentNode = this.head;
        let counter = 0;

        while (currentNode) {
            if (counter === index) return currentNode.value;

            counter++;
            currentNode = currentNode.nextNode;
        }

        return undefined;
    }

    pop() {
        if (!this.head) return undefined;
        const thisHead = this.head;
        this.head = thisHead.nextNode;

        return thisHead.value;
    }

    contains(value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) return true;
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    findIndex(value) {
        let currentNode = this.head;
        let index = 0;

        while (currentNode) {
            if (currentNode.value === value) return index;

            index++;
            currentNode = currentNode.nextNode;
        }

        return -1;
    }

    toString() {
        let node = this.head;
        let result = ""

        while (node) {
            const currNode = `( ${node.value} )`;
            result = result ? result + " --> " + currNode : currNode;
            node = node.nextNode;
        }

        return result + " --> " + `( ${node} )`;


    }

    insertAt(idx, ...values) {
        try {
            if (typeof idx !== "number") throw new TypeError("Not an integer");
            if (idx < 0 || idx > this.size()) throw new RangeError("Not in range");
        } catch (error) {
            console.log(error)
            return;
        }

        let currentNode = this.head;
        let counter = 0;
        let prevNode = null;

        if (idx === 0) {
            const oldHead = this.head;
            const firstHead = new Node(values[0]);
            this.head = firstHead;
            let lastInserted = firstHead;

            if (values.length > 1) {
                for (const value of values.slice(1)) {

                    lastInserted.nextNode = new Node(value);
                    lastInserted = lastInserted.nextNode;

                }
            }
            lastInserted.nextNode = oldHead;
        } else {
            while (currentNode) {
                if (counter === idx) break; // currentNode is target
                prevNode = currentNode;
                counter++;
                currentNode = currentNode.nextNode;
            }
            prevNode.nextNode = null;

            let lastInserted = prevNode;
            for (let i = 0; i < values.length; i++) {

                lastInserted.nextNode = new Node(values[i]);
                lastInserted = lastInserted.nextNode;

            }

            lastInserted.nextNode = currentNode;
        }

        return undefined;
    }

    removeAt(idx) {
        if (!this.head) return null;

        let currentNode = this.head;
        let counter = 0;

        if (idx === 0) {
            this.head = currentNode.nextNode;
        } else {
            let prevNode = null;

            while (currentNode) {
                if (idx === counter) break;
                prevNode = currentNode;
                counter++;
                currentNode = currentNode.nextNode;
            }

            prevNode.nextNode = currentNode.nextNode;
        }
    }
}