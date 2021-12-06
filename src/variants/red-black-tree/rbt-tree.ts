import { AbstractBSTree } from "../../bst";
import { Color } from "./types";

import RBTNode, { IRBTNodeOrNull } from "./rbt-node";

export default class RBT extends AbstractBSTree {
  klass: new (parent: IRBTNodeOrNull, k: number) => RBTNode;
  root: IRBTNodeOrNull;

  constructor(klass = RBTNode) {
    super();

    this.klass = klass;
    this.root = null;
  }

  private leftRotate(x: RBTNode): void {
    if (x.right === null) {
      throw new Error("Can't perform left rotate if x.right is null");
    }

    const y = x.right;
    x.right = y.left;
    if (y.left !== null) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  private rightRotate(x: RBTNode): void {
    if (x.left === null) {
      throw new Error("Can't perform left rotate if x.left is null");
    }

    const y = x.left;
    x.left = y.right;
    if (y.right !== null) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.right = x;
    x.parent = y;
  }

  private getColorOfUncle(x: RBTNode): Color {
    if (x.parent === null || x.parent.parent === null) {
      throw new Error(
        "Can't get uncle's color since x.parent or x.parent.parent is null"
      );
    }

    const uncle =
      x.parent === x.parent.parent.left
        ? x.parent.parent.right
        : x.parent.parent.left;

    if (uncle === null) {
      return Color.Black;
    }

    return uncle.color;
  }

  private insertFixup(z: RBTNode): void {
    if (this.root === null) {
      throw new Error("Can't perform insert fixup if there is no root");
    }

    while (
      z.parent !== null &&
      z.parent.parent !== null &&
      z.parent.color === Color.Red
    ) {
      if (z.parent === z.parent.parent.left) {
        //        Node               Node
        //        /                   /
        //      Red        or       Red
        //      /                     \
        //    Red(z)                  Red(z)
        const y = z.parent.parent.right;

        if (y !== null && y.color === Color.Red) {
          //        Node                 Node
          //        /  \                 /  \
          //      Red  Red      or     Red  Red
          //      /                      \
          //    Red(z)                  Red(z)
          z.parent.color = Color.Black;
          y.color = Color.Black;
          z.parent.parent.color = Color.Red;
          z = z.parent.parent;
          //       Red(z)                  Red(z)
          //       /    \                  /    \
          //    Black  Black     or     Black  Black
          //     /                         \
          //   Red                         Red
        } else {
          //        Node                   Node
          //        /  \                   /  \
          //     Red   Black      or    Red   Black
          //      /                        \
          //    Red(z)                    Red(z)
          if (z === z.parent.right) {
            //        Node
            //        /  \
            //     Red   Black
            //        \
            //       Red(z)
            z = z.parent;
            this.leftRotate(z);
            //        Node
            //        /  \
            //     Red   Black
            //      /
            //   Red(z)
          }
          if (z.parent === null || z.parent.parent === null) {
            break;
          }
          //        Node
          //        /  \
          //     Red   Black
          //      /
          //   Red(z)
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.rightRotate(z.parent.parent);
          //        Black
          //        /   \
          //    Red(z)   Red
          //              \
          //              Black
        }
      } else {
        //   Node               Node
        //      \                  \
        //      Red       or       Red
        //      /                     \
        //    Red(z)                  Red(z)
        const y = z.parent.parent.left;

        if (y !== null && y.color === Color.Red) {
          //    Node                 Node
          //    /  \                /   \
          //  Red   Red     or    Red    Red
          //        /                      \
          //      Red(z)                   Red(z)
          z.parent.color = Color.Black;
          y.color = Color.Black;
          z.parent.parent.color = Color.Red;
          z = z.parent.parent;
          //       Red(z)                   Red(z)
          //       /   \                    /   \
          //   Black   Black     or     Black   Black
          //           /                           \
          //         Red                           Red
        } else {
          //       Node                      Node
          //       /  \                     /   \
          //   Black   Red       or     Black    Red
          //           /                           \
          //         Red(z)                        Red(z)
          if (z === z.parent.left) {
            //       Node
            //       /  \
            //   Black   Red
            //           /
            //         Red(z)
            z = z.parent;
            this.rightRotate(z);
            //        Node
            //       /   \
            //   Black    Red
            //              \
            //              Red(z)
          }
          if (z.parent === null || z.parent.parent === null) {
            break;
          }
          //        Node
          //       /   \
          //   Black    Red
          //              \
          //              Red(z)
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.leftRotate(z.parent.parent);
          //         Black
          //         /   \
          //       Red   Red(z)
          //       /
          //   Black
        }
      }
    }
    this.root.color = Color.Black;
  }

  find(k: number): IRBTNodeOrNull {
    const node = super.find(k);

    if (node === null) {
      return null;
    }

    return node as RBTNode;
  }

  insert(k: number): RBTNode {
    const node = new this.klass(null, k);

    if (this.root === null) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    this.insertFixup(node);

    return node;
  }

  delete(k: number): IRBTNodeOrNull {
    // Not implemented

    const node = this.find(k);
    return node;
  }
}
