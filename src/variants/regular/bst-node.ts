import { AbstractBSTNode } from "../../bst";

export type IBSTNodeOrNull = BSTNode | null;

export default class BSTNode extends AbstractBSTNode {
  key: number;
  parent: IBSTNodeOrNull;
  left: IBSTNodeOrNull;
  right: IBSTNodeOrNull;

  constructor(parent: IBSTNodeOrNull, k: number) {
    super();

    this.key = k;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  assertIsNull(n: IBSTNodeOrNull): n is null {
    return n === null;
  }

  insert(node: BSTNode): void {
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
  }

  delete(): BSTNode {
    if (this.assertIsNull(this.parent)) {
      throw new Error("Can't delete a node whose parent is null");
    }

    if (this.assertIsNull(this.left) || this.assertIsNull(this.right)) {
      if (this === this.parent.left) {
        this.parent.left = this.left || this.right;
        if (!this.assertIsNull(this.parent.left)) {
          this.parent.left.parent = this.parent;
        }
      } else {
        this.parent.right = this.left || this.right;
        if (!this.assertIsNull(this.parent.right)) {
          this.parent.right.parent = this.parent;
        }
      }
      return this;
    } else {
      const s = this.nextLarger();
      if (s === null) {
        throw new Error(
          "Must add a pseudo root if you want to delete the root node"
        );
      }

      [this.key, s.key] = [s.key, this.key];
      return s.delete();
    }
  }
}
