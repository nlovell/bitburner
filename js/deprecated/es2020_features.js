/**
 * Bitburner entrypoint
 * @param {NS} ns
 */
export async function main(ns) {
  testBigInt(ns);
  testNullishCoalescing(ns);
}

/**
 * Test for new BigInt functionality present in ES2020
 * @param {NS} ns
 */
function testBigInt(ns) {
  let oldnum = Number.MAX_SAFE_INTEGER;
  ns.tprint("Old Max: " + oldnum);

  ns.tprint("Adding 999 to standard Max Safe Integer");
  oldnum = oldnum + 999;
  ns.tprint(oldnum);

  ns.tprint("Adding 999 to standard BigInt");
  let newnum = 9007199254740992n;
  newnum = newnum + 999;
  ns.tprint(newnum);

  ns.tprint("Does it work?: " + newnum > oldnum);
  ns.tprint("");
}

function testNullishCoalescing(ns) {
  //Nullish coalescing
  ns.tprint(false ?? "strings are truthy, right?"); //false
  ns.tprint(undefined ?? "strings are truthy, right?");
  ns.tprint(null ?? "strings are truthy, right?");
  ns.tprint(NaN ?? "strings are truthy, right?"); //NaN

  ns.tprint(false || "strings are truthy, right?");
  ns.tprint(undefined || "strings are truthy, right?");
  ns.tprint(null || "strings are truthy, right?");
  ns.tprint(NaN || "strings are truthy, right?");
}
