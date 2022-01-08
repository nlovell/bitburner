var ns;
const maxports = 1;

/** @param {NS} ns **/
export async function main(nse) {
	ns = nse;
	let goal = ns.args[0];
	let tree = buildTree("home", {});

	if (tree[goal] == "set") {
			Object.keys(tree).forEach(key => { 
				let  attempt = attemptPath(key, goal);
				if(attempt != null) tprint(attempt);
			 });

	} else {
		ns.tprint("No such node \"" + goal +"\" found on network.")
	}
}

/**
 * Attempts to find a path between nodes
 * @param {string} node the current node being scanned 
 * @returns {string} either Null, or a path represented by a String{} of node names
 */
function attemptPath(node, goal){
	return null
}

function buildTree(home, baseTree) {
	var tree = baseTree;
	let res = ns.scan(home)
	for (const node of res) {
		if (tree[node] != "set") {
			let mark = ns.hasRootAccess(node) ? ns.getServerNumPortsRequired(node) > maxports - 1 ? "X" : "o" : " ";

			//ns.tprint(ns.getServerNumPortsRequired(node) + "[" + mark + "] - " + node);
			//ns.tprint("       -> " + ns.scan(node))
			//ns.tprint("")


			tree[node] = "set";
			tree = buildTree(node, tree);
		}
	}
	return tree;
}