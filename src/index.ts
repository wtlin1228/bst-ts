import BST from "./variants/regular/bst-tree";
import RBT from "./variants/red-black-tree/rbt-tree";

// const tree = new BST();
const tree = new RBT();
tree.insert(50);
tree.insert(20);
tree.insert(1);
tree.insert(80);
tree.insert(5);

console.log(tree.findMin()?.key); // 1
console.log(tree.findMax()?.key); // 80

console.log(tree.nextLarger(1)?.key); // 5
console.log(tree.nextLarger(80)?.key); // null

tree.delete(5);
console.log(tree.nextLarger(1)?.key); // 20

console.log(tree.root?.toString());
