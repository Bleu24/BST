export function removeDuplicate(arr) {
    const set = new Set(arr);
    return [...set];
}

export function getSuccessor(node) {
    node = node.rightChild

    while (node && node.leftChild) {
        node = node.leftChild;
    }

    return node;
} 
