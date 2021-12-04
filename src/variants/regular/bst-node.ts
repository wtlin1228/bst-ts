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

  insert(node: BSTNode): void {
    if (node.key < this.key) {
      if (this.left === null) {
        node.parent = this;
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else {
      if (this.right === null) {
        node.parent = this;
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }

  delete(): BSTNode {
    if (this.parent === null) {
      throw new Error("Can't delete a node whose parent is null");
    }

    if (this.left === null || this.right === null) {
      if (this === this.parent.left) {
        this.parent.left = this.left || this.right;
        if (this.parent.left !== null) {
          this.parent.left.parent = this.parent;
        }
      } else {
        this.parent.right = this.left || this.right;
        if (this.parent.right !== null) {
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
