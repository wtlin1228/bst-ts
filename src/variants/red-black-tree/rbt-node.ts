import { AbstractBSTNode } from "../../bst";
import { Color } from "./types";

export type IRBTNodeOrNull = RBTNode | null;

export default class RBTNode extends AbstractBSTNode {
  key: number;
  parent: IRBTNodeOrNull;
  left: IRBTNodeOrNull;
  right: IRBTNodeOrNull;
  color: Color;

  constructor(parent: IRBTNodeOrNull, k: number) {
    super();

    this.key = k;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.color = Color.Red;
  }
}
