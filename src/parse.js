import cssToObject from "./cssToObject";
import { hash } from "./utils";

let alImport = "@import";

export function objectToCss(
	tree,
	host,
	parent = [""],
	rules = [],
	states = {},
	vars = {},
	deep = 0
) {
	let scope = "";
	if (tree[alImport]) {
		[].concat(tree[alImport]).forEach(value => {
			rules.push(`${alImport} ${value};`);
		});
	}
	for (let property in tree) {
		if (property == alImport) continue;

		let value = tree[property];
		if (typeof value == "object") {
			let isState = deep == 1 && /&\.is-(\w+)/.exec(property),
				alRules = [],
				isAl = property[0] == "@",
				next = parent.reduce(
					(next, parent) =>
						next.concat(
							isAl
								? [parent]
								: property
										.split(/ *, */)
										.map(selector =>
											parent
												? parent +
												  (selector[0] == "&"
														? selector.slice(1)
														: " " + selector)
												: selector
										)
						),
					[]
				);
			objectToCss(
				value,
				host,
				next,
				isAl ? alRules : rules,
				states,
				vars,
				parent ? (isState ? 1 : deep + 1) : 0
			);
			if (isAl) {
				rules.push(`${property}{${alRules}}`);
			}
			if (isState) {
				states[isState[1]] = 1;
			}
		} else {
			scope += `${property}:${value.replace(
				/var\( *--([\w\-]+) *(,|\))/g,
				(all, name, end) => {
					vars[
						name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
					] = name;
					return `var(--${name + end}`;
				}
			)};`;
		}
	}

	if (scope) rules.push(`${parent}{${scope}}`);
	return [rules, states, vars];
}

export default function parse(string) {
	let host = hash(string),
		selector = "." + host;
	return [host].concat(
		objectToCss({ ["." + host]: cssToObject(string) }, selector)
	);
}
