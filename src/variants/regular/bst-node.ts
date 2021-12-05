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
}
