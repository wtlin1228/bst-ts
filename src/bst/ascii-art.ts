const genEmpties = (length: number) => Array(length).fill(" ").join("");

interface IASCIINode {
  _str(): { lines: string[]; pos: number; width: number };
}

export default abstract class AsciiArtNode<NIL> implements IASCIINode {
  key!: any;
  parent!: any;
  left!: any;
  right!: any;

  abstract assertIsNil(n: any): n is NIL;

  /**
   * Internal method for ASCII art.
   */
  _str() {
    let label = String(this.key);

    let leftLines: string[] = [];
    let leftPos = 0;
    let leftWidth = 0;
    if (!this.assertIsNil(this.left)) {
      const left = this.left._str();
      leftLines = left.lines;
      leftPos = left.pos;
      leftWidth = left.width;
    }

    let rightLines: string[] = [];
    let rightPos = 0;
    let rightWidth = 0;
    if (!this.assertIsNil(this.right)) {
      const right = this.right._str();
      rightLines = right.lines;
      rightPos = right.pos;
      rightWidth = right.width;
    }

    const middle = Math.max(
      rightPos + leftWidth - leftPos + 1,
      label.length,
      2
    );

    const pos = Math.floor(leftPos + middle / 2);
    const width = leftPos + middle + rightWidth - rightPos;
    while (leftLines.length < rightLines.length) {
      leftLines.push(genEmpties(leftWidth));
    }
    while (rightLines.length < leftLines.length) {
      rightLines.push(genEmpties(rightWidth));
    }

    if (
      (middle - label.length) % 2 === 1 &&
      !this.assertIsNil(this.parent) &&
      this === this.parent.left &&
      label.length < middle
    ) {
      label += ".";
    }

    label = label
      .padStart(label.length + Math.floor((middle - label.length) / 2), ".")
      .padEnd(middle, ".");

    if (label[0] === ".") {
      label = " " + label.slice(1);
    }
    if (label[label.length - 1] === ".") {
      label = label.slice(0, label.length - 1) + " ";
    }

    const lines = [
      genEmpties(leftPos) + label + genEmpties(rightWidth - rightPos),
      genEmpties(leftPos) +
        "/" +
        genEmpties(middle - 2) +
        "\\" +
        genEmpties(rightWidth - rightPos),
    ].concat(
      leftLines.map((leftLine, i) => {
        const rightLine = rightLines[i];
        return (
          leftLine + genEmpties(width - leftWidth - rightWidth) + rightLine
        );
      })
    );

    return { lines, pos, width };
  }

  toString() {
    return "\n" + this._str().lines.join("\n");
  }
}
