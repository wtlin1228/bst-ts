import AsciiArtNode from "./ascii-art";

export type INodeOrNull = AbstractBSTNode | null;

export abstract class AbstractBSTNode extends AsciiArtNode {
  key!: number;
  parent!: INodeOrNull;
  left!: INodeOrNull;
  right!: INodeOrNull;

  /**
   * Check if a pointer should be treated as null.
   * @param n The pointer to be checked.
   * @returns Should n be treated as null or not?
   */
  abstract assertIsNull(n: INodeOrNull): n is null;

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param node The node to be inserted.
   * @returns
   */
  abstract insert(n: AbstractBSTNode): void;

  /**
   * Deletes and returns this node from the BST.
   * @returns the node deleted.
   */
  abstract delete(): AbstractBSTNode;

  /**
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k.
   */
  find(k: number): INodeOrNull {
    if (k === this.key) {
      return this;
    }

    if (k < this.key) {
      if (this.assertIsNull(this.left)) {
        return null;
      }
      return this.left.find(k);
    }

    if (k > this.key) {
      if (this.assertIsNull(this.right)) {
        return null;
      }
      return this.right.find(k);
    }

    return null;
  }

  /**
   * Finds the node with the minimum key in the subtree rooted at this node.
   * @returns The node with the minimum key.
   */
  findMin(): AbstractBSTNode {
    let current = this as AbstractBSTNode;
    while (!this.assertIsNull(current.left)) {
      current = current.left;
    }
    return current;
  }

  /**
   * Finds the node with the maximum key in the subtree rooted at this node.
   * @returns The node with the maximum key.
   */
  findMax(): AbstractBSTNode {
    let current = this as AbstractBSTNode;
    while (!this.assertIsNull(current.right)) {
      current = current.right;
    }
    return current;
  }

  /**
   * Returns the node with the next larger key (the successor) in the BST.
   */
  nextLarger(): INodeOrNull {
    if (!this.assertIsNull(this.right)) {
      return this.right.findMin();
    }

    let current = this as AbstractBSTNode;
    while (
      !this.assertIsNull(current.parent) &&
      current === current.parent.right
    ) {
      current = current.parent;
    }

    return this.assertIsNull(current.parent) ? null : current.parent;
  }

  /**
   * Returns the node with the next smaller key (the predecessor) in the BST.
   */
  nextSmaller(): INodeOrNull {
    if (!this.assertIsNull(this.left)) {
      return this.left.findMax();
    }

    let current = this as AbstractBSTNode;
    while (
      !this.assertIsNull(current.parent) &&
      current === current.parent.left
    ) {
      current = current.parent;
    }

    return this.assertIsNull(current.parent) ? null : current.parent;
  }
}
