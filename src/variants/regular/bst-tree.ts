import { AbstractBSTree } from "../../bst";
import { BST_NIL, IBSTNil } from "./types";

import BSTNode, { IBSTNodeOrNil } from "./bst-node";

type IBSTNodeOrNull = BSTNode | null;

export default class BST extends AbstractBSTree<IBSTNil> {
  klass: new (parent: IBSTNodeOrNil, k: number) => BSTNode;
  root: IBSTNodeOrNil;

  constructor(klass = BSTNode) {
    super();

    this.klass = klass;
    this.root = BST_NIL;
  }

  assertIsNil(n: any): n is IBSTNil {
    return n === BST_NIL;
  }

  insert(k: number): BSTNode {
    const node = new this.klass(BST_NIL, k);

    if (this.assertIsNil(this.root)) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  delete(k: number): IBSTNodeOrNull {
    const node = this.find(k);

    if (this.assertIsNil(node)) {
      return null;
    }

    if (node !== this.root) {
      return node.delete();
    } else {
      const pseudoRoot = new this.klass(BST_NIL, 0);
      pseudoRoot.left = this.root;
      this.root.parent = pseudoRoot;

      const deleted = this.root.delete();

      this.root = pseudoRoot.left;
      if (!this.assertIsNil(this.root)) {
        this.root.parent = BST_NIL;
      }

      return deleted;
    }
  }
}
