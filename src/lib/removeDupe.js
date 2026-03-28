export function removeDuplicate(arr) {
    const set = new Set(arr);
    return [...set];
}