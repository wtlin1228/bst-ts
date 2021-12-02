import BST from "./variants/regular/bst-tree";

const tree = new BST();
tree.insert(50);
tree.insert(20);
tree.insert(1);
tree.insert(80);
tree.insert(5);

console.log(tree.findMin()); // 1
console.log(tree.findMax()); // 80

console.log(tree.nextLarger(1)); // 5
console.log(tree.nextLarger(80)); // null

tree.delete(5);
console.log(tree.nextLarger(1)); // 20

console.log(tree.root?.toString());
