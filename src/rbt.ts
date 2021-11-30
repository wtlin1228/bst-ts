import AsciiArtNode from "./ascii-art";
import BST, { BSTNode } from "./bst";
import type { IBSTNode } from "./bst";

// -------------------------------------------------
// -------------------  Notes  ---------------------
// -------------------------------------------------

// A red-black tree is a binary tree that satisfies the following red-black properties:
// 1. Every node is either red or black.
// 2. The root is black.
// 3. Every leaf (NIL) is black.
// 4. If a node is red, then both its children are black.
// 5. For each node, all simple paths from the node to descendant leaves contain the same number of black nodes.
//
// If uncle is RED, do color flip
//
//     BLACK                               RED
//      /  \     --- color flip --->      /   \
//    RED  RED                         BLACK  BLACK
//
// If uncle is BLACK, do rotation
//
//     BLACK                              BLACK
//      /  \      --- rotation --->       /   \
//  BLACK  RED                          RED   RED
//

// -------------------------------------------------
// -------------------  Types  ---------------------
// -------------------------------------------------

enum Color {
  Red,
  Black,
}

type IRBTNode<T> = IBSTNode<T> & {
  color: Color;
};

type IRBTNodeOrNull<T> = IRBTNode<T> | null;

interface IRBT {}

// -------------------------------------------------
// --------------  Implementations  ----------------
// -------------------------------------------------

class RBTNode<T> extends BSTNode<T> {
  color: Color;

  constructor(parent: IRBTNodeOrNull<T>, k: number, val?: T) {
    super(parent, k, val);
    this.color = Color.Red;
  }
}

export default class RBT<T> extends BST<T> implements IRBT {
  constructor(klass = RBTNode) {
    super(klass);
  }
}
