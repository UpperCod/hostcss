export function join(values, args) {
	return values.map((value, index) => value + (args[index + 1] || "")).join("");
}
export function hash(string) {
	let id = 0,
		length = string.length;
	while (length) id += string[--length].charCodeAt(0);
	return "H0" + id; //.toString(32);
}
export function toCamelCase(value) {
	return replace(value, /-(\w)/g, (all, letter) => letter.toUpperCase());
}

export function replace(string, pattern, map) {
	return string.replace(pattern, map);
}

export function clearCss(css) {
	css = replace(css, /\/\*.*?\*\/|\s{2,}|\n/gm, "");
	return replace(css, / *(:|{) */g, "$1");
}
