/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    function depthMin(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return depthMin(node.right) + 1;
      if (node.right === null) return depthMin(node.left) + 1;
      return Math.min(depthMin(node.left), depthMin(node.right)) + 1;
    }
    return this.root ? depthMin(this.root) : 0;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    function depthMax(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return depthMax(node.right) + 1;
      if (node.right === null) return depthMax(node.left) + 1;
      return Math.max(depthMax(node.left), depthMax(node.right)) + 1;
    }
    return this.root ? depthMax(this.root) : 0;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let total = 0;
    function depthMaxSum(node) {
      if (node === null) return 0;
      const left = depthMaxSum(node.left);
      const right = depthMaxSum(node.right);
      total = Math.max(total, node.val + left + right);
      return Math.max(left + node.val, right + node.val, 0);
    }

    depthMaxSum(this.root);
    return total;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    function nextCheck(node) {
      if (node === null) return;
      if (node.val > lowerBound && (result === null || node.val < result)) {
        result = node.val;
      }
      nextCheck(node.left);
      nextCheck(node.right);
    }

    nextCheck(this.root);

    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function levelFinder(nodeToFind, currNode, nodeLevel = 0) {
      if (currNode === null) return null;
      if (currNode.left === nodeToFind || currNode.right === nodeToFind)
        return { parent: currNode, nodeLevel: nodeLevel + 1 };

      let left = null;
      let right = null;

      if (currNode.left)
        left = levelFinder(nodeToFind, currNode.left, nodeLevel + 1);
      if (currNode.right)
        right = levelFinder(nodeToFind, currNode.right, nodeLevel + 1);

      return left || right;
    }

    let node1Data = levelFinder(node1, this.root);
    let node2Data = levelFinder(node2, this.root);

    let sameLevel =
      node1Data && node2Data && node1Data.nodeLevel === node2Data.nodeLevel;
    let differentParents =
      node1Data && node2Data && node1Data.parent !== node2Data.parent;

    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
