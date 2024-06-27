class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let currNode = this.root;
      while (true) {
        if (currNode.val > val) {
          if (currNode.left === null) {
            currNode.left = newNode;
            break;
          } else currNode = currNode.left;
        } else {
          if (currNode.right === null) {
            currNode.right = newNode;
            break;
          } else currNode = currNode.right;
        }
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    let newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
    } else if (val < node.val) {
      if (node.left === null) node.left = newNode;
      else return this.insertRecursively(val, node.left);
    } else if (val > node.val) {
      if (node.right === null) node.right = newNode;
      else return this.insertRecursively(val, node.right);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;
    while (true) {
      if (currNode.val === val) return currNode;
      else {
        if (currNode.left === null && currNode.right === null) return undefined;
        else if (currNode.val > val) currNode = currNode.left;
        else currNode = currNode.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (node === null);
    else if (node.val === val) return node;
    else if (node.val > val) return this.findRecursively(val, node.left);
    else if (node.val < val) return this.findRecursively(val, node.right);
    else return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let arr = [];
    const traverse = (node) => {
      if (node !== null) {
        arr.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(this.root);
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let arr = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        arr.push(node.val);
        traverse(node.right);
      }
    };
    traverse(this.root);
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let arr = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        arr.push(node.val);
      }
    };
    traverse(this.root);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let arr = [];
    let queue = [];
    if (this.root !== null) {
      queue.push(this.root);
    }
    while (queue.length > 0) {
      let currNode = queue.shift();
      arr.push(currNode.val);
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
    }
    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, node = this.root, parent = null) {
    if (node === null) return undefined;
    if (val < node.val) {
      return this.remove(val, node.left, node);
    } else if (val > node.val) {
      return this.remove(val, node.right, node);
    } else {
      if (node.left !== null && node.right !== null) {
        node.val = this.findMin(node.right).val;
        return this.remove(node.val, node.right, node);
      } else if (parent === null) {
        if (node.left !== null) {
          this.root = node.left;
        } else if (node.right !== null) {
          this.root = node.right;
        } else {
          this.root = null;
        }
      } else if (parent.left === node) {
        parent.left = node.left !== null ? node.left : node.right;
      } else if (parent.right === node) {
        parent.right = node.left !== null ? node.left : node.right;
      }
      return node;
    }
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) return 0;
      let leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;
      let rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;
      let heightDiff = Math.abs(leftHeight - rightHeight);
      if (heightDiff > 1) {
        return -1;
      } else {
        return Math.max(leftHeight, rightHeight) + 1;
      }
    };
    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (
      this.root === null ||
      (this.root.left === null && this.root.right === null)
    ) {
      return undefined;
    }
    let currNode = this.root;
    let parentNode = null;
    while (currNode.right !== null) {
      parentNode = currNode;
      currNode = currNode.right;
    }
    if (currNode.left !== null) {
      return this.findMax(currNode.left).val;
    } else {
      return parentNode.val;
    }
  }

  findMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
