class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) {
      this.addVertex(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    console.log(v2.adjacent);
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let v of vertex.adjacent) this.removeEdge(v, vertex);
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    if (!start) {
      return [];
    }

    const visited = new Set();
    let stack = [start];
    let returnArr = [];

    while (stack.length > 0) {
      const node = stack.pop();

      if (!visited.has(node)) {
        visited.add(node);
        returnArr.push(node.value);
        const neighbors = Array.from(node.adjacent).reverse();
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return returnArr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    if (!start) {
      return [];
    }
    const visited = new Set();
    let stack = [start];
    let returnArr = [];

    while (stack.length > 0) {
      const node = stack.shift();

      if (!visited.has(node)) {
        visited.add(node);
        returnArr.push(node.value);
        for (let neighbor of node.adjacent) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return returnArr;
  }
}

module.exports = { Graph, Node };
