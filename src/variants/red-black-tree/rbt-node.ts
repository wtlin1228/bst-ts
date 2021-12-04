import { AbstractBSTNode } from "../../bst";
import { Color } from "./types";

export type IRBTNodeOrNull = RBTNode | null;

export default class RBTNode extends AbstractBSTNode {
  key: number;
  parent: IRBTNodeOrNull;
  left: IRBTNodeOrNull;
  right: IRBTNodeOrNull;
  color: Color;
  isNil: boolean;

  constructor(parent: IRBTNodeOrNull, k: number) {
    super();

    this.key = k;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.color = Color.Red;
    this.isNil = false;
  }

  assertIsNull(n: IRBTNodeOrNull): n is null {
    return n === null || Boolean(n.isNil) === true;
  }

  //   _insertFixup(): void {}

  insert(node: RBTNode): void {
    if (node.key < this.key) {
      if (this.assertIsNull(this.left)) {
        node.parent = this;
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else {
      if (this.assertIsNull(this.right)) {
        node.parent = this;
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }

    // this._insertFixup();
  }

  delete(): RBTNode {
    // Not implemented

    return this;
  }
}
