const newRule = /(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi;
const ruleClean = /\/\*.*?\*\/|\s{2,}|\n/gm;

/**
 * Convert a css style string into a object
 * @see {@link https://github.com/cristianbote/goober|Github}
 * @param {string} val
 * @returns {object}
 */
export default function cssToObject(val) {
	let tree = [{}];
	let block;

	while ((block = newRule.exec(val.replace(ruleClean, "")))) {
		if (block[4]) tree.shift();
		if (block[3]) {
			tree.unshift((tree[0][block[3]] = {}));
		} else if (!block[4]) {
			tree[0][block[1]] = tree[0][block[1]]
				? [].concat(tree[0][block[1]], block[2])
				: block[2];
		}
	}
	return tree[0];
}
