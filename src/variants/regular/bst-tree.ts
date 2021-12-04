import { AbstractBSTree } from "../../bst";

import BSTNode, { IBSTNodeOrNull } from "./bst-node";

export default class BST extends AbstractBSTree {
  klass: new (parent: IBSTNodeOrNull, k: number) => BSTNode;
  root: IBSTNodeOrNull;

  constructor(klass = BSTNode) {
    super();

    this.klass = klass;
    this.root = null;
  }

  assertIsNull(n: IBSTNodeOrNull): n is null {
    return n === null;
  }

  find(k: number): IBSTNodeOrNull {
    const node = super.find(k);

    if (node === null) {
      return null;
    }

    return node as BSTNode;
  }

  insert(k: number): BSTNode {
    const node = new this.klass(null, k);

    if (this.assertIsNull(this.root)) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  delete(k: number): IBSTNodeOrNull {
    const node = this.find(k);

    if (this.assertIsNull(node)) {
      return null;
    }

    if (node !== this.root) {
      return node.delete();
    } else {
      const pseudoRoot = new this.klass(null, 0);
      pseudoRoot.left = this.root;
      this.root.parent = pseudoRoot;

      const deleted = this.root.delete();

      this.root = pseudoRoot.left;
      if (!this.assertIsNull(this.root)) {
        this.root.parent = null;
      }

      return deleted;
    }
  }
}
