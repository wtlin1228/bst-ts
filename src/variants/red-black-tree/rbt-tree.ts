import { AbstractBSTree } from "../../bst";
import { Color } from "./types";

import RBTNode, { IRBTNodeOrNull } from "./rbt-node";

export default class RBT extends AbstractBSTree {
  klass: new (parent: IRBTNodeOrNull, k: number) => RBTNode;
  root: IRBTNodeOrNull;
  nil: RBTNode;

  constructor(klass = RBTNode) {
    super();

    this.klass = klass;
    this.root = null;

    this.nil = new klass(null, 0);
    this.nil.color = Color.Black;
    this.nil.isNil = true;
  }

  assertIsNull(n: IRBTNodeOrNull): n is null {
    return n === null || Boolean(n.isNil) === true;
  }

  find(k: number): IRBTNodeOrNull {
    const node = super.find(k);

    if (this.assertIsNull(node as RBTNode)) {
      return null;
    }

    return node as RBTNode;
  }

  insert(k: number): RBTNode {
    const node = new this.klass(null, k);
    node.left = this.nil;
    node.right = this.nil;

    if (this.assertIsNull(this.root)) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  delete(k: number): IRBTNodeOrNull {
    // Not implemented

    const node = this.find(k);
    return node;
  }
}
