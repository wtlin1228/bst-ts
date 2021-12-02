import { AbstractBSTNode } from "../../bst";
import { BST_NIL, IBSTNil } from "./types";

export type IBSTNodeOrNil = BSTNode | IBSTNil;

export default class BSTNode extends AbstractBSTNode<IBSTNil> {
  key: number;
  parent: IBSTNodeOrNil;
  left: IBSTNodeOrNil;
  right: IBSTNodeOrNil;

  constructor(parent: IBSTNodeOrNil, k: number) {
    super();

    this.key = k;
    this.parent = parent;
    this.left = BST_NIL;
    this.right = BST_NIL;
  }

  assertIsNil(n: any): n is IBSTNil {
    return n === BST_NIL;
  }

  insert(node: BSTNode): void {
    if (node.key < this.key) {
      if (this.assertIsNil(this.left)) {
        node.parent = this;
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else {
      if (this.assertIsNil(this.right)) {
        node.parent = this;
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }

  delete(): BSTNode {
    if (this.assertIsNil(this.parent)) {
      throw new Error("Can't delete a node whose parent is null");
    }

    if (this.assertIsNil(this.left) || this.assertIsNil(this.right)) {
      if (this === this.parent.left) {
        this.parent.left = this.left || this.right;
        if (!this.assertIsNil(this.parent.left)) {
          this.parent.left.parent = this.parent;
        }
      } else {
        this.parent.right = this.left || this.right;
        if (!this.assertIsNil(this.parent.right)) {
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
