/**
 * A basic hacking loop.
 * @param {NS} ns **/
export async function main(ns) {
  var target = ns.args[0];
  var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      ns.weaken(target);
      ns.toast("Weakened " + target, "info");
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      ns.grow(target);
      ns.toast("Grew " + target, "info");
    } else {
      try {
        let target = await ns.hack(target);
        ns.toast("Hacked " + target);
      } catch (error) {
        ns.toast("Failed to hack " + target, "error");
      }
    }
  }
}
