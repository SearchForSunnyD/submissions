/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    function nodeSum(node) {
      let sum = node.val
      if (node.children.length > 0) {
        for (let child of node.children) {
          sum += nodeSum(child);
        };
      }
      return sum
    }
    return this.root ? nodeSum(this.root) : 0
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    function nodeCount(node) {
      let count = node.val % 2 === 0 ? 1 : 0;
      if (node.children.length > 0) {
        for (let child of node.children) {
          count += nodeCount(child);
        }
      }
      return count;
    }
    return this.root ? nodeCount(this.root) : 0;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    function nodeCount(node) {
      let count = node.val > lowerBound ? 1 : 0;
      if (node.children.length > 0) {
        for (let child of node.children) {
          count += nodeCount(child);
        }
      }
      return count;
    }
    return this.root ? nodeCount(this.root) : 0;
  }
}

module.exports = { Tree, TreeNode };
