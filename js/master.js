//updated text test

var ns;
var maxports = 0;
const lse = "           ";

/**
 * @param {ns} nse changing ns scope
 */
export async function main(nse) {
	ns = nse;
	maxports = 0;
	//while (true) {
	//	ns.killall();
	mainFunction();
	//	await ns.sleep(43200000);
	//}
}

function mainFunction() {
	checkPortOpeningTools();
	ns.tprint(lse + "Generating Tree!")
	let tree = buildTree(ns.getHostname(), {});

	ns.tprint(lse + "Nuking Tree!")
	nukeTree(tree);

	Object.keys(tree).forEach(node => {
		let servHxLvl = ns.getServerRequiredHackingLevel(node);
		let hxLvl = ns.getHackingLevel();
		
		if (servHxLvl < hxLvl && ns.hasRootAccess(node) && node != ns.getHostname() && node != "CSEC")
			ns.exec("js/hackloop.js", ns.getHostname(), (ns.getServerNumPortsRequired(node) + 1) * 2, node);
	});
}



/**
 * Builds a Tree of connected nodes on the network from a single  entrypoint.
 * 
 * @param {String} home the root of the tree scan
 */
function buildTree(home, baseTree) {
	var tree = baseTree;
	let res = ns.scan(home)
	for (const node of res) {
		if (tree[node] != "set") {

			//logic for printing to command line
			let mark = ns.hasRootAccess(node) ? ns.getServerNumPortsRequired(node) > maxports - 1 ? "X" : "o" : " ";
			if (ns.hasRootAccess(node)) {
				ns.tprint(ns.getServerNumPortsRequired(node) + "[" + mark + "] - " + node);
			};

			//add the node to the tree
			tree[node] = "set";
			tree = buildTree(node, tree);
		}
	}
	return tree;
}

/**
 * Runs NUKE.exe on all nodes within the tree.
 * 
 * @param {Object} nodes "tree" of nodes, stored as object key strings, to be nuked
 */
function nukeTree(nodes) {
	Object.keys(nodes).forEach(key => { nukeNode(key); });
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

			ns.tprint("Server: " + servHxLvl + "| You: " + hxLvl)
			if (servHxLvl < hxLvl) {
				runCrackSuite(node);

				//ns.nuke(node);
				if (!ns.hasRootAccess(node)) {
					ns.toast(node + " nuked!", "success");
				}
				else ns.toast(node + "not nuked.", "error");
			}
			else ns.tprint("You do not meet the minimum hacking level requirement for " + node)



		} else {
			//ns.tprint("Cannot nuke node " + node + " due to port requirements - [" + ns.getServerNumPortsRequired(node) + "]");
		}
	}
}

//TODO by god please turn this into a loop
function runCrackSuite(node) {
	let cracks = {};

	if (ns.fileExists("brutessh.exe", "home")) {
		ns.brutessh(node);
		cracks["brutessh"] = true;
	}
	if (ns.fileExists("ftpcrack.exe", "home")) {
		ns.ftpcrack(node);
		cracks["ftpcrack"] = true;
	}
	if (ns.fileExists("httpworm.exe", "home")) {
		ns.httpworm(node);
		cracks["httpworm"] = true;
	}
	if (ns.fileExists("relaysmtp.exe", "home")) {
		ns.relaysmtp(node);
		cracks["relaysmtp"] = true;
	}
	if (ns.fileExists("sqlinject.exe", "home")) {
		ns.sqlinject(node);
		cracks["sqlinject"] = true;
	}

	return cracks;
}
//TODO by god please turn this into a loop
function checkPortOpeningTools() {
	ns.tprint(lse + "Checking for hacking tools!")

	if (ns.fileExists("brutessh.exe", "home")) maxports++;
	if (ns.fileExists("ftpcrack.exe", "home")) maxports++;
	if (ns.fileExists("httpworm.exe", "home")) maxports++;
	if (ns.fileExists("relaysmtp.exe", "home")) maxports++;
	if (ns.fileExists("sqlinject.exe", "home")) maxports++;
	ns.tprint(maxports + " tools found!");
	return maxports;
}

function superfluous(){
	

}