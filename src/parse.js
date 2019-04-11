import { replace, hash, toCamelCase, clearCss } from "./utils";

let REG_NEST = /([^{};]+)({([^{}]*)})/g;
let REG_VARS = /var\( *--([\w\-]+) *(,|\))/g;
let REG_IMPORTS = /@import url\([^()]+\)(;){0,1}/g;

/**
 * @typedef {Object<string,string>} Keyes
 */

/**
 * @todo
 * @param {string} css
 * @param {string} [host]
 * @returns {{host:string,vars:Keyes,states:Keyes,rules:string[]}}
 */
export default function parse(css, host) {
	let rules = [],
		before = [],
		after = [],
		brackets = {},
		states = {},
		vars = {},
		position = 0;

	/**
	 * capture nested rules for later
	 * unite them without nesting
	 * @param {string} css
	 */
	function nesting(css) {
		let nextCss = replace(css, REG_NEST, (all, selector, content) => {
			let index = position++;
			brackets[index] = [selector, content];
			return "$" + index;
		});

		return nextCss != css ? nesting(nextCss) : css;
	}
	/**
	 * unites the rules, generating the nesting css
	 * @param {string} host  - concurrent parent selector of nesting
	 * @param {string} css - remaining CSS string
	 * @param {array} rules  - list of rules
	 * @return {string} returns the css already nested
	 */
	function join(host, css, rules = []) {
		return replace(css, /\$(\d+)/g, (all, position) => {
			let [selector, content] = brackets[position];
			if (selector[0] == "@") {
				let subRules = [];
				subRules.unshift(host + join(host, content, subRules));
				after.push(`${selector}{${subRules.join("")}}`);
			} else {
				let selectors = [];
				for (let i = 0; i < host.length; i++) {
					let items = selector.split(/ *, */);
					for (let c = 0; c < items.length; c++) {
						if (items[c][0] == "&") {
							selectors.push(replace(items[c], /&(.+)/g, host[i] + "$1"));
						}
					}
				}
				content = join(selectors, content, rules);
				if (replace(content, /[{} ]*/g, "")) {
					rules.unshift(selectors + content);
				}
			}
			return "";
		});
	}

	css = clearCss(css);

	host = host || hash(css);

	replace(css, REG_VARS, (all, name, end) => {
		vars[toCamelCase(name)] = name;
	});

	replace(css, /\.is-([\w\-]+)/g, (all, name, end) => {
		states[toCamelCase(name)] = name;
	});
	/**
	 * Clean the used imports within the CSS, before defining the rules
	 */
	css = replace(css, REG_IMPORTS, all => {
		before.push(all);
		return "";
	});
	let className = "." + host,
		scope = join([className], nesting(css), rules);
	if (scope) before.push(`${className}{${scope}}`);
	return {
		host,
		vars,
		states,
		rules: [].concat(before, rules, after)
	};
}
