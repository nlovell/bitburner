/**
   Find All Valid Math Expressions
   You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.
   
   
   You are given the following string which contains only digits between 0 and 9:
   
   4066935291
   
   You are also given a target number of -3. Return all possible ways you can add the +, -, and * operators to the string such that it evaluates to the target number.
   
   The provided answer should be an array of strings containing the valid expressions. The data provided by this problem is an array with two elements. The first element is the string of digits, while the second element is the target number:
   
   ["4066935291", -3]
   
   NOTE: Numbers in the expression cannot have leading 0's. In other words, "1+01" is not a valid expression Examples:
   
   Input: digits = "123", target = 6
   Output: [1+2+3, 1*2*3]
   
   Input: digits = "105", target = 5
   Output: [1*0+5, 10-5]
    */

/**
 * Entrypoint for Bitburner.
 *
 * @param {NS} ns
 */
export async function main(ns) {
  let input = ns.args[0] ?? "4066935291";
  let target = ns.args[1] ?? -3;

  ns.tprint("Input: " + input + " | Target: " + target);
}
