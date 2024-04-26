import { Tree } from "./bst.js";

let i = 1;
function debugPrint(printFunction, description) {
  console.log(`--- START DEBUG ${i}: ${description} ---`);
  printFunction();
  console.log(`--- END   DEBUG ${i} ---`);
  console.log();
  i++;
}

const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

debugPrint(() => t.prettyPrint(), "Build BST");

t.insert(22, 24, 25, 26);
debugPrint(() => t.prettyPrint(), "Insert 22, 24, 25, and 26");

t.deleteItem(9);
debugPrint(() => t.prettyPrint(), "Remove 9");

debugPrint(() => console.log(t.find(23)), "Find node 23");

debugPrint(
  () => console.log(t.levelOrderIterate()),
  "Level Order Traversal [Iteration]",
);

debugPrint(
  () => console.log(t.levelOrderRecurse()),
  "Level Order Traversal [Recursion]",
);

debugPrint(() => console.log(t.inOrder()), "In-Order Traversal");

debugPrint(() => console.log(t.preOrder()), "Pre-Order Traversal");

debugPrint(() => console.log(t.postOrder()), "Post-Order Traversal");

debugPrint(() => console.log(t.height()), "Height of Tree");

debugPrint(() => console.log(t.depth(t.find(25))), "Depth of node 25");

debugPrint(
  () => console.log(`Is the tree balaced ? ${t.isBalanced() ? "Yes" : "No"}`),
  "Balance check",
);

t.rebalance();
debugPrint(() => t.prettyPrint(), "Rebalance tree");
