import { nukeNode } from "./js/nukenode.js";
import { checkPortOpeningTools } from "./js/functions.js";

var maxports = 0;

const lse = "           ";

/**
 * Bitburner entrypoint to Master script
 *
 * @param {NS} ns
 */
export async function main(ns) {
  mainFunction(ns);
}

/**
 * Kicks off the Master script
 * @param {NS} ns
 */
function mainFunction(ns) {
  checkPortOpeningTools(ns);
  ns.tprint(lse + "Generating Tree!");
  let tree = buildTree(ns.getHostname(), {});

  ns.tprint(lse + "Nuking Tree!");
  nukeTree(tree);
}

/**
 * Builds a Tree of connected nodes on the network from a single  entrypoint.
 *
 * @param {String} home the root of the tree scan
 */
function buildTree(home, baseTree) {
  let tree = baseTree;
  let res = ns.scan(home);
  for (const node of res) {
    if (tree[node] != true) {
      basicprint(node, ns.hasRootAccess(node));
      tree[node] = true;
      tree = buildTree(node, tree);
    }
  }
  return tree;
}

/**
 * Simply prints basic info about a node to the terminal.
 * - 1[X] - Node
 *
 * @param {String} node the name of the node to be analyzed
 * @param {Boolean} bool if the node should be printed
 */
function basicprint(node, bool) {
  let mark = ns.hasRootAccess(node)
    ? ns.getServerNumPortsRequired(node) > maxports - 1
      ? "X"
      : "o"
    : " ";
  if (bool) {
    ns.tprint(ns.getServerNumPortsRequired(node) + "[" + mark + "] - " + node);
  }
}

/**
 * Runs NUKE.exe on all nodes within the tree.
 *
 * @param {Object} nodes "tree" of nodes, stored as object key strings, to be nuked
 */
function nukeTree(ns, nodes) {
  Object.keys(nodes).forEach((key) => {
    nukeNode(ns, key);
  });
}
