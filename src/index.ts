import BST from "./bst";

const tree = new BST<string>();
tree.insert(5, "a");
tree.insert(2, "b");
tree.insert(7, "c");

const node = tree.insert(1, "d");
console.log(`next larger of 1 is ${node.nextLarger()?.key}`);
console.log(`next smaller of 1 is ${node.nextSmaller()?.key}`);

tree.delete(5);
tree.delete(7);
