export async function main(ns) {
  //Testing ES2020 features

  //BIGINT
  let oldnum = Number.MAX_SAFE_INTEGER;

  ns.tprint("OLD");

  ns.tprint(oldnum);
  ++oldnum;
  ns.tprint(oldnum);
  ++oldnum;
  ns.tprint(oldnum);
  ++oldnum;
  ns.tprint(oldnum);

  ns.tprint("NEW");
  let newnum = 9007199254740992n;
  ns.tprint(newnum);
  ++newnum;
  ns.tprint(newnum);
  ++newnum;
  ns.tprint(newnum);
  ++newnum;
  ns.tprint(newnum);
  ++newnum;
  ns.tprint(newnum);

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
