import { INodeOrNil, INodeOrNull, AbstractBSTNode } from "./bst-node";

export abstract class AbstractBSTree<NIL> {
  klass!: new (parent: INodeOrNil<NIL>, k: number) => AbstractBSTNode<NIL>;
  root!: INodeOrNil<NIL>;

  abstract assertIsNil(n: any): n is NIL;

  /**
   * Inserts a node with key k into the subtree rooted at this node.
   * @param k The key of the node to be inserted.
   * @param val The value of the node to be inserted.
   * @returns The node inserted.
   */
  abstract insert(k: number): AbstractBSTNode<NIL>;

  /**
   * Deletes and returns a node with key k if it exists from the BST.
   * @param k The key of the node that we want to delete.
   * @returns The deleted node with key k.
   */
  abstract delete(k: number): INodeOrNull<NIL>;

  /**
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k or None if the tree is empty.
   */
  find(k: number): AbstractBSTNode<NIL> | null {
    if (this.assertIsNil(this.root)) {
      return null;
    }

    return this.root.find(k);
  }

  /**
   * @returns The minimum node of this BST.
   */
  findMin(): INodeOrNull<NIL> {
    if (this.assertIsNil(this.root)) {
      return null;
    }
    return this.root.findMin();
  }

  /**
   * @returns The maximum node of this BST.
   */
  findMax(): INodeOrNull<NIL> {
    if (this.assertIsNil(this.root)) {
      return null;
    }
    return this.root.findMax();
  }

  /**
   * Returns the node that contains the next larger (the successor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the successor is to be found.
   * @returns The successor node.
   */
  nextLarger(k: number): INodeOrNull<NIL> {
    const node = this.find(k);
    return node && node.nextLarger();
  }

  /**
   * Returns the node that contains the next smaller (the predecessor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the predecessor is to be found.
   * @returns The predecessor node.
   */
  nextSmaller(k: number): INodeOrNull<NIL> {
    const node = this.find(k);
    return node && node.nextSmaller();
  }
}
