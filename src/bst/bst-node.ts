import AsciiArtNode from "./ascii-art";

export type INodeOrNull<NIL> = AbstractBSTNode<NIL> | null;
export type INodeOrNil<NIL> = AbstractBSTNode<NIL> | NIL;

export abstract class AbstractBSTNode<NIL> extends AsciiArtNode<NIL> {
  key!: number;
  parent!: INodeOrNil<NIL>;
  left!: INodeOrNil<NIL>;
  right!: INodeOrNil<NIL>;

  abstract assertIsNil(n: any): n is NIL;

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param node The node to be inserted.
   * @returns
   */
  abstract insert(n: AbstractBSTNode<NIL>): void;

  /**
   * Deletes and returns this node from the BST.
   * @returns the node deleted.
   */
  abstract delete(): AbstractBSTNode<NIL>;

  /**
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k.
   */
  find(k: number): INodeOrNull<NIL> {
    if (k === this.key) {
      return this;
    }

    if (k < this.key) {
      if (this.assertIsNil(this.left)) {
        return null;
      }
      return this.left.find(k);
    }

    if (k > this.key) {
      if (this.assertIsNil(this.right)) {
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
  findMin(): AbstractBSTNode<NIL> {
    let current = this as AbstractBSTNode<NIL>;
    while (!this.assertIsNil(current.left)) {
      current = current.left;
    }
    return current;
  }

  /**
   * Finds the node with the maximum key in the subtree rooted at this node.
   * @returns The node with the maximum key.
   */
  findMax(): AbstractBSTNode<NIL> {
    let current = this as AbstractBSTNode<NIL>;
    while (!this.assertIsNil(current.right)) {
      current = current.right;
    }
    return current;
  }

  /**
   * Returns the node with the next larger key (the successor) in the BST.
   */
  nextLarger(): INodeOrNull<NIL> {
    if (!this.assertIsNil(this.right)) {
      return this.right.findMin();
    }

    let current = this as AbstractBSTNode<NIL>;
    while (
      !this.assertIsNil(current.parent) &&
      current === current.parent.right
    ) {
      current = current.parent;
    }

    return this.assertIsNil(current.parent) ? null : current.parent;
  }

  /**
   * Returns the node with the next smaller key (the predecessor) in the BST.
   */
  nextSmaller(): INodeOrNull<NIL> {
    if (!this.assertIsNil(this.left)) {
      return this.left.findMax();
    }

    let current = this as AbstractBSTNode<NIL>;
    while (
      !this.assertIsNil(current.parent) &&
      current === current.parent.left
    ) {
      current = current.parent;
    }

    return this.assertIsNil(current.parent) ? null : current.parent;
  }
}
