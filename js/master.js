var cracks = {
  brutessh: false,
  ftpcrack: false,
  httpworm: false,
  relaysmtp: false,
  sqlinject: false,
};
var ns;
var maxports = 0;

const lse = "           ";

/**
 * @param {ns} nse changing ns scope
 */
export async function main(nse) {
  ns = nse;
  mainFunction();
}

function mainFunction() {
  checkPortOpeningTools();
  ns.tprint(lse + "Generating Tree!");
  let tree = buildTree(ns.getHostname(), {});

  ns.tprint(lse + "Nuking Tree!");
  nukeTree(tree);

  Object.keys(tree).forEach((node) => {
    let servHxLvl = ns.getServerRequiredHackingLevel(node);
    let hxLvl = ns.getHackingLevel();

    if (
      servHxLvl < hxLvl &&
      ns.hasRootAccess(node) &&
      node != ns.getHostname() &&
      node != "CSEC"
    ) {
      //ns.exec("js/hackloop.js", ns.getHostname(), (ns.getServerNumPortsRequired(node) + 1) * 2, node);
    }
  });
}

/**
 * Builds a Tree of connected nodes on the network from a single  entrypoint.
 *
 * @param {String} home the root of the tree scan
 */
function buildTree(home, baseTree) {
  var tree = baseTree;
  let res = ns.scan(home);
  for (const node of res) {
    if (tree[node] != "set") {
      basicprint(node, ns.hasRootAccess(node));
      //add the node to the tree
      tree[node] = "set";
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
function nukeTree(nodes) {
  Object.keys(nodes).forEach((key) => {
    nukeNode(key);
  });
}

/**
 * Checks if a node is NUKEable, opens the required ports, and then runs NUKE.exe on it.
 *
 * @param {String} node name of node to be nuked
 */
function nukeNode(node) {
  //ns.tprint(node + " - " + ns.hasRootAccess);
  if (!ns.hasRootAccess(node)) {
    if (ns.getServerNumPortsRequired(node) <= maxports) {
      ns.tprint("Nuking Node: " + node);

      let servHxLvl = ns.getServerRequiredHackingLevel(node);
      let hxLvl = ns.getHackingLevel();

      ns.tprint("Server: " + servHxLvl + "| You: " + hxLvl);
      if (servHxLvl < hxLvl) {
        runCrackSuite(node);
        ns.nuke(node);

        if (!ns.hasRootAccess(node)) {
          ns.toast(node + " nuked!", "success");
        } else ns.toast(node + "not nuked.", "error");
      } else
        ns.tprint(
          "You do not meet the minimum hacking level requirement for " + node
        );
    } else {
      //ns.tprint("Cannot nuke node " + node + " due to port requirements - [" + ns.getServerNumPortsRequired(node) + "]");
    }
  }
}

/**
 * Runs the available hacking tools on a provided node in the network.
 * @param {String} node the name of the node to crack
 */
function runCrackSuite(node) {
  Object.keys(cracks).forEach((crack) => {
    if (cracks[crack] == true) ns.run(crack + ".exe", node);
  });
}

/**
 * Checks for hacking tools on the local machine.
 * @returns the maximum number of ports for a server to be crackable
 */
function checkPortOpeningTools() {
  ns.tprint(lse + "Checking for hacking tools!");

  let maxports = 0;
  Object.keys(cracks).forEach((crack) => {
    if (ns.fileExists(crack + ".exe", "home")) {
      cracks[crack] = true;
      maxports++;
    }
  });

  ns.tprint(maxports + " tools found!");
  return maxports;
}
