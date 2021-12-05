import AsciiArtNode from "./ascii-art";

export type INodeOrNull = AbstractBSTNode | null;

export abstract class AbstractBSTNode extends AsciiArtNode {
  key!: number;
  parent!: INodeOrNull;
  left!: INodeOrNull;
  right!: INodeOrNull;

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param node The node to be inserted.
   * @returns
   */
  insert(node: AbstractBSTNode): void {
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

  /**
   * Deletes and returns this node from the BST.
   * @returns The node deleted.
   */
  delete(): AbstractBSTNode {
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
      if (this.left === null) {
        return null;
      }
      return this.left.find(k);
    }

    if (k > this.key) {
      if (this.right === null) {
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
    while (current.left !== null) {
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
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   * Returns the node with the next larger key (the successor) in the BST.
   */
  nextLarger(): INodeOrNull {
    if (this.right !== null) {
      return this.right.findMin();
    }

    let current = this as AbstractBSTNode;
    while (current.parent !== null && current === current.parent.right) {
      current = current.parent;
    }

    return current.parent;
  }

  /**
   * Returns the node with the next smaller key (the predecessor) in the BST.
   */
  nextSmaller(): INodeOrNull {
    if (this.left !== null) {
      return this.left.findMax();
    }

    let current = this as AbstractBSTNode;
    while (current.parent !== null && current === current.parent.left) {
      current = current.parent;
    }

    return current.parent;
  }
}
