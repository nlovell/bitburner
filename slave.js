/** @param {NS} ns **/
export async function main(ns) {
	await(f1());
}

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(10);
  ns.toast(x); // 10
}