var cracks = {
  brutessh: false,
  ftpcrack: false,
  httpworm: false,
  relaysmtp: false,
  sqlinject: false,
};

var textFormat = {
  info: "INFO  | ",
  warn: "WARN  | ",
  error: "ERROR | ",
  none: "      | ",
};

/**
 * Runs the available hacking tools on a provided node in the network.
 * @param {String} node the name of the node to crack
 */
export function runCrackSuite(ns, node) {
  colouredText(ns, textFormat.info, "Hacking Node [" + node + "]");

  let servHxLvl = ns.getServerRequiredHackingLevel(node);
  let hxLvl = ns.getHackingLevel();

  if (servHxLvl < hxLvl) {
    Object.keys(cracks).forEach((crack) => {
      if (cracks[crack] == true) {
        ns.run(crack + ".exe", 1, node);
        ns.tprint(crack + " ran successfully");
      }
    });

    let nuked = ns.nuke(node);
    succeedOrFailText(
      ns,
      nuked,
      node + " nuked successfully.",
      node + " not nuked."
    );
  } else
    ns.tprint(
      "You do not meet the minimum hacking level requirement for " + node
    );
}

/**
 * Checks for hacking tools on the local machine.
 * @returns the maximum number of ports for a server to be crackable
 */
export function checkPortOpeningTools(ns) {
  ns.tprint("Checking for hacking tools!");

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

function succeedOrFailText(ns, bool, success, fail) {
  if (bool) colouredText(ns, textFormat.info, success);
  else colouredText(ns, textFormat.error, fail);
}

function colouredText(ns, type, text) {
  ns.tprint(type + text);
}
