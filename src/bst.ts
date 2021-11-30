import AsciiArtNode from "./ascii-art";

// -------------------------------------------------
// -------------------  Types  ---------------------
// -------------------------------------------------

type IBSTNodeOrNull<T> = IBSTNode<T> | null;

export interface IBSTNode<T> {
  key: number;
  val?: T;
  parent: IBSTNodeOrNull<T>;
  left: IBSTNodeOrNull<T>;
  right: IBSTNodeOrNull<T>;

  find(k: number): IBSTNodeOrNull<T>;
  findMin(): IBSTNodeOrNull<T>;
  findMax(): IBSTNodeOrNull<T>;
  nextLarger(): IBSTNodeOrNull<T>;
  nextSmaller(): IBSTNodeOrNull<T>;
  insert(node: IBSTNode<T>): void;
  delete(): IBSTNode<T>;
}

export interface IBSTNodeCtor<T> {
  new (parent: IBSTNodeOrNull<T>, k: number, val?: T): IBSTNode<T>;
}

export interface IBST<T> {
  find(k: number): IBSTNodeOrNull<T>;
  findMin(): IBSTNodeOrNull<T>;
  findMax(): IBSTNodeOrNull<T>;
  nextLarger(k: number): IBSTNodeOrNull<T>;
  nextSmaller(k: number): IBSTNodeOrNull<T>;
  insert(k: number, val?: T): IBSTNode<T>;
  delete(k: number): IBSTNodeOrNull<T>;
}

// -------------------------------------------------
// --------------  Implementations  ----------------
// -------------------------------------------------

export class BSTNode<T> extends AsciiArtNode implements IBSTNode<T> {
  key: number;
  val?: T;
  parent: IBSTNodeOrNull<T>;
  left: IBSTNodeOrNull<T>;
  right: IBSTNodeOrNull<T>;

  constructor(parent: IBSTNodeOrNull<T>, k: number, val?: T) {
    super();

    this.key = k;
    this.val = val;
    this.parent = parent || null;
    this.left = null;
    this.right = null;
  }

  /**
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k.
   */
  find(k: number): IBSTNodeOrNull<T> {
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
  findMin(): IBSTNode<T> {
    let current = this as IBSTNode<T>;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * Finds the node with the maximum key in the subtree rooted at this node.
   * @returns The node with the maximum key.
   */
  findMax(): IBSTNode<T> {
    let current = this as IBSTNode<T>;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   * Returns the node with the next larger key (the successor) in the BST.
   */
  nextLarger(): IBSTNodeOrNull<T> {
    if (this.right !== null) {
      return this.right.findMin();
    }

    let current = this as IBSTNode<T>;
    while (current.parent !== null && current === current.parent.right) {
      current = current.parent;
    }

    return current.parent;
  }

  /**
   * Returns the node with the next smaller key (the predecessor) in the BST.
   */
  nextSmaller(): IBSTNodeOrNull<T> {
    if (this.left !== null) {
      return this.left.findMax();
    }

    let current = this as IBSTNode<T>;
    while (current.parent !== null && current === current.parent.left) {
      current = current.parent;
    }

    return current.parent;
  }

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param node The node to be inserted.
   * @returns
   */
  insert(node: IBSTNode<T>) {
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
   * @returns the node deleted.
   */
  delete(): IBSTNode<T> {
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
      this.val = s.val;
      return s.delete();
    }
  }
}

export default class BST<T> implements IBST<T> {
  root: IBSTNodeOrNull<T>;
  klass;

  constructor(klass = BSTNode) {
    this.root = null;
    this.klass = klass;
  }

  /**
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k or None if the tree is empty.
   */
  find(k: number): IBSTNodeOrNull<T> {
    return this.root && this.root.find(k);
  }

  /**
   * @returns The minimum node of this BST.
   */
  findMin(): IBSTNodeOrNull<T> {
    return this.root && this.root.findMin();
  }

  /**
   * @returns The maximum node of this BST.
   */
  findMax(): IBSTNodeOrNull<T> {
    return this.root && this.root.findMax();
  }

  /**
   * Returns the node that contains the next larger (the successor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the successor is to be found.
   * @returns The successor node.
   */
  nextLarger(k: number): IBSTNodeOrNull<T> {
    const node = this.find(k);
    return node && node.nextLarger();
  }

  /**
   * Returns the node that contains the next smaller (the predecessor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the predecessor is to be found.
   * @returns The predecessor node.
   */
  nextSmaller(k: number): IBSTNodeOrNull<T> {
    const node = this.find(k);
    return node && node.nextSmaller();
  }

  /**
   * Inserts a node with key k into the subtree rooted at this node.
   * @param k The key of the node to be inserted.
   * @param val The value of the node to be inserted.
   * @returns The node inserted.
   */
  insert(k: number, val?: T): IBSTNode<T> {
    const node = new this.klass(null, k, val);

    if (this.root === null) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  /**
   * Deletes and returns a node with key k if it exists from the BST.
   * @param k The key of the node that we want to delete.
   * @returns The deleted node with key k.
   */
  delete(k: number): IBSTNodeOrNull<T> {
    const node = this.find(k);

    if (!node) {
      return null;
    }

    if (node !== this.root) {
      return node.delete();
    } else {
      const pseudoRoot = new this.klass<T>(null, 0);
      pseudoRoot.left = this.root;
      this.root.parent = pseudoRoot;

      const deleted = this.root.delete();

      this.root = pseudoRoot.left;
      if (this.root !== null) {
        this.root.parent = null;
      }

      return deleted;
    }
  }
}
