import { runCrackSuite, checkPortOpeningTools } from "./js/functions.js";

/**
 * Bitburner entrypoint to Nukenode script
 *
 * @param {NS} nse changing ns scope
 */
export async function main(ns) {
  nukeNode(ns, node);
  checkPortOpeningTools(ns);
}

/**
 * Cracks ports and nukes node, if tools and skill are available in the current run
 *
 * @param {NS} ns
 * @param {String} node the name of the node to nuke
 */
function nukeNode(ns, node) {
  runCrackSuite(ns, ns.args[0]);
}

export { nukeNode };
